import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer, { getIngredientsThunk } from './ingredientsSlice';
import { describe, test, expect } from '@jest/globals';

const localStore = () => configureStore({
    reducer: {
        ingredients: ingredientsReducer
    }
});

describe('Тест редьюсера ингридиентов', () => {
    test('Ожидание ответа сервера', () => {
        const store = localStore();
        store.dispatch({ type: getIngredientsThunk.pending.type });
        
        const storeState = store.getState();
        expect(storeState.ingredients.isLoading).toBeTruthy();
        expect(storeState.ingredients.error).toBeNull();
    });

    test('Ошибка ответа сервера', () => {
        const store = localStore();
        const error = 'get keked';
        store.dispatch({ type: getIngredientsThunk.rejected.type, error: {message: error} });
        
        const storeState = store.getState();
        expect(storeState.ingredients.isLoading).toBeFalsy();
        expect(storeState.ingredients.error).toBe(error);
    });

    test('Успешный ответ сервера', () => {
        const mockPayload = {
            _id: "643d69a5c3f7b9001cfa094b",
            name: "Что тут делает булка?",
            type: "main",
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            id: 14
        }
        const store = localStore();
        
        store.dispatch({ type: getIngredientsThunk.fulfilled.type, payload: mockPayload});
        
        const storeState = store.getState();
        expect(storeState.ingredients.isLoading).toBeFalsy();
        expect(storeState.ingredients.error).toBeNull();
        expect(storeState.ingredients.ingredients).toEqual(mockPayload);
    })
})