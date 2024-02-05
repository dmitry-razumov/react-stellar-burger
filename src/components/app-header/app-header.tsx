import styles from './app-header.module.css';
import { useLocation, Link } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

function AppHeader() {
  const location = useLocation();

  return (
    <section className={styles.panel}>
      <nav className={styles.content}>
        <div className={styles.navigation}>
          <Link to='/' className={styles.link}>
            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
            <p className={location.pathname === '/' ? styles.active : ''}>Конструктор</p>
          </Link>
          <Link to='/feed' className={styles.link}>
            <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'}/>
            <p className={location.pathname === '/feed' ? styles.active : ''}>Лента заказов</p>
          </Link>
        </div>
        <Link to='/' className={styles.logo}>
          <Logo />
        </Link>
        <Link to='/profile' className={styles.link}>
          <ProfileIcon type={location.pathname.split('/')[1] === 'profile' 
                            || location.pathname === '/login' 
                            ? 'primary' : 'secondary'}/>
          <p className={location.pathname.split('/')[1] === 'profile' 
                       || location.pathname === '/login' 
                       ? styles.active : ''}>Личный кабинет</p>
        </Link>
      </nav>
    </section>
  )
}

export default AppHeader;
