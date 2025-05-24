import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";
import { RootState } from "../store";

type TIngredientState = {
    ingredients: TIngredient[];
    isLoading: boolean;
    error: null | string | undefined;
};

const initialState: TIngredientState = {
    ingredients: [],
    isLoading: false,
    error: null,
};

export const getIngredientsThunk = createAsyncThunk(
    'ingredients/getIngredients',
    () => getIngredientsApi(),
);

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(getIngredientsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getIngredientsThunk.rejected, (state, error) => {
                state.isLoading = false;
                state.error = error.error.message;
            })
            .addCase(getIngredientsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.ingredients = action.payload;
            })
        }
    });

export default ingredientsSlice.reducer;

export const getIsLoading = (state: RootState) => state.ingredientsSlice.isLoading;
export const getIngredients = (state: RootState) => state.ingredientsSlice.ingredients;
export const getIngredientById = (id: string) => (state: RootState) => state.ingredientsSlice.ingredients.find((ingredient) => ingredient._id === id);