import { useSelector } from 'react-redux';
import styles from './order-stats.module.css'
import { useCallback } from 'react';

function convert1Dto2D(arr1D, cols) {
  const arr2D = [];
  
  for (let i = 0, len = arr1D.length; i < len; ++i) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    if (!arr2D[row]) arr2D[row] = []; 
    arr2D[row][col] = arr1D[i];
  }

  return arr2D;
}

function OrderStats() {
  const orders = useSelector(store => store.wsStore.orders);
  const total = useSelector(store => store.wsStore.total);
  const totalToday = useSelector(store => store.wsStore.totalToday);

  const doneOrders = orders.filter(order => order.status === 'done');
  const inWorkOrders = orders.filter(order => order.status === 'pending');

  const getOneColumn = (orders, index, colorStyle) => {
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

  const renderNumbersByColumns = useCallback((orders, colorStyle) => {
    return convert1Dto2D(orders, 5).map((fiveOrders, index) => 
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