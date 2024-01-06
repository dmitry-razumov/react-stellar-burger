import styles from './profile.module.css'
import { logout } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();

  const logOut = e => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <div className={styles.profile}>
      <nav className={styles.nav}>
        <NavLink to='' className={styles.link} end>
          {({ isActive }) => (
            <span className={isActive ? `${styles.active}` : ""}>Профиль</span>
          )}
        </NavLink>
        <NavLink to='orders' className={styles.link} end>
        {({ isActive }) => (
            <span className={isActive ? `${styles.active}` : ""}>История заказов</span>
        )}
        </NavLink>
        <NavLink to='/'  className={styles.link} onClick={logOut}>
          {({ isActive }) => (
            <span className={isActive ? `${styles.active}` : ""}>Выход</span>
          )}
        </NavLink>
        <p className={styles.text}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
      </nav>
      <Outlet />
    </div>
  )
}

export default Profile;