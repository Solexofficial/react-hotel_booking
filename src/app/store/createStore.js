import roomsReducer from './rooms';
import usersReducer from './users';
import likesReducer from './likes';
import reviewsReducer from './reviews';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  users: usersReducer,
  likes: likesReducer,
  reviews: reviewsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
