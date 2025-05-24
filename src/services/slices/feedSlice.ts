import { getFeedsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', () => getFeedsApi());

type TFeedsState = {
    isLoading: boolean,
    orders: TOrder[] | [],
    total: number,
    totalToday: number,
    error: null | string | undefined;
}

const initialState: TFeedsState = {
    isLoading: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
}

const feedsSlice = createSlice({
    name: 'feeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeedsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getFeedsThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.orders = payload.orders;
                state.total = payload.total;
                state.totalToday = payload.totalToday;
            })
            .addCase(getFeedsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        }
})

export default feedsSlice.reducer;
export const getOrdersFeed = (state: RootState) => state.feedsSlice.orders;
export const isLoadingOrders = (state:RootState) => state.feedsSlice.isLoading;
export const getFeed = (state: RootState) => {
    const feed = {
        total: state.feedsSlice.total,
        totalToday: state.feedsSlice.totalToday,
    }
    return feed;
}