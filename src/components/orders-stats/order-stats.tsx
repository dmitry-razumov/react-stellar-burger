import { useSelector } from '../../services/hooks/hooks';
import { TOrder } from '../../services/types/data';
import styles from './order-stats.module.css'
import { useCallback } from 'react';

function OrderStats() {
  const orders = useSelector(store => store.wsStore.orders);
  const total = useSelector(store => store.wsStore.total);
  const totalToday = useSelector(store => store.wsStore.totalToday);

  const doneOrders = orders?.filter(order => order.status === 'done') ?? [];
  const inWorkOrders = orders?.filter(order => order.status === 'pending') ?? [];

  const getOneColumn = (orders:ReadonlyArray<TOrder>, index:number, colorStyle:string) => {
    return (
      <div className={styles.orderColumn} key={index}>
        { orders.map(order => (
          <p key={order.number} className={`${styles.numberText} ${colorStyle}`}>
            {order.number.toString().padStart(6, '0')}
          </p>
        ))}
      </div>
    )
  }

  const renderNumbersByColumns = useCallback((orders:ReadonlyArray<TOrder>, colorStyle:string) => {
    const ordersColumns: Array<TOrder>[] = [];
    for (let i = 0, len = orders.length; i < len; i+=5) {
      ordersColumns[i] = orders.slice(i,i+5);
    }
    return ordersColumns.map((fiveOrders, index) => 
      getOneColumn(fiveOrders, index, `${colorStyle}`))
  }, []);

  return (
    <div className={styles.stats}>
      <div className={styles.orderBoards}>
        <div className={styles.listOrders}>
          <h2 className={styles.title}>Готовы:</h2>
          <div className={styles.listNumbers}>
            {renderNumbersByColumns(doneOrders, `${styles.doneColor}`)}
          </div>
        </div>
        <div className={styles.listOrders}>
          <h2 className={styles.title}>В работе:</h2>
          <div className={styles.listNumbers}>
            {renderNumbersByColumns(inWorkOrders, `${styles.inWorkColor}`)}
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <p className={styles.title}>Выполнено за всё время:</p>
        <p className={styles.completedNumbers}>{total}</p>
      </div>
      <div className={styles.total}>
        <p className={styles.title}>Выполнено за сегодня:</p>
        <p className={styles.completedNumbers}>{totalToday}</p>
      </div>
    </div>
  )
}

export default OrderStats;