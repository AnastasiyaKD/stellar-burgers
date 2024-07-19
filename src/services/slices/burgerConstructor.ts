import { orderBurgerApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const sliceName = 'burgerConstructor';

export interface TBurgerState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: TBurgerState = {
  bun: null,
  ingredients: []
};

export const burgerSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addToConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeFromConstructor: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveItemUp: (state, action: PayloadAction<number>) => {
      const item = state.ingredients.splice(action.payload, 1)[0];
      state.ingredients.splice(action.payload - 1, 0, item);
    },
    moveItemDown: (state, action: PayloadAction<number>) => {
      const item = state.ingredients.splice(action.payload, 1)[0];
      state.ingredients.splice(action.payload + 1, 0, item);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBurger: (state: TBurgerState) => state
  }
});

export const burgerSelectors = burgerSlice.selectors;
export const {
  clearConstructor,
  moveItemDown,
  moveItemUp,
  resetConstructor,
  addToConstructor,
  removeFromConstructor
} = burgerSlice.actions;
export default burgerSlice.reducer;
