import { feed, getFeeds, initialState } from '../feed';

const mockData = {
  orders: [
    {
      _id: '1',
      status: 'pending',
      name: 'Test Name',
      createdAt: '2020-05-05T00:00:00.000Z',
      updatedAt: '2020-05-05T00:00:00.000Z',
      number: 123,
      ingredients: ['Булка', 'Начинка']
    }
  ],
  total: 100,
  totalToday: 20
};

describe('Проверяем работу feed', () => {
  it('Проверяем getFeeds.pending', () => {
    const res = feed(initialState, getFeeds.pending(''));
    expect(res.requestStatus).toBe('Loading');
  });
  it('Проверяем getFeeds.fulfilled', () => {
    const res = feed(
      initialState,
      getFeeds.fulfilled({ ...mockData, success: true }, '')
    );
    expect(res.requestStatus).toBe('Success');
    expect(res.orders).toEqual(mockData.orders);
    expect(res.total).toBe(mockData.total);
    expect(res.totalToday).toBe(mockData.totalToday);
  });
  it('Проверяем getFeeds.rejected', () => {
    const res = feed(initialState, getFeeds.rejected(null, ''));
    expect(res.requestStatus).toBe('Failed');
  });
});
