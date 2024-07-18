import {
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  user
} from '../user';

const mockData = {
  name: 'testName',
  email: 'testEmail@test.com',
  password: 'testPassword'
};

describe('Проверяем работу user.extraReducers', () => {
  describe('Проверяем работу loginUser', () => {
    it('Проверяем loginUser.pending', () => {
      const res = user(initialState, loginUser.pending('', mockData));
      expect(res.requestStatus).toBe('Loading');
    });
    it('Проверяем loginUser.fulfilled', () => {
      const res = user(
        initialState,
        loginUser.fulfilled(mockData, '', mockData)
      );
      expect(res.requestStatus).toBe('Success');
    });
    it('Проверяем loginUser.rejected', () => {
      const res = user(initialState, loginUser.rejected(null, '', mockData));
      expect(res.requestStatus).toBe('Failed');
    });
  });
  describe('Проверяем работу loginUser', () => {
    it('Проверяем logoutUser.fulfilled', () => {
      const res = user(initialState, logoutUser.fulfilled(void 0, ''));
      expect(res.requestStatus).toBe('Success');
    });
    it('Проверяем logoutUser.pending', () => {
      const res = user(initialState, logoutUser.pending(''));
      expect(res.requestStatus).toBe('Loading');
    });
  });
  it('Проверяем logoutUser.rejected', () => {
    const res = user(initialState, logoutUser.rejected(null, ''));
    expect(res.requestStatus).toBe('Failed');
  });
});
describe('Проверяем работу registerUser', () => {
  it('Проверяем registerUser.pending', () => {
    const res = user(initialState, registerUser.pending('', mockData));
    expect(res.requestStatus).toBe('Loading');
  });
  it('Проверяем registerUser.fulfilled', () => {
    const res = user(
      initialState,
      registerUser.fulfilled(mockData, '', mockData)
    );
    expect(res.requestStatus).toBe('Success');
  });
  it('Проверяем registerUser.rejected', () => {
    const res = user(initialState, registerUser.rejected(null, '', mockData));
    expect(res.requestStatus).toBe('Failed');
  });
});
describe('Проверяем работу updateUser', () => {
  it('Проверяем updateUser.pending', () => {
    const res = user(initialState, updateUser.pending('', mockData));
    expect(res.requestStatus).toBe('Loading');
  });
  it('Проверяем updateUser.fulfilled', () => {
    const res = user(
      initialState,
      updateUser.fulfilled(mockData, '', mockData)
    );
    expect(res.requestStatus).toBe('Success');
  });
  it('Проверяем updateUser.rejected', () => {
    const res = user(initialState, updateUser.rejected(null, '', mockData));
    expect(res.requestStatus).toBe('Failed');
  });
});
