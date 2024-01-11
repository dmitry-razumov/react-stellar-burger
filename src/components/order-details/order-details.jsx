import styles from './order-details.module.css';
import imageDone from './../../images/done.png';
import { useSelector } from 'react-redux';

function OrderDetails(props) {
  const order = useSelector(store => store.order.order);

  return (
    <div className={ `${styles.details} ${props?.isModal ? styles.details_modal : ''}`}>
      <p className={ `${styles.title} ${props?.isModal ?  styles.title_modal : ''}` }></p>
      <div className={styles.content}>
        { order === null
          ? <p className={styles.waitText}>...получаем номер заказа</p>
          : <p className={styles.text}>{order.number.toString().padStart(6, '0')}</p>
        }
        <p className={styles.subtext1}>идентификатор заказа</p>
        <img className={styles.img} src={imageDone} alt="Кнопка Ок"/>
        <p className={styles.subtext2}> Ваш заказ начали готовить</p>
        <p className={styles.subtext3}> Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>    
  );
}

export default OrderDetails;