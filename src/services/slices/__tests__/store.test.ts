import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../ingredients';

const mockStore = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer
});

describe('корневой редьюсер', () => {
  test('Правильная работа корневого редьюсера', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = mockStore(undefined, action);
    expect(state[ingredientsSlice.name]).toEqual(
      ingredientsSlice.reducer(undefined, action)
    );
  });
});
