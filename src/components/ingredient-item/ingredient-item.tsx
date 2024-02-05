import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from '../../services/hooks/hooks';
import { TIngredient } from '../../services/types/data';
import { FC } from 'react';

type TItem = {
  ingredient: TIngredient
}

const IngredientItem: FC<TItem> = ({ingredient, children}) => {
  const { ingredients, bun } = useSelector(store => store.burger);

  const calcItemQty = () => {
    if (ingredient.type === 'bun' && bun && bun._id === ingredient._id) {
      return 2
    } else if (ingredients !== null) {
      return ingredients.reduce((acc,el) => acc + +!!(el._id === ingredient._id), 0)
    }
    return 0
  }
  
  const quantity = calcItemQty();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
      <section className={styles.item} ref={dragRef}>
        <div className={styles.image}>
          {children}
        </div>
        <div className={styles.price}>
          <div className={styles.value}>
            {ingredient.price}
          </div>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.name}>{ingredient.name}</p>
        { quantity ? <Counter count={quantity} size="default" extraClass='m-1' /> : null }
      </section>
  )
}

export default IngredientItem;
