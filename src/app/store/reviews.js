import { createAction, createSlice } from '@reduxjs/toolkit';
import reviewsService from '../services/reviews.service';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    entities: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    reviewsRequested: state => {
      state.isLoading = true;
    },
    reviewsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    reviewsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    reviewCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    reviewRemoved: (state, action) => {
      state.entities = state.entities.filter(review => review._id !== action.payload);
    },
  },
});

const { actions, reducer: reviewsReducer } = reviewsSlice;

const { reviewsRequested, reviewsReceived, reviewsRequestFailed, reviewCreated, reviewRemoved } = actions;

const reviewCreateRequested = createAction('reviews/reviewCreateRequested');
const reviewCreateRequestedFailed = createAction('reviews/reviewCreateRequestedFailed');

const reviewRemoveRequested = createAction('reviews/reviewRemoveRequested');
const reviewRemoveRequestedFailed = createAction('reviews/reviewRemoveRequestedFailed');

export const loadReviewsList = () => async dispatch => {
  dispatch(reviewsRequested());
  try {
    const { content } = await reviewsService.getAll();
    dispatch(reviewsReceived(content));
  } catch (error) {
    reviewsRequestFailed(error);
  }
};

export const removeReview = reviewId => async dispatch => {
  dispatch(reviewRemoveRequested());
  try {
    const id = await reviewsService.remove(reviewId);
    dispatch(reviewRemoved(id));
  } catch (error) {
    dispatch(reviewRemoveRequestedFailed());
  }
};

export const createReview = payload => async dispatch => {
  dispatch(reviewCreateRequested());
  try {
    const { content } = await reviewsService.create(payload);
    dispatch(reviewCreated(content));
  } catch (error) {
    dispatch(reviewCreateRequestedFailed());
  }
};

export const getReviewsByIds = reviewsIds => state => {
  if (state.reviews.entities) {
    return state.reviews.entities.filter(review => reviewsIds.includes(review._id));
  }
};

export const getReviewsByRoomId = roomId => state => {
  if (state.reviews.entities) {
    return state.reviews.entities.filter(review => review.roomId === roomId);
  }
};

export const getReviews = () => state => state.reviews.entities;
export const getReviewsLoadingStatus = () => state => state.reviews.isLoading;

export default reviewsReducer;
