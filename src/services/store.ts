import { combineReducers, combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsSlice from '../services/slices/ingredientsSlice';
import constructorSlice from '../services/slices/constructorSlice';
import feedsSlice from '../services/slices/feedSlice';
import userSlice from '../services/slices/userSlice';

const rootReducer = combineSlices({
  ingredientsSlice,
  constructorSlice,
  feedsSlice,
  userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useSelector = selectorHook.withTypes<RootState>();
export const useDispatch = dispatchHook.withTypes<AppDispatch>();

export default store;