import styles from './app-header.module.css';
import NavigationLink from '../navigation-link/navigation-link';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { isActive } from '../app/app';

function AppHeader() {
  return (
    <>
      <section className={styles.panel}>
        <nav className={styles.content}>
          <div className={styles.navigation}>
            <NavigationLink text='Конструктор' 
              textStyle={isActive ? "text text_type_main-default" 
                                : "text text_type_main-default text_color_inactive"}
              icon={isActive ? <BurgerIcon type="primary" />
                            : <BurgerIcon type="secondary" />}
            />
            <NavigationLink text='Лента заказов' 
              textStyle={!isActive ? "text text_type_main-default" 
                                : "text text_type_main-default text_color_inactive"}
              icon={!isActive ? <ListIcon type="primary" />
                            : <ListIcon type="secondary" />}
            />            
          </div>
          <Logo />
          <NavigationLink text='Личный кабинет' 
              textStyle={!isActive ? "text text_type_main-default" 
                                : "text text_type_main-default text_color_inactive"}
              icon={!isActive ? <ProfileIcon type="primary" />
                            : <ProfileIcon type="secondary" />}
            />   
        </nav>
      </section>
    </>
  );
};

export default AppHeader;