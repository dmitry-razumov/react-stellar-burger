import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ShowItems from '../show-items/show-items';
import { useState, useRef } from "react";

const products = [
  {type: 'bun', name: 'Булки'},
  {type: 'sauce', name: 'Соусы'},
  {type: 'main', name : 'Начинки'}
]

function BurgerIngredients() {
  const [visibleSection, setVisibleSection] = useState('bun');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.tab}>
        { products.map((product) => (
          <Tab value={product.type} key={product.name} active={visibleSection === product.type}
            onClick={(value: string): void => {
              const element = document.getElementById(value);
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }} >
            {product.name}
          </Tab>
          ))
        }
      </div>
      <div className={styles.scrollbar}>
        { products.map((product) => 
          (<ShowItems key={product.type} name={product.name} type={product.type} {...{setVisibleSection, containerRef}}/>))
        }
      </div>
    </div>
  )
}

export default BurgerIngredients;