import styles from './order-info.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from 'react';
import { useLocation, useParams, Params } from "react-router";
import { getOrder } from '../../services/actions/order';
import { startWsConnect, stopWsConnect } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { TIngredient, TOrder } from '../../services/types/data';

function OrderInfo() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { number }: Readonly<Params<string>> = useParams();
  const isModal = location.state && location.state.background;

  const ingredients: ReadonlyArray<TIngredient> | null = useSelector(store => store.ingredients.ingredients)
  const orders = useSelector(store => store.wsStore.orders);
  const order: TOrder = location.state?.order || orders?.find(order => order.number.toString() === number) 

  const orderStatus = order?.status === 'done' ? {statusColor: `${styles.ready}`, text: 'Выполнен'}
                : order?.status === 'pending' ? {statusColor: `${styles.pending}`, text: 'Готовится'}
                : order?.status === 'cancel' ? {statusColor: `${styles.cancel}`, text: 'Отменен'}
                : {statusColor: `${styles.create}`, text: 'Создан'};
  
  const currentDate = new Date();
  const orderDate = new Date(order?.createdAt);
  const deltaDays = Math.floor(Math.abs(currentDate.getTime() - orderDate.getTime())/1000/3600/24)
  const orderTime = order?.createdAt.slice(11,16);
  const orderTimezone = new Date(order?.createdAt).getTimezoneOffset()/60*(-1);

  useEffect(() => {
    if (!order) {
      if (location.pathname.includes('feed')) {
        dispatch(startWsConnect('/all'));
        return () => {
          dispatch(stopWsConnect());
        }
      } else {
        dispatch(getOrder(parseInt(number?number:'')));
        if (!orders) {
          dispatch(startWsConnect(`?token=${localStorage.getItem("accessToken")?.split('Bearer ')[1]}`));
          return () => {
            dispatch(stopWsConnect());
          }
        }
      }
    }
  }, [dispatch, order, number, location, orders])

  const orderIngredients = useMemo(() => {
    if (ingredients && order) {
      return order.ingredients.flatMap(id => id ? ingredients.filter(item => item._id === id) : [])
    }
    return null
  }, [ingredients, order]);

  const numberOfIngredients = useMemo(() => {
    return orderIngredients ? orderIngredients.length : 0;
  }, [orderIngredients])

  const orderPrice = useMemo(() => { 
    return orderIngredients?.reduce((acc, item) => acc + (item?.price ?? 0), 0) ?? 0
  }, [orderIngredients])

  // [...new Set()] is only available in newer version ES2015
  // const uniqueIngredients = useMemo(() => {
  //   return [...new Set(orderIngredients)].map(element => [
  //     element,
  //     orderIngredients.filter(el => el === element).length,
  //   ]);
  // }, [orderIngredients])
  const uniqueIngredients = useMemo(() => {
    const uniqueOrderIngredients = orderIngredients?.filter((value, index, array) => array.indexOf(value) === index) ?? null;
    return  uniqueOrderIngredients?.map((element):{ingredient:TIngredient, amount:number} => ({
      ingredient:element,
      amount:orderIngredients?.filter(el => el === element).length ?? 0
    })) ?? null;
  }, [orderIngredients])

  if(!order) {
    return (
      <div className={styles.order}>
        <h3 className={styles.number}>
          Заказ #{number?.padStart(6, '0')} не найден
        </h3>
      </div>
    )
  }
  if (!orderIngredients) {
    return null
  }

  return (
    <div className={ `${styles.order} ${isModal ? styles.order_modal : ''}`}>
      <h3 className={ `${styles.number} ${isModal ? styles.number_modal : ''}`}>
        #{number?.padStart(6, '0')}
      </h3>
      <div className={styles.info}>
        <h2 className={styles.title}>{order.name}</h2>
        <p className={`${orderStatus.statusColor} ${styles.statusText}`}>{orderStatus.text}</p>
      </div>
      <h3 className={styles.title}>Состав:</h3>
      <div className={styles.ingredients}>
        { numberOfIngredients &&
            uniqueIngredients?.map((item, index) => { return (item.ingredient &&
            <div key={item.ingredient._id+index+order.number} className={styles.item}>
              <img className={styles.icon} src={item.ingredient.image} alt={item.ingredient.name}/>
              <p className={styles.itemName}>{item.ingredient.name}</p>
              <div className={styles.price}>
                <div className={styles.value}>
                  {`${item.amount} x ${item.ingredient.price}`}
                </div>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          )})
        }
      </div>
      <div className={styles.timeAndPrice}>
        <p className={styles.time}>
          {deltaDays === 0 ? 'Сегодня' 
                        : deltaDays === 1 ? 'Вчера' 
                        : `${deltaDays} дня назад `}
                        , {orderTime} {`i-GMT${orderTimezone>0 ? '+' : '-' }${orderTimezone}`}
        </p>
        <div className={styles.price}>
          <div className={styles.value}>
            {orderPrice}
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderInfo;