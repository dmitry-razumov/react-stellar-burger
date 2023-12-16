import styles from './order-details.module.css';
import imageDone from './../../images/done.png';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const { order } = useSelector(store => store.order);

  return (
    <div className={styles.details}>
      <p className={styles.text}>{order.toString().padStart(6, '0')}</p>
      <p className={styles.subtext1}>идентификатор заказа</p>
      <img className={styles.img} src={imageDone} alt="Кнопка Ок"/>
      <p className={styles.subtext2}> Ваш заказ начали готовить</p>
      <p className={styles.subtext3}> Дождитесь готовности на орбитальной станции</p>
    </div>    
  );
}

export default OrderDetails;