import { createAction, createSlice } from '@reduxjs/toolkit';
import bookingService from '../services/booking.service';
import isOutDated from '../utils/isOutDated';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    entities: null,
    isLoading: true,
    createBookingLoading: false,
    error: null,
    lastFetch: null,
  },
  reducers: {
    bookingsRequested: state => {
      state.isLoading = true;
    },
    bookingsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    bookingsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    bookingCreateRequested: state => {
      state.createBookingLoading = true;
    },
    bookingCreateRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.createBookingLoading = false;
    },
    bookingCreated: (state, action) => {
      state.entities.push(action.payload);
      state.createBookingLoading = false;
    },
    bookingRemoved: (state, action) => {
      state.entities = state.entities.filter(booking => booking._id !== action.payload);
    },
  },
});

const { actions, reducer: bookingsReducer } = bookingsSlice;

const {
  bookingsRequested,
  bookingsReceived,
  bookingsRequestFailed,
  bookingCreated,
  bookingRemoved,
  bookingCreateRequested,
  bookingCreateRequestedFailed,
} = actions;

const removeBookingRequested = createAction('bookings/removeBookingRequested');
const removeBookingRequestedFailed = createAction('bookings/removeBookingRequestedFailed');

export const loadBookingsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().bookings;
  if (isOutDated(lastFetch)) {
    dispatch(bookingsRequested());
    try {
      const { content } = await bookingService.getAll();
      dispatch(bookingsReceived(content));
    } catch (error) {
      dispatch(bookingsRequestFailed(error.message));
    }
  }
};

export const createBooking = payload => async dispatch => {
  dispatch(bookingCreateRequested());
  try {
    const { content } = await bookingService.create(payload);
    dispatch(bookingCreated(content));
  } catch (error) {
    dispatch(bookingCreateRequestedFailed(error.message));
  }
};

export const removeBooking = bookingId => async dispatch => {
  dispatch(removeBookingRequested());
  try {
    const id = await bookingService.remove(bookingId);
    dispatch(bookingRemoved(id));
  } catch (error) {
    dispatch(removeBookingRequestedFailed());
  }
};

export const getBookings = () => state => state.bookings.entities;
export const getBookingsLoadingStatus = () => state => state.bookings.isLoading;
export const getBookingCreatedStatus = () => state => state.bookings.createBookingLoading;
export const getBookingsByUserId = userId => state => {
  if (state.bookings.entities) {
    return state.bookings.entities.filter(booking => booking.userId === userId);
  }
};
export const getBookingsByRoomId = roomId => state => {
  if (state.bookings.entities) {
    return state.bookings.entities.filter(booking => booking.roomId === roomId);
  }
};

export default bookingsReducer;
