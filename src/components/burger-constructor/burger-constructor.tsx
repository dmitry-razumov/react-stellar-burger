import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { BurgerItem } from "../burger-item/burger-item";
import { addBun, addIngredient, sortIngredients } from '../../services/actions/burger';
import { makeOrder, clearOrder } from '../../services/actions/order';
import { FC, useCallback, useMemo, useState } from 'react'; 
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

const BurgerConstructor:FC = () => {
  const ingredients = useSelector(store => store.burger.ingredients);
  const bun = useSelector(store => store.burger.bun);
  const order = useSelector(store => store.order.order);
  const user = useSelector(store => store.user.user);
  const navigate = useNavigate();
  const [beginMakeOrder, setBeginMakeOrder] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(clearOrder());
    setBeginMakeOrder(false);
  };

  const [{isOver}, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item: { ingredient:TIngredient } ) => {
      if (item.ingredient.type === 'bun') {
        dispatch(addBun(item.ingredient))
      } else {
        dispatch(addIngredient(item.ingredient))
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
    if (ingredients.length && bun && user) {
      dispatch(makeOrder(
        [bun._id, ...ingredients.map(item => item._id), bun._id]))
      setBeginMakeOrder(true);
    } else {
      navigate('/login')
    }
  }

  const moveItem = useCallback((dragIndex:number, hoverIndex:number) => {
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
        <div className={styles.first}> 
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
        </div>
        :
        <div>
          <h2 className={`${styles.addItem}`}>Добавь булку</h2>
        </div>
      }
      {ingredients.length > 0 ?
        <div className={styles.scrollbarList}>
          <ul className={styles.items}>
             {ingredients.map((item, index) => {
                return <BurgerItem key={item.uuid} item={item} index={index} moveItem={moveItem}/>
                })
              }
          </ul>
        </div>
        :
        <section>
          <h2 className={`${styles.addItem}`}>Добавь ингредиенты</h2>
        </section>
      }
      { bun ?
        <div className={styles.last}>
           <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
        </div>
        :
        <section>
          <h2 className={`${styles.addItem}`}>Добавь булку</h2>
        </section>
      }
      { bun && ingredients.length > 0 &&
      <div className={styles.info}>
        <div className={styles.price}>
          <p className={styles.value}>{calcPrice}</p>
          <div className={styles.icon}><CurrencyIcon type='primary' /></div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onOrder}>
          Оформить заказ
        </Button>
      </div>
      }
      { (order || beginMakeOrder) &&
        <Modal closeModal={closeModal} >
          <OrderDetails />
        </Modal>
      }
    </section>
  );
};

export default BurgerConstructor;