import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from './../order-details/order-details';
import Modal from './../modal/modal';
import { BurgerItem } from "../burger-item/burger-item";
import { addBun, addIngredient, sortIngredients } from '../../services/actions/burger';
import { makeOrder, clearOrder } from '../../services/actions/order';
import { useCallback, useMemo } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

function BurgerConstructor() {
  const ingredients = useSelector(store => store.burger.ingredients);
  const bun = useSelector(store => store.burger.bun);
  const order = useSelector(store => store.order.order);
  
  const closeModal = () => {
    dispatch(clearOrder());
  };

  const dispatch = useDispatch();

  const [{isOver}, dropRef] = useDrop({
    accept: 'ingredient',
    drop({item}) {
      if (item.type === 'bun') {
        dispatch(addBun(item))
      } else {
        dispatch(addIngredient(item))
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  const calcPrice = useMemo(() => {
    return ingredients.length && bun &&
      ingredients.reduce((acc, item) => acc + item.price, 0) + bun.price * 2;
  }, [ingredients, bun]);
  
  const onOrder = () => {
    if (ingredients.length && bun) {
      dispatch(makeOrder(
        [bun._id, ...ingredients.map(item => item._id), bun._id]
      ))
    }
  }

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    const dragItem = ingredients[dragIndex];
    const hoverItem = ingredients[hoverIndex];
    const newIngredients = [...ingredients];
    newIngredients[dragIndex] = hoverItem;
    newIngredients[hoverIndex] = dragItem;
    dispatch(sortIngredients(newIngredients));
  }, [dispatch, ingredients])

  return (
     <section ref={dropRef} className={isOver ? `${styles.container} ${styles.borderOver}` : `${styles.container}`}>      
      { bun ?
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
        :
        <section>
          <h2 className={`${styles.addItem}`}>Добавь булку</h2>
        </section>
      }
      {ingredients.length > 0 ?
        <section className={styles.scrollbarList}>
          <ul className={styles.items}>
             {ingredients.map((item, index) => {
                return <BurgerItem key={index} item={item} index={index} moveItem={moveItem}/>
                })
              }
          </ul>
        </section>
        :
        <section>
          <h2 className={`${styles.addItem}`}>Добавь ингредиенты</h2>
        </section>
      }
      { bun ?
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
        :
        <section>
          <h2 className={`${styles.addItem}`}>Добавь булку</h2>
        </section>
      }
      { bun && ingredients.length > 0 &&
      <section className={styles.info}>
        <div className={styles.price}>
          <p className={styles.value}>{calcPrice}</p>
          <div className={styles.icon}><CurrencyIcon /></div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onOrder}>
          Оформить заказ
        </Button>
      </section>
      }
      { order &&
        <Modal title='' closeModal={closeModal} >
          <OrderDetails />
        </Modal>
      }
    </section>
  );
};

export default BurgerConstructor;