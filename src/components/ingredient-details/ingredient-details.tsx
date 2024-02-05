import { Params, useLocation, useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks/hooks';
import { TIngredient } from '../../services/types/data';

export const IngredientDetails = () => {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const { ingredientId } : Readonly<Params<string>> = useParams();
  
  const location = useLocation();
  const isModal = location.state && location.state.background;

  if(!ingredients) {
    return null;
  }

  const data: TIngredient | undefined = ingredients.find(item => item._id === ingredientId);

  return (
    <div className={ `${styles.details} ${isModal ? styles.details_modal : ''}`}>
      <p className={ `${styles.title} ${isModal ? styles.title_modal : ''}`}>Детали ингредиента</p>
      <img className={styles.img} src={data?.image_large} alt={data?.name}/>
      <h2 className={styles.name}>{data?.name}</h2>
      <ul className={styles.nutritionValues}>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Калории,ккал</h3>
            <p className='text text_type_digits-default'>{data?.calories}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Белки, г</h3>
            <p className='text text_type_digits-default'>{data?.proteins}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Жиры, г</h3>
            <p className='text text_type_digits-default'>{data?.fat}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Углеводы, г</h3>
            <p className='text text_type_digits-default'>{data?.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;