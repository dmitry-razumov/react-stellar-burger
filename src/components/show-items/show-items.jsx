import styles from './show-items.module.css';
import PropTypes from 'prop-types';
import IngredientItem from '../ingredient-item/ingredient-item';
import { useSelector } from "react-redux";

function ShowItems({ name, type }) {
  const ingredients = useSelector(store => store.ingredients.ingredients);

  return (
    <>
      <h2 className={styles.headline}>{name}</h2>
      <div className={styles.grid}>  
      { ingredients !== null &&
        ingredients.map((item) => ((item.type === type) &&
          <IngredientItem key={item._id} item={item}>
            <img src={item.image} alt={item.name} />
          </IngredientItem>
        ))
      }
      </div>
    </>
  );
}

ShowItems.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default ShowItems;