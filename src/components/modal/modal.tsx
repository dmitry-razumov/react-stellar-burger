import { useEffect, FC } from "react"; 
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

const modalRoot = document.getElementById('react-modals');

type TModal = {
  closeModal(): void,
};

const Modal:FC<TModal> = ({ children, closeModal }) => {

  const closeByEsc = (event: Event & { key: string }) => {
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
          { children }
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalRoot as HTMLElement
  );
};

export default Modal;