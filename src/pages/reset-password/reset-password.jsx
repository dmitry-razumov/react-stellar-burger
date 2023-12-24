import styles from './reset-password.module.css'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { resetPassword } from '../../utils/user-api'

function ResetPassword() {
  const isResetEmailSent = localStorage.getItem('resetEmailSent');
  const navigate = useNavigate();
  const [form, setValue] = useState({ password: '', code: '' });
  
  const onSubmit = useCallback( 
    e => {
      e.preventDefault();
      resetPassword(form).then(() => {
        localStorage.removeItem('resetEmailSent'); 
        navigate('/login');
      });
    }, [form, navigate]
  );

  const onChange = e => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  if (!isResetEmailSent) {
    return (
      <Navigate to='/' replace={true} />
    )
  }

  return  (
  	<div className={styles.resetPassword}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput autoComplete='new-password' placeholder='Введите новый пароль' value={form.password} name='password' onChange={onChange}/>
        <Input autoComplete='one-time-code' placeholder='Введите код из письма' value={form.code} name='code' onChange={onChange}/>
        <Button htmlType='submit' size='medium'>Сохранить</Button>
      </form>
      <div className={styles.add_action}>
        <p className={styles.text}>Вспомнили пароль?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
  )
}

export default ResetPassword;