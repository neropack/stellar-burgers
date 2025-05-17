import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

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
    async () => {
        const response = await getIngredientsApi();
        return response;
    }
);

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    selectors: {
        getIngredientsStateSelector: (state) => state,
        getIngredientsSelector: (state) => state.ingredients
    },
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
                state.ingredients = action.payload;
            })
        }
    });

export const {getIngredientsStateSelector, getIngredientsSelector} = ingredientsSlice.selectors;
// export default ingredientsSlice.reducer;