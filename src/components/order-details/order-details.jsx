import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import imageDone from './../../images/done.png';

function OrderDetails({ orderNumber }) {
  const order = orderNumber.toString().padStart(6, '0');

  return (
    <div className={styles.details}>
      <p className={styles.text}>{order}</p>
      <p className={styles.subtext1}>идентификатор заказа</p>
      <img className={styles.img} src={imageDone} alt="Кнопка Ок"/>
      <p className={styles.subtext2}> Ваш заказ начали готовить</p>
      <p className={styles.subtext3}> Дождитесь готовности на орбитальной станции</p>
    </div>    
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
};

export default OrderDetails;