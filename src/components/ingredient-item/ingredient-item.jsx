import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { openIngredientDetails, closeIngredientDetails } from "../../services/actions/ingredients";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

const IngredientItem = ({item, children}) => {
  const { ingredients, bun } = useSelector(store => store.burger);
  const { ingredientDetails } = useSelector(store => store.ingredients);

  const dispatch =useDispatch();

  const openModal = () => {
    dispatch(openIngredientDetails(item));
  };

  const closeModal = () => {
    dispatch(closeIngredientDetails());
  };

  const calcItemQty = () => {
    if (item.type === 'bun' && bun && bun._id === item._id) {
      return 2
    } else if (ingredients !== null) {
      return ingredients.reduce((acc,el) => acc + (el._id === item._id), 0)
    }
    return 0
  }
  
  const quantity = calcItemQty();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {item},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <> 
      <section className={styles.item} onClick={openModal} ref={dragRef}>
        <div className={styles.image}>
          {children}
        </div>
        <div className={styles.price}>
          <div className={styles.value}>
            {item.price}
          </div>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.name}>{item.name}</p>
        { quantity ? <Counter count={quantity} size="default" extraClass='m-1' /> : null }
      </section>

      {ingredientDetails && ingredientDetails._id === item._id &&
        <Modal title="Детали ингредиента" closeModal={closeModal} >
          <IngredientDetails />
        </Modal>
      }
    </>
  )
}

IngredientItem.propTypes = {
  item: ingredientPropType.isRequired,
  children: PropTypes.node.isRequired,
};

export default IngredientItem;
