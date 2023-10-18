import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main"
import ErrorBoundary from "../errorboundary/error-boundary";
import getIngredientsData from "../../utils/burger-api";
export const isActive = true;

function App() {
  const [data, setData] = React.useState({
    ingredientsData: null,
    isLoading: true,
    isError: false,
    errorType: ''
  })

  React.useEffect((data) => {
    getIngredientsData(data, setData);
  }, [])

  return (
    <ErrorBoundary>
    <div className={styles.app}>
      <AppHeader />
      {!data.isLoading && !data.isError && <Main ingredients={data.ingredientsData} />}
      {data.isLoading && !data.isError && <p className={`text text_type_main-large ${styles.loading}`}>Данные загружаются</p>}
      {data.isError && <p className={`text text_type_main-large ${styles.loading}`}>{`Ошибка сервера: ${data.errorType}`}</p>}
    </div>
    </ErrorBoundary>
  );
}

export default App;
