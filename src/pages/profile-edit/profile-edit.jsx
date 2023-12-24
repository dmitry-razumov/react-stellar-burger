import styles from './profile-edit.module.css'
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../../services/actions/user'

function ProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.user)
  const [form, setValue] = useState({ email: user.email, password: '', name: user.name });

  useEffect(() => {
      dispatch(getUser());
  }, [dispatch]);

  const isEdit = useMemo(() => {
    return form.name !== user.name || form.email !== user.email || form.password !== ''
  }, [form, user])

  const onChange = e => {
    e.preventDefault();
    setValue({ ...form, [e.target.name]: e.target.value });

  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateUser(form));
    setValue({ ...form, 'password': ''});
  }

  const onReset = e => {
    e.preventDefault();
    setValue({ ...form, 'email': user.email, 'name': user.name, 'password': ''});
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
      <Input autoComplete='username' icon='EditIcon' placeholder='Имя' value={form.name} name='name' onChange={onChange}/>
      <EmailInput autoComplete='username' icon='EditIcon' placeholder='Логин' value={form.email} name='email' onChange={onChange}/>
      < PasswordInput autoComplete='current-password' icon='EditIcon' value={form.password} name='password' onChange={onChange}/>
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