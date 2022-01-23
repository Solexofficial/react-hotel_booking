import { createAction, createSlice } from '@reduxjs/toolkit';
import likesService from '../services/likes.service';
import isOutDated from '../utils/isOutDated';

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    likesRequested: state => {
      state.isLoading = true;
    },
    likesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    likesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    likesCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    likesRemoved: (state, action) => {
      state.entities = state.entities.filter(like => like._id !== action.payload);
    },
  },
});

const { actions, reducer: likesReducer } = likesSlice;

const { likesRequested, likesReceived, likesRequestFailed, likesCreated, likesRemoved } = actions;

const likesCreateRequested = createAction('likes/likesCreateRequested');
const likesCreateRequestedFailed = createAction('likes/likesCreateRequestedFailed');

const likesRemoveRequested = createAction('likes/likesRemoveRequested');
const likesRemoveRequestedFailed = createAction('likes/likesRemoveRequestedFailed');

export const loadLikesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().likes;
  if (isOutDated(lastFetch)) {
    dispatch(likesRequested());
    try {
      const { content } = await likesService.getAll();
      dispatch(likesReceived(content));
    } catch (error) {
      dispatch(likesRequestFailed(error.message));
    }
  }
};

export const getLikes = () => state => state.likes.entities;
export const getLikesLoadingStatus = () => state => state.likes.isLoading;

export const getLikesByReviewId = reviewId => state => {
  if (state.likes.entities) {
    return state.likes.entities.filter(like => like.reviewId === reviewId);
  }
};

export const getLikesByUserId = userId => state => {
  if (state.likes.entities) {
    return state.likes.entities.filter(like => like.userId === userId);
  }
};

export const createLike = (userId, reviewId) => async dispatch => {
  dispatch(likesCreateRequested());
  try {
    const { content } = await likesService.create(userId, reviewId);
    dispatch(likesCreated(content));
  } catch (error) {
    dispatch(likesCreateRequestedFailed());
  }
};

export const removeLike = userId => async (dispatch, getState) => {
  dispatch(likesRemoveRequested());
  try {
    const { entities } = getState().likes;
    const userLike = entities.find(like => like.userId === userId);
    const likeId = await likesService.remove(userLike._id);
    console.log(likeId);
    dispatch(likesRemoved(likeId));
  } catch (error) {
    dispatch(likesRemoveRequestedFailed());
  }
};

export default likesReducer;
