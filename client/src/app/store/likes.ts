import { createAction, createSlice } from '@reduxjs/toolkit';
import likesService from '../services/likes.service';
import { LikeType } from './../types/types';
import { AppThunk, RootState } from './createStore';

const initialState = {
  entities: [] as Array<LikeType>,
  isLoading: true as boolean,
  error: null as string | null,
};

const likesSlice = createSlice({
  name: 'likes',
  initialState: initialState,
  reducers: {
    likesRequested: state => {
      state.isLoading = true;
    },
    likesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    likesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    likeCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    likeRemoved: (state, action) => {
      state.entities = state.entities.filter(like => like._id !== action.payload);
    },
  },
});

const { actions, reducer: likesReducer } = likesSlice;

const { likesRequested, likesReceived, likesRequestFailed, likeCreated, likeRemoved } = actions;

const likeCreateRequested = createAction('likes/likeCreateRequested');
const likeCreateRequestedFailed = createAction('likes/likeCreateRequestedFailed');

const likeRemoveRequested = createAction('likes/likeRemoveRequested');
const likeRemoveRequestedFailed = createAction('likes/likeRemoveRequestedFailed');

export const loadLikesList = (): AppThunk => async (dispatch, getState) => {
  dispatch(likesRequested());
  try {
    const { content } = await likesService.getAll();
    dispatch(likesReceived(content));
  } catch (error: any) {
    dispatch(likesRequestFailed(error.message));
  }
};

export const getLikes = () => (state: RootState) => state.likes.entities;
export const getLikesLoadingStatus = () => (state: RootState) => state.likes.isLoading;

export const getLikesByReviewId = (reviewId: string) => (state: RootState) => {
  if (state.likes.entities) {
    return state.likes.entities.filter(like => like.reviewId === reviewId);
  }
  return [];
};

export const getLikesByUserId = (userId: string) => (state: RootState) => {
  if (state.likes.entities) {
    return state.likes.entities.filter(like => like.userId === userId);
  }
  return [];
};

export const createLike =
  (payload: { userId: string; reviewId: string }): AppThunk =>
  async dispatch => {
    dispatch(likeCreateRequested());
    try {
      const { content } = await likesService.create(payload);
      dispatch(likeCreated(content || []));
    } catch (error) {
      dispatch(likeCreateRequestedFailed());
    }
  };

export const removeLike =
  (payload: { userId: string; reviewId: string }): AppThunk =>
  async (dispatch, getState) => {
    dispatch(likeRemoveRequested());
    try {
      const { entities } = getState().likes;
      const userLikes = entities.filter((like: LikeType) => like.userId === payload.userId);
      const currentLike = userLikes.find((like: LikeType) => like.reviewId === payload.reviewId);
      if (currentLike) {
        const likeId = await likesService.remove(currentLike._id);
        dispatch(likeRemoved(likeId));
      }
    } catch (error) {
      dispatch(likeRemoveRequestedFailed());
    }
  };

export default likesReducer;
