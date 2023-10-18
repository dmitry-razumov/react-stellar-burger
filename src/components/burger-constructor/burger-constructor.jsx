import React from 'react';
import { dataPropType } from './../../utils/prop-types';
import styles from './burger-constructor.module.css';
import { orderNumber } from './../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './../order-details/order-details';
import Modal from './../modal/modal';

function BurgerConstructor({ ingredients }) {
  const product = [
    {type:'bun', name: 'Булки'},
    {type: 'sauce', name: 'Соусы'},
    {type: 'main', name : 'Начинки'}
  ]

  const [modalActive, setModalActive] = React.useState(false);

  const openModal = () => {
    setModalActive(true);
  };
  const closeModal = () => {
    setModalActive(false);
  };

  const bunFirst = ingredients.findIndex(item => item.type === product[0].type && item.quantity !== 0);
  const bunAny = ingredients.findIndex(item => item.type === product[0].type);
  const bunIndex = bunFirst === -1 ? bunAny : bunFirst;
  ingredients[bunIndex].quantity = 2;
  
  const totalPrice = ingredients.map((item) => item.price * item.quantity).reduce((acc, item) => acc + item, 0);

  function ShowCreateBurger({ item, kind, lock }) {
    const newtext = (kind === "top") ? [item.name, " (верх)"].join('') :
      (kind === "bottom") ? [item.name, " (низ)"].join('') : item.name;
    return (
      <ConstructorElement
        type={kind}
        isLocked={lock}
        text={newtext}
        price={item.price}
        thumbnail={item.image}
      />
    )
  }

  function ShowItem({ item, kind, lock}) {
    return (
      <section className={styles.draggable}>
        {!lock && < DragIcon />}
        <ShowCreateBurger item={item} kind={kind} lock={lock} />
      </section>
    );
  };

  return (
    <section className={styles.container}>      
      <section className={styles.first}> {
        <ShowItem key={ingredients[bunIndex]._id} item={ingredients[bunIndex]} kind="top" lock={true} />
      }
      </section>
      <section className={styles.scrolbarList}>
        <ul className={styles.items}>
          <li className={styles.item}>
            {ingredients.map(item => (
              (item.type !== product[0].type) && 
              // (item.quantity !== 0) &&
              <ShowItem key={item._id} item={item} num={item.quantity} lock={false} />
            ))}
          </li>
        </ul>
      </section>  
      <section className={styles.last}> {
        <ShowItem key={ingredients[bunIndex]._id} item={ingredients[bunIndex]} kind="bottom" lock={true} />
      }
      </section>
      <section className={styles.info}>
        <div className={styles.price}>
          <p className={styles.value}>{totalPrice}</p>
          <div className={styles.icon}><CurrencyIcon /></div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </section>

      {modalActive &&
        <Modal title='' closeModal={closeModal} >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      }
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: dataPropType.isRequired
};

export default BurgerConstructor;