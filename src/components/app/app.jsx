import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import AppHeader from '../app-header/app-header';
import ErrorBoundary from '../error-boundary/error-boundary';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { getIngredients } from '../../services/actions/ingredients';
import { OnlyUnAuth, OnlyAuth } from './../protected-route'
import { checkUserAuth } from '../../services/actions/user';
import Home from '../../pages/home/home'
import Login from '../../pages/login/login'
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import OrdersHistory from '../../pages/orders-history/orders-history';
import ProfileEdit from '../../pages/profile-edit/profile-edit';
import Page404 from '../../pages/page404/page404'

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem('resetEmailSent');
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <ErrorBoundary>
    <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
            <Route index element={<ProfileEdit />}/>
            <Route path='orders' element={<OrdersHistory />} />
            <Route path='*' element={<Page404 />} />
          </Route>
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
          <Route path='*' element={<Page404 />} />
        </Routes>

        { background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal closeModal={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
    </div>
    </ErrorBoundary>
  )
}

export default App;
