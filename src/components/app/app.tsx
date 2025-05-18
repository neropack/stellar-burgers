import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredientsThunk())
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* страницы */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}/>
        <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders />} />}/>
        <Route path='*' element={<NotFound404 />} />
        {/* модальные окна */}
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={console.log}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='' onClose={console.log}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={
            <Modal title='' onClose={console.log}>
              <OrderInfo />
            </Modal>
          }/>}
        />
      </Routes>
    </div>
    );
}
  

export default App;
