import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

const sliceName = 'ingredients';

export interface TIngredientsState {
  data: TIngredient[];
  requestStatus: RequestStatus;
}

const initialState: TIngredientsState = {
  data: [],
  requestStatus: RequestStatus.Idle
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state: TIngredientsState) => state.data,
    selectStatus: (state: TIngredientsState) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const { selectIngredients, selectStatus } = ingredientsSlice.selectors;
export const ingredientsActions = ingredientsSlice.actions;
