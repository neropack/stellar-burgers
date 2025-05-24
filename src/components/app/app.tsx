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
import { Routes, Route, useLocation, useNavigate, useMatch } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuthThunk } from '../../services/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const matchFeed = useMatch(`/feed/:number`)?.params.number;
  const matchOrder = useMatch(`/profile/orders/:number`)?.params.number;

  useEffect(() => {
    dispatch(getIngredientsThunk())
    dispatch(checkUserAuthThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* страницы */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path='/ingredients/:id' element={<OnlyUnAuth component={<IngredientDetails />} />} />
        <Route path='/feed/:number' element={<OnlyUnAuth component={<OrderInfo />} />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}/>
        <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders />} />}/>
        <Route path='/profile/orders/:number' element={<OnlyAuth component={<OrderInfo />} />}/>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
        {/* модальные окна */}
        {backgroundLocation && 
          <Routes >
            <Route
            path='/feed/:number'
            element={
              <Modal title={`#${matchFeed}`} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={<OnlyAuth component={
              <Modal title={`#${matchOrder}`} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }/>}
          />
          </Routes >
        }
    </div>
    );
}
  

export default App;
