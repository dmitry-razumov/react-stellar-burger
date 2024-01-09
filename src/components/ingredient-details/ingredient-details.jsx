import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails(props) {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const { ingredientId } = useParams();
  
  if(!ingredients) {
    return null;
  }

  const data = ingredients.find(item => item._id === ingredientId);

  return (
    <div className={ `${styles.details} ${props?.isModal ? styles.details_modal : ''}`}>
      <p className={ `${styles.title} ${props?.isModal ? styles.title_modal : ''}`}>Детали ингредиента</p>
      <img className={styles.img} src={data.image_large} alt={data.name}/>
      <h2 className={styles.name}>{data.name}</h2>
      <ul className={styles.nutritionValues}>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Калории,ккал</h3>
            <p className='text text_type_digits-default'>{data.calories}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Белки, г</h3>
            <p className='text text_type_digits-default'>{data.proteins}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Жиры, г</h3>
            <p className='text text_type_digits-default'>{data.fat}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Углеводы, г</h3>
            <p className='text text_type_digits-default'>{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;