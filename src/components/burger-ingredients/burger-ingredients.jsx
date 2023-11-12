import { useState } from "react"; 
import styles from './burger-ingredients.module.css';
import { dataPropType } from './../../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ShowItem from '../show-item/show-item'

const products = [
  {type: 'bun', name: 'Булки'},
  {type: 'sauce', name: 'Соусы'},
  {type: 'main', name : 'Начинки'}
]

function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = useState('Булки');

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <section className={styles.tab}>
        {products.map((product, index) => (
          <Tab value={product.name} key={index} active={current === product.name} onClick={setCurrent} >
            {product.name}
          </Tab>
          ))}
      </section>
      <section className={styles.scrollbar}>
        {products.map((product, index) =>
          (<ShowItem key={index} data={ingredients} name={product.name} type={product.type} />))}
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
 ingredients: dataPropType.isRequired
};

export default BurgerIngredients;