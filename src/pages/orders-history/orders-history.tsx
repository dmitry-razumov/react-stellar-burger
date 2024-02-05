import { Link, useLocation } from 'react-router-dom';
import styles from './orders-history.module.css'
import OrderCard from '../../components/order-card/order-card';
import { useEffect } from 'react';
import { startWsConnect, stopWsConnect } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

function OrdersHistory() {
  const orders = useSelector(store => store.wsStore.orders);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(startWsConnect(`?token=${localStorage.getItem("accessToken")?.split('Bearer ')[1]}`));
    return () => {
      dispatch(stopWsConnect());
    }
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      {orders?.map(order => (
        <Link key={order._id} to={`${order.number}`}
          state={{ background:location }} className={styles.link}>
          <OrderCard key={order._id} order={order} />
        </Link>
        )).reverse()
      }
    </div>
  )
}

export default OrdersHistory;