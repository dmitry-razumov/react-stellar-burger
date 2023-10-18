import { ingredientPropType } from './../../utils/prop-types';
import styles from './ingredient-details.module.css';

function IngredientDetails(data) {
  return (
    <div className={styles.details}>
      <img className={styles.img} src={data.data.image_large} alt={data.data.name}/>
      <h2 className={styles.name}>{data.data.name}</h2>
      <ul className={styles.nutritionValues}>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Калории,ккал</h3>
            <p className='text text_type_digits-default'>{data.data.calories}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Белки, г</h3>
            <p className='text text_type_digits-default'>{data.data.proteins}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Жиры, г</h3>
            <p className='text text_type_digits-default'>{data.data.fat}</p>
        </li>
        <li className={styles.nutritionValue}>
            <h3 className='text text_type_main-default'>Углеводы, г</h3>
            <p className='text text_type_digits-default'>{data.data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  data: ingredientPropType.isRequired,
};

export default IngredientDetails;