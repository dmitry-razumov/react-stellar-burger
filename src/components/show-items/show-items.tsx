import styles from './show-items.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { useSelector } from '../../services/hooks/hooks';
import { Link, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, FC, Dispatch, RefObject } from 'react';

type TItems = {
  name: string,
  type: string,
  setVisibleSection: Dispatch<React.SetStateAction<string>>,
  containerRef: RefObject<HTMLDivElement>
}

const ShowItems: FC<TItems> = ({name, type, setVisibleSection, containerRef}) => {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const location = useLocation();
  const [bunView, setBunView ] = useState(true);
  const [sauceView, setSauceView ] = useState(true);
  const [mainView, setMainView ] = useState(true);
   
  const { ref, inView, entry } = useInView({
    threshold: 0.01,
    root: containerRef.current,
    rootMargin: '0px'
  });

  useEffect(() => {
    if(bunView) {
      setVisibleSection('bun');
    } else if(sauceView) {
      setVisibleSection('sauce');
    } else if(mainView){
      setVisibleSection('main');
    }
  }, [bunView, sauceView, mainView, setVisibleSection]);

  useEffect(() => {
    if (entry?.target.id === 'bun') {
      setBunView(inView);
      if (!inView) {
        setSauceView(true);
        setMainView(false);
      }
    }
    if (entry?.target.id === 'sauce') {
      setSauceView(inView);
      if (!inView) {
        setBunView(false);
        setMainView(true);
      }
    }
    if (entry?.target.id === 'main') {
      setMainView(inView);
      if (!inView) {
        setBunView(false);
        setSauceView(false);
      }
    }
  }, [inView, entry]);

  return (
    <div id={type} ref={ref}>
      <h2 className={styles.headline}>{name}</h2>
      <div className={styles.grid}>  
      { ingredients !== null &&
        ingredients.map((item) => ((item.type === type) &&
        <Link key={item._id} to={`/ingredients/${item._id}`}
            state={{ background:location }} className={styles.link}>
          <IngredientItem key={item._id} ingredient={item}>
            <img src={item.image} alt={item.name} />
          </IngredientItem>
        </Link>
        ))
      }
      </div>
    </div>
  );
}

export default ShowItems;