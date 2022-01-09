import roomsReducer from './rooms';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  rooms: roomsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
