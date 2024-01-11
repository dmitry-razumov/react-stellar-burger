import styles from './order-info.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from "react-router";
import { getOrder } from '../../services/actions/order';
import { startWsConnect, stopWsConnect } from '../../services/actions/wsActions';

function OrderInfo(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { number } = useParams();
  const ingredients = useSelector(store => store.ingredients.ingredients)
  const orders = useSelector(store => store.wsStore.orders);
  const order = location.state?.order || orders?.find(order => order.number === parseInt(number)) 

  const orderStatus = order?.status === 'done' ? {statusColor: `${styles.ready}`, text: 'Выполнен'}
                : order?.status === 'pending' ? {statusColor: `${styles.pending}`, text: 'Готовится'}
                : order?.status === 'cancel' ? {statusColor: `${styles.cancel}`, text: 'Отменен'}
                : {statusColor: `${styles.create}`, text: 'Создан'};
  
  const currentDate = new Date();
  const orderDate = new Date(order?.createdAt);
  const deltaDays = Math.floor(Math.abs(currentDate - orderDate)/1000/3600/24)
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
        dispatch(getOrder(number));
        if (!orders) {
          dispatch(startWsConnect(`?token=${localStorage.getItem("accessToken").split('Bearer ')[1]}`));
          return () => {
            dispatch(stopWsConnect());
          }
        }
      }
    }
  }, [dispatch, order, number, location, orders])

  const orderIngredients = useMemo(() => {
    return order?.ingredients.flatMap(id => 
      id ? ingredients.find(item => item._id === id) : []
    )
  }, [ingredients, order]);

  const numberOfIngredients = useMemo(() => {
    return orderIngredients ? orderIngredients.length : 0;
  }, [orderIngredients])

  const orderPrice = useMemo(() => { 
    return orderIngredients?.reduce((acc, item) => acc + item.price, 0)
  }, [orderIngredients])

  const uniqueIngredients = useMemo(() => {
    return [...new Set(orderIngredients)].map(element => [
      element,
      orderIngredients.filter(el => el === element).length,
    ]);
  }, [orderIngredients])
  
  if(!order) {
    return (
      <div className={styles.order}>
        <h3 className={styles.number}>
          Заказ #{number.toString().padStart(6, '0')} не найден
        </h3>
      </div>
    )
  }

  if (!orderIngredients) {
    return null
  }

  return (
    <div className={ `${styles.order} ${props?.isModal ? styles.order_modal : ''}`}>
      <h3 className={ `${styles.number} ${props?.isModal ? styles.number_modal : ''}`}>
        #{number.toString().padStart(6, '0')}
      </h3>
      <div className={styles.info}>
        <h2 className={styles.title}>{order.name}</h2>
        <p className={`${orderStatus.statusColor} ${styles.statusText}`}>{orderStatus.text}</p>
      </div>
      <h3 className={styles.title}>Состав:</h3>
      <div className={styles.ingredients}>
        { numberOfIngredients &&
            uniqueIngredients.map((item, index) => { return (
            <div key={item[0]._id+index+order.number} className={styles.item}>
              <img className={styles.icon} src={item[0].image} alt={item[0].alt}/>
              <p className={styles.itemName}>{item[0].name}</p>
              <div className={styles.price}>
                <div className={styles.value}>
                  {`${item[1]} x ${item[0].price}`}
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