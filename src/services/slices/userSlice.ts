import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types"
import { RootState } from "../store";

type TUserState = {
    user: TUser | null;
    isLoading: boolean;
    error: null | string | undefined;
    isAuthChekced: boolean;
}

const initialState: TUserState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthChekced: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
});

export default userSlice.reducer;
export const getUser = (state: RootState) => state.userSlice.user;
export const getIsAuthChecked = (state: RootState) => state.userSlice.isAuthChekced;