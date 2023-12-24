import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

function Home() {
    
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