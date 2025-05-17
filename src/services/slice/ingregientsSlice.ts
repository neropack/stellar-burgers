import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

type TIngredientState = {
    ingredients: Array<TIngredient>;
    isLoading: boolean;
    error: null | string | undefined;
}

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => getIngredientsApi()
);

const initialState: TIngredientState = {
    ingredients: [],
    isLoading: true,
    error: null,
}

export const ingregientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    selectors: {
        getIngredients: (state) => state.ingredients,
        getIsLoading: (state) => state.isLoading
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ingredients = action.payload;
            })
    }
});