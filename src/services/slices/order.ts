import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
//import { getOrderBurger } from './burgerConstructor';

const sliceName = 'order';

export interface TOrderState {
  orderInfo: TOrder | null;
  info: TOrder | null;
  requestStatus: RequestStatus;
}

export const initialState: TOrderState = {
  orderInfo: null,
  info: null,
  requestStatus: RequestStatus.Idle
};

export const getOrderBurger = createAsyncThunk(
  'order/orderBurger',
  async (orderData: string[]) => await orderBurgerApi(orderData)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderInfo',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.info = null;
      state.requestStatus = RequestStatus.Idle;
    }
  },
  selectors: {
    selectInfo: (state: TOrderState) => state.info,
    selectStatus: (state: TOrderState) => state.requestStatus,
    selectOrderInfo: (state: TOrderState) => state.orderInfo
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurger.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrderBurger.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.info = action.payload.order;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orderInfo = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const { selectInfo, selectStatus, selectOrderInfo } =
  orderSlice.selectors;
export const orderActions = orderSlice.actions;
export const order = orderSlice.reducer;
