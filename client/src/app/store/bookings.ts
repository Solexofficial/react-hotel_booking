import { createAction, createSlice } from '@reduxjs/toolkit';
import bookingService from '../services/booking.service';
import isOutDated from '../utils/isOutDated';
import { BookingType } from './../types/types';
import { AppThunk, RootState } from './createStore';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    entities: [] as Array<BookingType>,
    isLoading: true as boolean,
    createBookingLoading: false as boolean,
    error: null as string | null,
    lastFetch: null as number | null,
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
      state.error = null;
      state.createBookingLoading = true;
    },
    bookingCreateRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.createBookingLoading = false;
    },
    bookingCreated: (state, action) => {
      state.entities.push(action.payload);
      state.error = null;
      state.createBookingLoading = false;
    },
    bookingRemoved: (state, action) => {
      state.entities = state.entities.filter(booking => booking._id !== action.payload);
      state.error = null;
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

export const loadBookingsList = (): AppThunk => async (dispatch, getState) => {
  const { lastFetch } = getState().bookings;
  if (isOutDated(Number(lastFetch))) {
    dispatch(bookingsRequested());
    try {
      const { content } = await bookingService.getAll();
      dispatch(bookingsReceived(content || []));
    } catch (error: any) {
      dispatch(bookingsRequestFailed(error.message));
    }
  }
};

export const createBooking =
  (payload: BookingType): AppThunk =>
  async dispatch => {
    dispatch(bookingCreateRequested());
    try {
      const { content } = await bookingService.create(payload);
      dispatch(bookingCreated(content));
      return content;
    } catch (error) {
      if (error.response.status === 500) {
        dispatch(bookingCreateRequestedFailed(error.response.data.message));
        return;
      }
      const { message } = error.response.data.error;
      dispatch(bookingCreateRequestedFailed(message));
    }
  };

export const removeBooking =
  (bookingId?: string): AppThunk =>
  async dispatch => {
    dispatch(removeBookingRequested());
    try {
      const id = await bookingService.remove(bookingId || '');
      dispatch(bookingRemoved(id));
    } catch (error) {
      dispatch(removeBookingRequestedFailed());
    }
  };

export const getBookings = () => (state: RootState) => state.bookings.entities;
export const getBookingsLoadingStatus = () => (state: RootState) => state.bookings.isLoading;
export const getBookingCreatedStatus = () => (state: RootState) => state.bookings.createBookingLoading;
export const getBookingsByUserId = (userId: string) => (state: RootState) => {
  if (state.bookings.entities) {
    return state.bookings.entities.filter(booking => booking.userId === userId);
  }
  return [];
};
export const getBookingsByRoomId = (roomId: string) => (state: RootState) => {
  if (state.bookings.entities) {
    return state.bookings.entities.filter(booking => booking.roomId === roomId);
  }
  return [];
};

export const getBookingsErrors = () => (state: RootState) => state.bookings.error;

export default bookingsReducer;
