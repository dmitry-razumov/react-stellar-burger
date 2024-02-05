import styles from './register.module.css'
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, FormEventHandler, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/actions/user'
import { useForm } from '../../hooks/use-form';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

function Register() {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ email:'', password: '', name: '' });
  const errorMessage = useSelector(store => store.user.errorRegisterMessage);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback( 
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(registerUser(values));
    }, [dispatch, values]
  );

  return (
		<div className={styles.register}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input placeholder='Имя' value={values.name} name='name' onChange={handleChange}/>
        <EmailInput value={values.email} name='email' onChange={handleChange}/>
        <PasswordInput value={values.password} name='password' onChange={handleChange}/>
        { errorMessage && (
          <p className={styles.error}>{ errorMessage }</p>
        )}
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