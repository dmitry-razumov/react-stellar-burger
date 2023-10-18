import styles from './main.module.css';
import { dataPropType } from './../../utils/prop-types';
import BurgerIngredients from './../burger-ingredients/burger-ingredients';
import BurgerConstructor from './../burger-constructor/burger-constructor';

const Main = (props) => {
  const localIngredients = props.ingredients.slice();
  localIngredients.forEach((item) => item.quantity = 0);
  
  return (
    <div className = {styles.main}>
      <section>
        <BurgerIngredients ingredients = {localIngredients} />
      </section>
      <section>
        <BurgerConstructor ingredients = {localIngredients} />
      </section>
    </div>
  )
}

Main.propTypes = {
  ingredients: dataPropType.isRequired
};

export default Main;