import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ShowItems from '../show-items/show-items';
import { useState } from "react"; 

const products = [
  {type: 'bun', name: 'Булки'},
  {type: 'sauce', name: 'Соусы'},
  {type: 'main', name : 'Начинки'}
]

function BurgerIngredients() {
  const [current, setCurrent] = useState('Булки');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.tab}>
        { products.map((product, index) => (
          <Tab value={product.name} key={index} active={current === product.name} onClick={setCurrent} >
            {product.name}
          </Tab>
          ))}
      </div>
      <div className={styles.scrollbar}>
        { products.map((product, index) => 
          (<ShowItems key={index} name={product.name} type={product.type} />))
        }
      </div>
    </div>
  )
}

export default BurgerIngredients;