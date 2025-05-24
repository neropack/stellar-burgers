import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearConstructor, getBun, getItems } from '../../services/slices/constructorSlice';
import { getIsAuthChecked } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearCurrentOrder, getCurrentOrder, getIsOrderLoading, orderBurgerThunk } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuthChecked);
  const navigate = useNavigate();
  const bun = useSelector(getBun)
  const ingredients = useSelector(getItems);

  const constructorItems = {
    bun,
    ingredients
  };

  const orderRequest = useSelector(getIsOrderLoading);

  const orderModalData = useSelector(getCurrentOrder);
  
  const onOrderClick = () => {
    if (constructorItems.bun && !isAuth) navigate('/login');

    if (!constructorItems.bun || orderRequest) return;

    if (constructorItems.bun && isAuth) {
      const order = [constructorItems.bun._id, ...constructorItems.ingredients.map((ingredient) => ingredient._id), constructorItems.bun._id];
      dispatch(orderBurgerThunk(order));
    }
  };

  const closeOrderModal = () => {
    // надо было делать currentOrder в constructorSlice
    dispatch(clearConstructor());
    dispatch(clearCurrentOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
