import { createAction, createSlice } from '@reduxjs/toolkit';
import roomsService from '../services/rooms.service';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    roomsRequested: state => {
      state.isLoading = true;
    },
    roomsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    roomsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: roomsReducer } = roomsSlice;

const { roomsRequested, roomsReceived, roomsRequestFailed } = actions;

const addBookingRoomRequested = createAction('rooms/addBookingRoomRequested');
const addBookingRoomRequestedSuccess = createAction('rooms/addBookingRoomRequestedSuccess');
const addBookingRoomRequestedFailed = createAction('rooms/addBookingRoomRequestedFailed');

const removeBookingRoomRequested = createAction('rooms/removeBookingRoomRequested');
const removeBookingRoomRequestedSuccess = createAction('rooms/removeBookingRoomRequestedSuccess');
const removeBookingRoomRequestedFailed = createAction('rooms/removeBookingRoomRequestedFailed');

export const loadRoomsList = params => async dispatch => {
  dispatch(roomsRequested());
  try {
    const { content } = await roomsService.getAll(params);
    dispatch(roomsReceived(content || []));
  } catch (error) {
    dispatch(roomsRequestFailed(error.message));
  }
};

export const addBookingRoom = payload => async dispatch => {
  dispatch(addBookingRoomRequested());
  try {
    roomsService.setBooking(payload);
    dispatch(addBookingRoomRequestedSuccess());
  } catch (error) {
    dispatch(addBookingRoomRequestedFailed(error.message));
  }
};

export const removeBookingRoom = payload => async dispatch => {
  dispatch(removeBookingRoomRequested());
  try {
    roomsService.deleteBooking(payload);
    dispatch(removeBookingRoomRequestedSuccess());
  } catch (error) {
    dispatch(removeBookingRoomRequestedFailed(error.message));
  }
};

export const getRooms = () => state => state.rooms.entities;
export const getRoomsLoadingStatus = () => state => state.rooms.isLoading;
export const getRoomById = roomId => state => {
  if (state.rooms.entities) {
    return state.rooms.entities.find(room => room._id === roomId);
  }
};

export const getRoomsByIds = roomsIds => state => {
  if (state.rooms.entities) {
    return state.rooms.entities.filter(room => roomsIds.includes(room._id));
  }
};

export default roomsReducer;
