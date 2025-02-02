import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getOrders, selectOrders } from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
