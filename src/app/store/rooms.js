import { createAction, createSlice } from '@reduxjs/toolkit';
import isOutDated from '../utils/isOutDated';
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

const addBookingRequested = createAction('rooms/addBookingRequested');
const addBookingRequestedSuccess = createAction('rooms/addBookingRequestedSuccess');
const addBookingRequestedFailed = createAction('rooms/addBookingRequestedFailed');

export const loadRoomsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().rooms;
  if (isOutDated(lastFetch)) {
    dispatch(roomsRequested());
    try {
      const { content } = await roomsService.getAll();
      dispatch(roomsReceived(content));
    } catch (error) {
      dispatch(roomsRequestFailed(error.message));
    }
  }
};

export const addBooking = (roomId, payload) => async dispatch => {
  dispatch(addBookingRequested());
  try {
    roomsService.setBooking(roomId, payload);
    dispatch(addBookingRequestedSuccess());
  } catch (error) {
    dispatch(addBookingRequestedFailed(error.message));
  }
};

export const getRooms = () => state => state.rooms.entities;
export const getRoomsLoadingStatus = () => state => state.rooms.isLoading;
export const getRoomById = roomId => state => {
  if (state.rooms.entities) {
    return state.rooms.entities.find(room => room._id === roomId);
  }
};

export default roomsReducer;
