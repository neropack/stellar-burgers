/**
 * @jest-environment jsdom
 */

import { configureStore } from "@reduxjs/toolkit";
import userReducer, { checkUserAuthThunk, userLoginThunk, userLogoutThunk, userRegisterThunk, userUpdateThunk } from './userSlice';
import { getCookie } from "../../utils/cookie";

const localStore = () => configureStore({
    reducer: {
        user: userReducer
    }
});

const error = 'get keked';
const accessTokenMock = 'kekusAccessToken';
const refreshTokenMock = 'kekusRefreshToken';

describe('Тест редьюсера пользователя', () => {
    describe('Тест регистрации пользователя', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: userRegisterThunk.pending.type });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeTruthy();
            expect(storeState.user.error).toBeNull();
        });

        test('Ошибка ответа сервера', () => {
            const store = localStore();

            store.dispatch({ type: userRegisterThunk.rejected.type, error: { message: error } });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.error).toBe(error);
        });

        test('Успешный ответ сервера', () => {
            const store = localStore();
            const mockPayload = {
                success: true,
                user: {
                    email: "kek@kekmail.kek",
                    name: "Kek Kekovich"
                },
                accessToken: accessTokenMock,
                refreshToken: refreshTokenMock
            }

            store.dispatch({ type: userRegisterThunk.fulfilled.type, payload: mockPayload });
            const storeState = store.getState();

            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.isAuthChecked).toBeTruthy();
            expect(storeState.user.user).toEqual(mockPayload.user);
            expect(storeState.user.error).toBeNull();
            expect(localStorage.getItem('refreshToken')).toEqual(refreshTokenMock);
            expect(getCookie('accessToken')).toEqual(accessTokenMock);
        });
    });

    describe('Тест логина пользователя', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: userLoginThunk.pending.type });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeTruthy();
            expect(storeState.user.error).toBeNull();
        });


        test('Ошибка ответа сервера', () => {
            const store = localStore();

            store.dispatch({ type: userLoginThunk.rejected.type, error: { message: error } });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.error).toBe(error);
        });

        test('Успешный ответ сервера', () => {
            const store = localStore();
            const mockPayload = {
                success: true,
                user: {
                    email: "kek@kekmail.kek",
                    name: "Kek Kekovich"
                },
                accessToken: accessTokenMock,
                refreshToken: refreshTokenMock
            }

            store.dispatch({ type: userLoginThunk.fulfilled.type, payload: mockPayload });
            const storeState = store.getState();

            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.isAuthChecked).toBeTruthy();
            expect(storeState.user.user).toEqual(mockPayload.user);
            expect(storeState.user.error).toBeNull();
            expect(localStorage.getItem('refreshToken')).toEqual(refreshTokenMock);
            expect(getCookie('accessToken')).toEqual(accessTokenMock);
        });
    });

    describe('Тест выхода пользователя', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();
            store.dispatch({ type: userLogoutThunk.pending.type });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeTruthy();
            expect(storeState.user.error).toBeNull();
        });

        test('Ошибка ответа сервера', () => {
            const store = localStore();

            store.dispatch({ type: userLogoutThunk.rejected.type, error: { message: error } });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.error).toBe(error);
        });

        test('Успешный ответ сервера', () => {
            const store = localStore();
            const mockPayload = {
                success: true,
                message: "Successful logout"
            }

            store.dispatch({ type: userLogoutThunk.fulfilled.type, payload: mockPayload });
            const storeState = store.getState();


            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.isAuthChecked).toBeFalsy();
            expect(storeState.user.user).toBeNull();
            expect(storeState.user.error).toBeNull();
            expect(localStorage.getItem('refreshToken')).toBeNull();
            expect(getCookie('accessToken')).toBeUndefined();
        });
    });

    describe('Тест изменения данных пользователя', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();

            store.dispatch({ type: userUpdateThunk.pending.type });
            const storeState = store.getState();

            expect(storeState.user.isLoading).toBeTruthy();
            expect(storeState.user.error).toBeNull();
        });

        test('Ошибка ответа сервера', () => {
            const store = localStore();

            store.dispatch({ type: userUpdateThunk.rejected.type, error: { message: error } });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.error).toBe(error);
        });

        test('Успешный ответ сервера', () => {
            const store = localStore();
            const mockPayload = {
                success: true,
                user: {
                    email: "kek@kekmail.kek",
                    name: "Kek Kekovich"
                },
            }

            store.dispatch({ type: userUpdateThunk.fulfilled.type, payload: mockPayload });
            const storeState = store.getState();


            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.isAuthChecked).toBeTruthy();
            expect(storeState.user.user).toEqual(mockPayload.user);
            expect(storeState.user.error).toBeNull();
        });
    });

    describe('Тест проверки авторизации пользователя', () => {
        test('Ожидание ответа сервера', () => {
            const store = localStore();

            store.dispatch({ type: checkUserAuthThunk.pending.type });
            const storeState = store.getState();

            expect(storeState.user.isLoading).toBeTruthy();
            expect(storeState.user.error).toBeNull();
        });

        test('Ошибка ответа сервера', () => {
            const store = localStore();

            store.dispatch({ type: checkUserAuthThunk.rejected.type, error: { message: error } });

            const storeState = store.getState();
            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.error).toBe(error);
        });

        test('Успешный ответ сервера', () => {
            const store = localStore();
            const mockPayload = {
                success: true,
                user: {
                    email: "kek@kekmail.kek",
                    name: "Kek Kekovich"
                },
            }

            store.dispatch({ type: checkUserAuthThunk.fulfilled.type, payload: mockPayload });
            const storeState = store.getState();


            expect(storeState.user.isLoading).toBeFalsy();
            expect(storeState.user.isAuthChecked).toBeTruthy();
            expect(storeState.user.user).toEqual(mockPayload.user);
            expect(storeState.user.error).toBeNull();
        });
    })

});