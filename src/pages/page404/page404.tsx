import styles from './page404.module.css'
import { Link } from 'react-router-dom';

function Page404() {

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Oops! 404 Error</h1>
          <p  className={styles.text}>Такая страница не найдена!</p>
          <p className={styles.text} >Проверьте адрес или перейдите на 
            <Link to='/' className={styles.link}> главную страницу</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page404;