import styles from './login.module.css'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../services/actions/user';
import { useForm } from '../../hooks/use-form';

function Login() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.errorLoginMessage);
  const { values, handleChange } = useForm({email:'', password:''});

  const onSubmit = useCallback( 
    e => {
      e.preventDefault();
      dispatch(login(values));
    }, [dispatch, values]
  );

	return (
		<div className={styles.login}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput autoComplete='username' value={values.email} name='email' onChange={handleChange}/>
        <PasswordInput autoComplete='current-password' value={values.password} name='password' onChange={handleChange}/>
        { errorMessage && (
          <p className={styles.error}>{ errorMessage }</p>
        )}
        <Button htmlType='submit' size='medium'>Войти</Button>
      </form>
      <div className={styles.add_action}>
        <p className={styles.text}>Вы новый пользователь?</p>
        <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
      </div>
      <div className={styles.add_action}>
        <p className={styles.text}>Забыли пароль?</p>
        <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
      </div>
    </div>
	);
}

export default Login;