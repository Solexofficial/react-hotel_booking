import { createSlice } from '@reduxjs/toolkit';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  rentPerDay: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

const { actions, reducer: filtersReducer } = filtersSlice;

const { statusFilterChanged } = actions;

export const getFilters = () => state => state.filters;

export default filtersReducer;
