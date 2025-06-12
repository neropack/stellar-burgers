import { configureStore } from "@reduxjs/toolkit";
import orderReducer, { getOrderByNumberThunk, getOrdersThunk, orderBurgerThunk } from './orderSlice';

const localStore = () => configureStore({
    reducer: {
        order: orderReducer
    }
});

const error = 'get keked';

describe('Тесты редьюсера заказов', () => {
    describe('Тесты получения заказа по номеру', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: getOrderByNumberThunk.pending.type});

            const storeState = store.getState();
            expect(storeState.order.isLoading).toBeTruthy();
            expect(storeState.order.error).toBeNull();
        });

        test('Ошибка ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: getOrderByNumberThunk.rejected.type, error: {message: error} });
                    
            const storeState = store.getState();
            expect(storeState.order.isLoading).toBeFalsy();
            expect(storeState.order.error).toBe(error);
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
                ]
            };
            
            store.dispatch({ type: getOrderByNumberThunk.fulfilled.type, payload: mockPayload});
            const storeState = store.getState();

            expect(storeState.order.isLoading).toBeFalsy();
            expect(storeState.order.error).toBeNull();
            expect(storeState.order.currentOrder).toEqual(mockPayload.orders[0]);
        });
    });

    describe('Тесты получения заказов пользователя', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: getOrdersThunk.pending.type});

            const storeState = store.getState();
            expect(storeState.order.isLoading).toBeTruthy();
            expect(storeState.order.error).toBeNull();
        });

        test('Ошибка ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: getOrdersThunk.rejected.type, error: {message: error} });
                    
            const storeState = store.getState();
            expect(storeState.order.isLoading).toBeFalsy();
            expect(storeState.order.error).toBe(error);
        });

        test('Успешный ответ сервера', () => {
            const store = localStore();
            const mockPayload = [
                {
                    _id: "68488b85c2f30c001cb2b7bc",
                    ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c"],
                    status: 'done',
                    name: "Краторный био-марсианский люминесцентный бургер",
                    createdAt: "2025-06-10T19:46:13.061Z",
                    updatedAt: "2025-06-10T19:46:13.834Z",
                    number: 80911
                }
            ];

            store.dispatch({ type: getOrdersThunk.fulfilled.type, payload: mockPayload});
            const storeState = store.getState();

            expect(storeState.order.isLoading).toBeFalsy();
            expect(storeState.order.error).toBeNull();
            expect(storeState.order.orders).toEqual(mockPayload);
        })
    });

    describe('Тест заказа бургера', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: orderBurgerThunk.pending.type});

            const storeState = store.getState();
            expect(storeState.order.isLoading).toBeTruthy();
            expect(storeState.order.error).toBeNull();
        });

        test('Ошибка ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: orderBurgerThunk.rejected.type, error: {message: error} });
                    
            const storeState = store.getState();
            expect(storeState.order.isLoading).toBeFalsy();
            expect(storeState.order.error).toBe(error);
        });

        test('Успешный ответ сервера', () => {
            const store = localStore();
            const mockPayload = {
                success: true,
                name: "Краторный био-марсианский люминесцентный бургер",
                order: [
                    {
                        _id: "68488b85c2f30c001cb2b7bc",
                        ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093c"],
                        status: 'done',
                        name: "Краторный био-марсианский люминесцентный бургер",
                        createdAt: "2025-06-10T19:46:13.061Z",
                        updatedAt: "2025-06-10T19:46:13.834Z",
                        number: 80911,
                        price: 3922
                    }
                ]
            };

            store.dispatch({ type: orderBurgerThunk.fulfilled.type, payload: mockPayload});
            const storeState = store.getState();

            expect(storeState.order.isLoading).toBeFalsy();
            expect(storeState.order.error).toBeNull();
            expect(storeState.order.currentOrder).toEqual(mockPayload.order);
        });
    })

})