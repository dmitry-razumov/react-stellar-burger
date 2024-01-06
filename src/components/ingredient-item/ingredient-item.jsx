import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

const IngredientItem = ({item, children}) => {
  const { ingredients, bun } = useSelector(store => store.burger);

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
      <section className={styles.item} ref={dragRef}>
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
  )
}

IngredientItem.propTypes = {
  item: ingredientPropType.isRequired,
  children: PropTypes.node.isRequired,
};

export default IngredientItem;
