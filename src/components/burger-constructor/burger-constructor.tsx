import { FC, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/user';
import {
  getOrderBurger,
  orderActions,
  selectInfo,
  selectStatus
} from '../../services/slices/order';
import {
  burgerSelectors,
  clearConstructor
} from '../../services/slices/burgerConstructor';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderStatus = useSelector(selectStatus);
  const user = useSelector(userSelectors.selectUser);

  const constructorItems = useSelector(burgerSelectors.selectBurger);

  const orderRequest = orderStatus === RequestStatus.Loading ? true : false;

  const orderModalData = useSelector(selectInfo);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    } else {
      const bunId = constructorItems.bun._id;
      const ingredientsId = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId].concat(ingredientsId);
      dispatch(getOrderBurger(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(orderActions.resetOrder());
    dispatch(clearConstructor());
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
