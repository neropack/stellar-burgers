import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from "@utils-types"
import { RootState } from "../store";
import { v4 as uuidv4 } from 'uuid';

 interface constructorState {
    bun: TConstructorIngredient | null;
    constructorItems: TConstructorIngredient[];
 }

 const initialState: constructorState = {
    bun: null,
    constructorItems: [],
 }

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addItem: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
                if (action.payload.type === 'bun') {
                    state.bun = action.payload;
                } else {
                    state.constructorItems.push(action.payload);
                }
            },
            prepare: (item: TIngredient) => ({
                    payload: {
                        ...item,
                        id: uuidv4(),
                    }
                })
        },
        removeItem: (state, action) => {
            state.constructorItems = state.constructorItems.filter((item) => item.id != action.payload)
        },
        moveItemDown: (state, {payload}) => {
            const index = state.constructorItems.findIndex(ingredient => ingredient._id === payload._id);
            [state.constructorItems[index], state.constructorItems[index + 1]] = [state.constructorItems[index + 1], state.constructorItems[index]];
        },
        moveItemUp: (state, {payload}) => {
            const index = state.constructorItems.findIndex(ingredient => ingredient._id === payload._id);
            [state.constructorItems[index], state.constructorItems[index - 1]] = [state.constructorItems[index - 1], state.constructorItems[index]];
        },
        clearConstructor: (state) => {
            state.bun = null;
            state.constructorItems = [];
        }
    },
});

export const { addItem, removeItem, moveItemUp, moveItemDown, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;

export const getBun = (state: RootState) => state.constructorSlice.bun;
export const getItems = (state: RootState) => state.constructorSlice.constructorItems;
