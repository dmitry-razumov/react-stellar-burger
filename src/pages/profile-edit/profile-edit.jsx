import styles from './profile-edit.module.css'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../../services/actions/user'
import { useForm } from '../../hooks/use-form';

function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.user)
  const { values, handleChange, setValues } = useForm({ email: user.email, password: '', name: user.name });

  useEffect(() => {
      dispatch(getUser());
  }, [dispatch]);

  const isEdit = useMemo(() => {
    return values.name !== user.name || values.email !== user.email || values.password !== ''
  }, [values, user])

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateUser(values));
    setValues({ ...values, 'password': ''});
  }

  const onReset = e => {
    e.preventDefault();
    setValues({ ...values, 'email': user.email, 'name': user.name, 'password': ''});
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
      <Input autoComplete='username' icon='EditIcon' placeholder='Имя' value={values.name} name='name' onChange={handleChange}/>
      <EmailInput autoComplete='username' icon='EditIcon' placeholder='Логин' value={values.email} name='email' onChange={handleChange}/>
      < PasswordInput autoComplete='current-password' icon='EditIcon' value={values.password} name='password' onChange={handleChange}/>
      { isEdit &&
        <div className={styles.buttons}>
          <Button htmlType='reset' type='secondary' size='medium'>Отмена</Button>
          <Button htmlType='submit' type='primary' size='medium'>Сохранить</Button>
        </div>
      }
    </form>
  )
}

export default ProfileEdit;