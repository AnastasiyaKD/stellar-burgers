import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { feedSelectors, getFeeds } from '../../services/slices/feed';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((store: RootState) => store.feed.orders);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getFeeds());
  // }, [dispatch]);

  // const orders = useSelector(feedSelectors.selectOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
