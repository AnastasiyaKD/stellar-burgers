import { TOrder } from '@utils-types';
import { getOrders, initialState, orders } from '../orders';

const moskOrders: TOrder[] = [
  {
    _id: '1',
    status: 'pending',
    name: 'Order 1',
    createdAt: '2020-05-05T00:00:00.000Z',
    updatedAt: '2020-05-05T00:00:00.000Z',
    number: 123,
    ingredients: []
  }
];

describe('Проверяем работу orders', () => {
  it('Проверяем pending', () => {
    const res = orders(initialState, getOrders.pending(''));
    expect(res.requestStatus).toBe('Loading');
  });
  it('Проверяем fulfilled', () => {
    const res = orders(initialState, getOrders.fulfilled(moskOrders, ''));
    expect(res.requestStatus).toBe('Success');
    expect(res.orders).toEqual(moskOrders);
  });
  it('Проверяем rejected', () => {
    const res = orders(initialState, getOrders.rejected(null, ''));
    expect(res.requestStatus).toBe('Failed');
  });
});
