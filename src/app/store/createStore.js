import roomsReducer from './rooms';
import filtersReducer from './filters';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  filters: filtersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
