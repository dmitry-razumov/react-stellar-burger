import styles from './modal-overlay.module.css';

const ModalOverlay = ({closeModal}: {closeModal():void}) => {
  return (
    <div className={styles.modalOverlay} onClick={closeModal} ></div>
  );
}

export default ModalOverlay;