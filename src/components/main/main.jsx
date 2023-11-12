import styles from './main.module.css';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';

function Main() {
    
  return (
    <div className = {styles.main}>
      <section>
        <BurgerIngredients />
      </section>
      <section>
        <BurgerConstructor />
      </section>
    </div>
  )
}

export default Main;