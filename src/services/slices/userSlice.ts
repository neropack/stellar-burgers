import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types"
import { RootState } from "../store";
import { loginUserApi, registerUserApi, TLoginData, TRegisterData } from "@api";
import { stat } from "fs";
import { setCookie } from "../../utils/cookie";

type TUserState = {
    user: TUser | null;
    isLoading: boolean;
    error: null | string | undefined;
    isAuthChecked: boolean;
}

const initialState: TUserState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthChecked: false,
}

export const userRegisterThunk = createAsyncThunk('user/register', (data: TRegisterData) => registerUserApi(data));
export const userLoginThunk = createAsyncThunk('user/login', (data: TLoginData) => loginUserApi(data));

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userRegisterThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(userRegisterThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(userRegisterThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isAuthChecked = true;
                state.user = payload.user;
                state.error = null;
                setCookie('accessToken', payload.accessToken);
                localStorage.setItem('refreshToken', payload.refreshToken)
                console.log(payload);
            })
            .addCase(userLoginThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(userLoginThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(userLoginThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.isAuthChecked = true;
                state.user = payload.user;
                state.error = null;
                setCookie('accessToken', payload.accessToken);
                localStorage.setItem('refreshToken', payload.refreshToken)
            })
    }
});

export default userSlice.reducer;
export const getUser = (state: RootState) => state.userSlice.user;
export const getUserName = (state: RootState) => state.userSlice.user?.name;
export const getIsAuthChecked = (state: RootState) => state.userSlice.isAuthChecked;