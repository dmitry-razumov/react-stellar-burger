import { useEffect, cloneElement } from "react"; 
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, closeModal }) => {

  const closeByEsc = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal} >
        <div className={styles.close} onClick={closeModal}>
          <CloseIcon type="primary"/>
        </div>
        {cloneElement(children, {isModal: true})}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;