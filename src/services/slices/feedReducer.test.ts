import { configureStore } from "@reduxjs/toolkit";
import feedReducer, { getFeed, getFeedsThunk } from './feedSlice';

const localStore = () => configureStore({
    reducer: {
        feed: feedReducer
    }
});

describe('Тест редьюсера ленты', () => {
    test('Ожидание ответа сервера', () => {
        const store = localStore();
        store.dispatch({ type: getFeedsThunk.pending.type });

        const storeState = store.getState();
        expect(storeState.feed.isLoading).toBeTruthy();
        expect(storeState.feed.error).toBeNull();
    });

    test('Ошибка ответа сервера', () => {
        const store = localStore();
        const error = 'get keked';
        store.dispatch({ type: getFeedsThunk.rejected.type, error: { message: error } });

        const storeState = store.getState();
        expect(storeState.feed.isLoading).toBeFalsy();
        expect(storeState.feed.error).toBe(error);
    });

    test('Успешный ответ сервера', () => {
        const store = localStore();
        const mockPayload = {
            success: true,
            orders: [
                {
                    _id: "68488b85c2f30c001cb2b7bc",
                    ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c"],
                    status: 'done',
                    name: "Краторный био-марсианский люминесцентный бургер",
                    createdAt: "2025-06-10T19:46:13.061Z",
                    updatedAt: "2025-06-10T19:46:13.834Z",
                    number: 80911
                }
            ],
            total: 80537,
            totalToday: 1
        };


        store.dispatch({ type: getFeedsThunk.fulfilled.type, payload: mockPayload });
        const storeState = store.getState();

        expect(storeState.feed.isLoading).toBeFalsy();
        expect(storeState.feed.error).toBeNull();
        expect(storeState.feed.orders).toEqual(mockPayload.orders);
        expect(storeState.feed.total).toEqual(mockPayload.total);
        expect(storeState.feed.totalToday).toEqual(mockPayload.totalToday);
    })
})