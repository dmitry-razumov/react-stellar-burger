import { useState, useMemo } from "react"; 
import { dataPropType } from './../../utils/prop-types';
import styles from './burger-constructor.module.css';
import { orderNumber } from './../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './../order-details/order-details';
import Modal from './../modal/modal';

function BurgerConstructor({ data }) {
  const [modalActive, setModalActive] = useState(false);

  const openModal = () => {
    setModalActive(true);
  };
  const closeModal = () => {
    setModalActive(false);
  };

  const { bun, ingredients } = useMemo(() => {
    return {
      bun: data.find(item => item.type === 'bun'),
      ingredients: data.filter(item => item.type !== 'bun'),
    };
  }, [data]);

  return (
      <section className={styles.container}>      
      <section className={styles.first}> 
        <section className={styles.draggable}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
      </section>
      <section className={styles.scrolbarList}>
        <ul className={styles.items}>
          <li className={styles.item}>
            {ingredients.map(item => (
              <section className={styles.draggable} key={item._id}>
                {!item.isLocked && < DragIcon />}
                <ConstructorElement
                  type={item.type}
                  isLocked={item.isLocked}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </section>
            ))}
          </li>
        </ul>
      </section>  
      <section className={styles.last}>
        <section className={styles.draggable}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </section>
      </section>
      <section className={styles.info}>
        <div className={styles.price}>
          <p className={styles.value}>{ ingredients.reduce((acc, item) => acc + item.price, 0) + bun.price * 2 }</p>
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
  data: dataPropType.isRequired
};

export default BurgerConstructor;