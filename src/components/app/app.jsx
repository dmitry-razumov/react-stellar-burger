import { useState, useEffect } from "react"; 
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main"
import ErrorBoundary from "../errorboundary/error-boundary";
import { getIngredientsData } from "../../utils/burger-api";

function App() {
  const [data, setData] = useState({
    ingredientsData: [],
    isLoading: true,
    isError: false,
    errorType: ''
  })

  useEffect((data) => {
    setData({ ...data, isLoading: true, isError: false });
    getIngredientsData()
    .then(res => {
      setData((prevData) => ({...prevData, ingredientsData: res.data}))
    })
    .catch(res => {
      setData((prevData) => ({...prevData, isError: true, errorType: res}))
    })
    .finally(() => {
      setData((prevData) => ({...prevData, isLoading: false}))
    })
  }, [])

  return (
    <ErrorBoundary>
    <div className={styles.app}>
       <AppHeader />
      {data.isLoading && <p className={`text text_type_main-large ${styles.loading}`}>Данные загружаются</p>}
      {data.isError && <p className={`text text_type_main-large ${styles.loading}`}>{`Ошибка сервера: ${data.errorType}`}</p>}
      {!data.isLoading && !data.isError && data.ingredientsData && <Main ingredients={data.ingredientsData} />}
    </div>
    </ErrorBoundary>
  )
}

export default App;
