import { TOrder } from '@utils-types';
import {
  getOrderBurger,
  getOrderByNumber,
  initialState,
  order
} from '../order';

const mockOrder: TOrder[] = [
  {
    _id: '1',
    status: 'new',
    name: 'Test Name1',
    createdAt: '2020-05-05T00:00:00.000Z',
    updatedAt: '2020-05-05T00:00:00.000Z',
    number: 123,
    ingredients: []
  },
  {
    _id: '',
    status: 'new',
    name: 'Test Name2',
    createdAt: '2020-05-05T00:00:00.000Z',
    updatedAt: '2020-05-05T00:00:00.000Z',
    number: 456,
    ingredients: []
  }
];

describe('Проверяем работу order', () => {
  it('Проверяем getOrderBurger.pending', () => {
    const res = order(initialState, getOrderBurger.pending('', []));
    expect(res.requestStatus).toBe('Loading');
  });
  it('Проверяем getOrderBurger.fulfilled', () => {
    const res = order(
      initialState,
      getOrderBurger.fulfilled(
        { success: true, order: mockOrder[0], name: '' },
        '',
        []
      )
    );
    expect(res.requestStatus).toBe('Success');
    expect(res.info).toEqual(mockOrder[0]);
  });
  it('Проверяем getOrderBurger.rejected', () => {
    const res = order(initialState, getOrderBurger.rejected(null, '', []));
    expect(res.requestStatus).toBe('Failed');
  });
});
describe('Проверяем работу getOrderByNumber', () => {
  it('Проверяем getOrderByNumber.pending', () => {
    const res = order(initialState, getOrderByNumber.pending('', 123));
    expect(res.requestStatus).toBe('Loading');
  });
  it('Проверяем getOrderByNumber.fulfilled', () => {
    const res = order(
      initialState,
      getOrderByNumber.fulfilled({ success: true, orders: mockOrder }, '', 123)
    );
    expect(res.requestStatus).toBe('Success');
    expect(res.orderInfo).toEqual(mockOrder[0]);
  });
  it('Проверяем getOrderByNumber.rejected', () => {
    const res = order(initialState, getOrderByNumber.rejected(null, '', 123));
    expect(res.requestStatus).toBe('Failed');
  });
});
