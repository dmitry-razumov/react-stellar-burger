import styles from './reset-password.module.css'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, FormEventHandler, useCallback } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { resetPassword } from '../../utils/user-api'
import { useForm } from '../../hooks/use-form';

function ResetPassword() {
  const isResetEmailSent = localStorage.getItem('resetEmailSent');
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ password: '', code: '' });
  
  const onSubmit:FormEventHandler<HTMLFormElement> = useCallback( 
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetPassword(values).then(() => {
        localStorage.removeItem('resetEmailSent'); 
        navigate('/login');
      });
    }, [values, navigate]
  );

  if (!isResetEmailSent) {
    return (
      <Navigate to='/' replace={true} />
    )
  }

  return (
  	<div className={styles.resetPassword}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <PasswordInput autoComplete='new-password' placeholder='Введите новый пароль' value={values.password} name='password' onChange={handleChange}/>
        <Input autoComplete='one-time-code' placeholder='Введите код из письма' value={values.code} name='code' onChange={handleChange}/>
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