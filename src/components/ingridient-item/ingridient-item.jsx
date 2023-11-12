import { useState } from "react"; 
import PropTypes from 'prop-types';
import { ingredientPropType } from './../../utils/prop-types';
import styles from './ingridient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngridientItem = ({item, children}) => {
  const [modalActive, setModalActive] = useState(false);

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  function HideCounter({ quantity }) {
   if (quantity === 0) {
      return null;
    }
    return <Counter count={quantity} size="default" extraClass='m-1' />
  }

  return (
    <>
      <section className={styles.item} onClick={openModal}>
        <div className={styles.image} >
          {children}
        </div>
        <div className={styles.price}>
          <div className={styles.value}>
            {item.price}
          </div>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.name}>{item.name}</p>
        <HideCounter quantity={item.quantity} />
      </section>

      {modalActive &&
        <Modal title="Детали ингредиента" closeModal={closeModal} >
          <IngredientDetails data={item}/>
        </Modal>
      }
    </>
  )
}

IngridientItem.propTypes = {
  item: ingredientPropType.isRequired,
  children: PropTypes.node.isRequired,
};

export default IngridientItem;
