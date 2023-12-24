import styles from './forgot-password.module.css'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendResetEmail } from '../../utils/user-api';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onChange = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = useCallback( 
    e => {
      e.preventDefault();
      sendResetEmail(email).then((res) => {
        localStorage.setItem('resetEmailSent', true); 
        navigate('/reset-password');
      });
    }, [email, navigate]
  );

	return (
		<div className={styles.forgotPassword}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput placeholder='Укажите e-mail' value={email} onChange={onChange}/>
        <Button htmlType='submit' size='medium'>Восстановить</Button>
      </form>
      <div className={styles.add_action}>
        <p className={styles.text}>Вспомнили пароль?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
	);
}

export default ForgotPassword;