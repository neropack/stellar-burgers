import { getOrderByNumberApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export const getOrderByNumberThunk = createAsyncThunk('order/getOrderByNumber', (id: number) => getOrderByNumberApi(id));

type TOrderState = {
    isLoading: boolean;
    error: null | string | undefined;
    order: TOrder | null;
}

const initialState: TOrderState = {
    isLoading: false,
    error: null,
    order: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
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
                state.order = payload.orders[0];
            } )
    }
})

export default orderSlice.reducer;
export const getOrderByNumber = (id: number) => (state: RootState) => state.orderSlice.order;