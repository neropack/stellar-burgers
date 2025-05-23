import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types"
import { RootState } from "../store";
import { getUserApi, loginUserApi, logoutApi, registerUserApi, TLoginData, TRegisterData, updateUserApi } from "@api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

type TUserState = {
    user: TUser | null | undefined;
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
export const userLogoutThunk = createAsyncThunk('user/logout', logoutApi);
export const userUpdateThunk = createAsyncThunk('user/update', (data: TRegisterData) => updateUserApi(data));
export const checkUserAuthThunk = createAsyncThunk('user/checkAuth', () => {
    if(getCookie('accessToken')) {
        return getUserApi();
    }
})

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
            .addCase(userLogoutThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(userLogoutThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(userLogoutThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthChecked = false;
                state.error = null;
                state.user = null;
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(userUpdateThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(userUpdateThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(userUpdateThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(checkUserAuthThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkUserAuthThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                if (action.payload) {
                    state.isAuthChecked = action.payload.success;
                    state.user = action.payload.user;
                }
                // при проверке авторизации добавляется в cookie no_auth_practicum_tracking_id
                // из-за него ответ от сервера fulfilled вместо rejected??? надо проверить
            })
    }
});

export default userSlice.reducer;
export const getUser = (state: RootState) => state.userSlice.user;
export const getUserName = (state: RootState) => state.userSlice.user?.name;
export const getIsAuthChecked = (state: RootState) => state.userSlice.isAuthChecked;