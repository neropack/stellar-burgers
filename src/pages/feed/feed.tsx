import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrdersFeed, getFeedsThunk, isLoadingOrders } from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector(getOrdersFeed);
  const isLoading = useSelector(isLoadingOrders);
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  }

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
