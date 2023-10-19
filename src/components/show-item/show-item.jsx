import styles from './show-item.module.css';
import PropTypes from 'prop-types';
import { dataPropType } from './../../utils/prop-types';
import IngridientItem from '../ingridient-item/ingridient-item';

function ShowItem({ data, name, type }) {
    return (
      <>
        <h2 className={styles.headline}>{name}</h2>
        <div className={styles.grid}>  
        {
          data.map((item) => ((item.type === type) &&
            <IngridientItem key={item._id} item={item}>
              <img src={item.image} alt={item.name} />
            </IngridientItem>
          ))
        }
        </div>
      </>
    );
}

ShowItem.propTypes = {
    data: dataPropType.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default ShowItem;