import React from 'react';
import styles from './burger-ingredients.module.css';
import { dataPropType } from './../../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientItem from '../ingridient-item/ingridient-item';


function BurgerIngredients({ingredients}) {
  const product = [
    {type:'bun', name: 'Булки'},
    {type: 'sauce', name: 'Соусы'},
    {type: 'main', name : 'Начинки'}
  ]

  function ShowTab() {
    const [current, setCurrent] = React.useState('Булки')
    return (
      <div style={{ display: 'flex' }}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent} >
          {product[0].name}
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          {product[1].name}
        </Tab>
        <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
          {product[2].name}
        </Tab>
      </div>
    )
  }

  function ShowItem({ data, product}) {
    return (
      <>
        <h2 className={styles.headline}>{product.name}</h2>
        <div className={styles.grid}>  {
          data.map((item) => ((item.type === product.type) &&
            <IngridientItem key={item._id} item={item}>
              <img src={item.image} alt={item.name} />
            </IngridientItem>
          ))
        }
        </div>
      </>
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <section className={styles.tab}>
        <ShowTab />
      </section>
      <section className={styles.scrollbar}>
        {product.map((product, index) =>
          (<ShowItem key={index} data={ingredients} product={product} />))}
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
 ingredients: dataPropType.isRequired
};

export default BurgerIngredients;