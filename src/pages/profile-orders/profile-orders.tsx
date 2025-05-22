import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, getOrdersThunk } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);
  console.log(orders);

  useEffect(() => {
    dispatch(getOrdersThunk());
    console.log(orders);
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
