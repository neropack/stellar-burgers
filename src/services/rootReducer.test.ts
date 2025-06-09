import { describe, test, expect } from '@jest/globals';
import { ingredientsInitialState } from './slices/ingredientsSlice';
import { constructorInitialState } from './slices/constructorSlice';
import { feedsInitialState } from './slices/feedSlice';
import { userInitialState } from './slices/userSlice';
import { orderInitialState } from './slices/orderSlice';
import { rootReducer } from './store';

describe('Тест настройки корневого редьюсера', () => {
    const inititalState = {
        ingredientsSlice: {...ingredientsInitialState},
        constructorSlice: {...constructorInitialState},
        feedsSlice: {...feedsInitialState},
        userSlice: {...userInitialState},
        orderSlice: {...orderInitialState}
    };

    test('Тест инициализации состояния корневого редьюсера', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const newState = rootReducer(undefined, action);
        expect(newState).toEqual(inititalState);
    })
})