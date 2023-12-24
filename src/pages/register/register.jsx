import styles from './register.module.css'
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/actions/user'


function Register() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email:'', password: '', name: '' });

  const onSubmit = useCallback( 
    e => {
      e.preventDefault();
      dispatch(registerUser(form));
    }, [dispatch, form]
  );

  const onChange = e => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
		<div className={styles.register}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input placeholder='Имя' value={form.name} name='name' onChange={onChange}/>
        <EmailInput value={form.email} name='email' onChange={onChange}/>
        <PasswordInput value={form.password} name='password' onChange={onChange}/>
        <Button htmlType='submit' size='medium'>Зарегистрироваться</Button>
      </form>
      <div className={styles.add_action}>
        <p className={styles.text}>Уже зарегистрированы?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
	);
}

export default Register;