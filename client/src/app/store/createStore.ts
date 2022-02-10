import roomsReducer from './rooms';
import usersReducer from './users';
import likesReducer from './likes';
import reviewsReducer from './reviews';
import bookingsReducer from './bookings';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  users: usersReducer,
  likes: likesReducer,
  reviews: reviewsReducer,
  bookings: bookingsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<Promise<any>, RootState, unknown, Action>;
