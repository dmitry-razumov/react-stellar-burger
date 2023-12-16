import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main"
import ErrorBoundary from "../error-boundary/error-boundary";
import { getIngredients } from "../../services/actions/ingredients";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
    <ErrorBoundary>
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
    </div>
    </ErrorBoundary>
  )
}

export default App;
