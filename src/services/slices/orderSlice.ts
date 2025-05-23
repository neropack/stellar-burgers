import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export const getOrderByNumberThunk = createAsyncThunk('order/getOrderByNumber', (id: number) => getOrderByNumberApi(id));
export const getOrdersThunk = createAsyncThunk('order/getOrders', () => getOrdersApi());
export const orderBurgerThunk = createAsyncThunk('order/orderBuger', (order: string[]) => orderBurgerApi(order));

type TOrderState = {
    isLoading: boolean;
    error: null | string | undefined;
    currentOrder: TOrder | null;
    orders: TOrder[];
}

const initialState: TOrderState = {
    isLoading: false,
    error: null,
    currentOrder: null,
    orders: [],
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderByNumberThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderByNumberThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.currentOrder = payload.orders[0];
            })
            .addCase(getOrdersThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrdersThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.orders = action.payload;
            })
            .addCase(orderBurgerThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(orderBurgerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(orderBurgerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.currentOrder = action.payload.order;
            })
            
    }
})

export default orderSlice.reducer;

export const getOrders = (state: RootState) => state.orderSlice.orders;
export const getOrderByNumber = (id: number) => (state: RootState) => state.orderSlice.currentOrder;
export const getCurrentOrder = (state: RootState) => state.orderSlice.currentOrder;
export const getIsOrderLoading = (state: RootState) => state.orderSlice.isLoading;
export const {clearCurrentOrder} = orderSlice.actions;