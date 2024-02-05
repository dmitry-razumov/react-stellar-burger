import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useDispatch } from '../../services/hooks/hooks';
import { useEffect } from 'react';
import { clearOrder } from '../../services/actions/order';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearOrder())
  }, [dispatch])

  return (
    <div className = {styles.home}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  )
}

export default Home;