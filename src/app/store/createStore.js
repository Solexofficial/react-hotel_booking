import roomsReducer from './rooms';
import usersReducer from './users';
import likesReducer from './likes';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  users: usersReducer,
  likes: likesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
