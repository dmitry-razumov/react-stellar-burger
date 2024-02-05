import styles from './order-feed.module.css'
import OrderStats from '../../components/orders-stats/order-stats'
import OrderCard from '../../components/order-card/order-card'
import { useEffect } from 'react';
import { startWsConnect, stopWsConnect } from '../../services/actions/wsActions';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

function OrderFeed() {
  const orders = useSelector(store => store.wsStore.orders);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(startWsConnect('/all'));
    return () => {
      dispatch(stopWsConnect());
    }
  }, [dispatch]);

  return (
    orders &&
    <div className={styles.feed}>
      <h1 className={styles.title}>Лента заказов</h1>
      <div className={styles.container}>
        <div className={styles.orders}>
          {orders?.map(order => (
            <Link key={order._id} to={`${order.number}`}
              state={{ background:location, state: order}} className={styles.link}>
              <OrderCard key={order._id} order={order} />
            </Link>
            ))
          }
        </div>
        <OrderStats />
      </div>
    </div>
  )
}

export default OrderFeed