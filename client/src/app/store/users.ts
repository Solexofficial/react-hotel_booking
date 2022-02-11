import { UserType, SignInDataType } from './../types/types';
import { RootState, AppThunk } from './createStore';
import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService, { setTokens } from '../services/localStorage.service';
import userService from '../services/user.service';
import generateAuthError from '../utils/AuthErrors';
import history from '../utils/history';

type UserInitialState = {
  entities: Array<UserType>;
  isLoading: boolean;
  error: string | null;
  auth: {
    userId: string | null;
  };
  isLoggedIn: boolean;
  dataLoaded: boolean;
};

const initialState: UserInitialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: [],
      isLoading: false,
      error: null,
      auth: { userId: null },
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: state => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userUpdated: (state, action) => {
      const userIndex = state.entities.findIndex(user => user._id === action.payload._id);
      state.entities[userIndex] = action.payload;
    },
    userLoggedOut: state => {
      state.isLoggedIn = false;
      state.auth.userId = null;
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;

const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userUpdated,
  userLoggedOut,
} = actions;

const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateRequestedFailed = createAction('users/userUpdateRequestedFailed');

export const updateUserData =
  (payload: UserType): AppThunk =>
  async dispatch => {
    dispatch(userUpdateRequested());
    try {
      const { content } = await userService.updateUserData(payload);
      dispatch(userUpdated(content));
      history.goBack();
    } catch (error) {
      dispatch(userUpdateRequestedFailed());
    }
  };

export const signIn =
  ({ payload, redirect }: { payload: SignInDataType; redirect?: string }): AppThunk =>
  async dispatch => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.signIn({ email, password });
      setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push(redirect || '/');
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp =
  (payload: UserType): AppThunk =>
  async dispatch => {
    dispatch(authRequested());
    try {
      const data = await authService.signUp(payload);
      setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push('/');
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const logOut = (): AppThunk => async dispatch => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const loadUsersList = (): AppThunk => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.getAll();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsersList = () => (state: RootState) => state.users.entities;
export const getCurrentUserData = () => (state: RootState) => {
  if (state.users.auth) {
    return state.users.entities
      ? state.users.entities.find((user: UserType) => user._id === state.users.auth.userId)
      : null;
  }
};

export const getUsersLoadingStatus = () => (state: RootState) => state.users.isLoading;
export const getUserById = (userId: string) => (state: RootState) => {
  if (state.users.entities) {
    return state.users.entities.find((user: UserType) => user._id === userId);
  }
};
export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;
export const getDataStatus = () => (state: RootState) => state.users.dataLoaded;
export const getCurrentUserId = () => (state: RootState) => {
  return state.users.auth.userId;
};
export const getAuthErrors = () => (state: RootState) => state.users.error;

export default usersReducer;
