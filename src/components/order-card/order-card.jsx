import styles from './order-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useLocation } from 'react-router';

function OrderCard({ order }) {
  const location = useLocation();
  const ingredients = useSelector(store => store.ingredients.ingredients)
  const currentDate = new Date();
  const orderDate = new Date(order.createdAt);
  const deltaDays = Math.floor(Math.abs(currentDate - orderDate)/1000/3600/24)
  const orderTime = order.createdAt.slice(11,16);
  const orderTimezone = new Date(order.createdAt).getTimezoneOffset()/60*(-1);

  const orderStatus = order.status === 'done' ? {statusColor: `${styles.ready}`, text: 'Выполнен'}
              : order.status === 'pending' ? {statusColor: `${styles.pending}`, text: 'Готовится'}
              : order.status === 'cancel' ? {statusColor: `${styles.cancel}`, text: 'Отменен'}
              : {statusColor: `${styles.create}`, text: 'Создан'};

  const orderIngredients = useMemo(() => {
    return order.ingredients.flatMap(id => 
      id ? ingredients.find(item => item._id === id) : []
    )
  }, [ingredients, order.ingredients]);

  const numberOfIngredients = useMemo(() => {
    return orderIngredients.length;
  }, [orderIngredients])

  const orderPrice = useMemo(() => { 
    return orderIngredients.reduce((acc, item) => acc + item.price, 0)
  }, [orderIngredients])

  return ( order &&
    <div className={styles.card}>
      <div className={styles.orderId}>
        <p className={styles.id}>#{order.number.toString().padStart(6, '0')}</p>
        <p className={styles.timestamp}>
          {deltaDays === 0 ? 'Сегодня' 
                        : deltaDays === 1 ? 'Вчера' 
                        : `${deltaDays} дня назад `}
                        , {orderTime} {`i-GMT${orderTimezone>0 ? '+' : '-' }${orderTimezone}`}
        </p>
      </div>
      <div className={styles.info}>
        <h2 className={styles.burgerName}>{order.name}</h2>
        {location.pathname === '/profile/orders' && 
          <p className={`${orderStatus.statusColor} ${styles.statusText}`}>{orderStatus.text}</p>}
      </div>
      <div className={styles.componentsAndPrice}>
        <div className={styles.ingredients}>
          { numberOfIngredients>0 && numberOfIngredients<=6 &&
            orderIngredients.map((item, index) => { return (
              <div key={item._id+index+order.number} className={`${styles.item}`} style={{'zIndex': `${6-index}`}}>
                <img className={styles.icon} src={item.image} alt={item.alt}/>
              </div>
            )})
          }
          { numberOfIngredients>6 &&
            orderIngredients.slice(0,6).map((item, index) => { return (
              <div key={item._id+index+order.number} className={`${styles.item}`} style={{'zIndex': `${6-index}`}}>
                {index === 5 && 
                  <p className={`${styles.count}`}>{`+${numberOfIngredients-5}`}</p>
                }
                <img className={styles.icon} src={item.image} alt={item.alt}/>
              </div>
            )})
          }
        </div>
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

export default OrderCard;