import styles from './login.module.css'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../services/actions/user';

function Login() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({email:'', password:''});

  const onChange = e => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback( 
    e => {
      e.preventDefault();
      dispatch(login(form));
    }, [dispatch, form]
  );

	return (
		<div className={styles.login}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <EmailInput autoComplete='username' value={form.email} name='email' onChange={onChange}/>
        <PasswordInput autoComplete='current-password' value={form.password} name='password' onChange={onChange}/>
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