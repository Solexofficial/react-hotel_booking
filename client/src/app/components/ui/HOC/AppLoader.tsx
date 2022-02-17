import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBookingsList } from '../../../store/bookings';
import { loadLikesList } from '../../../store/likes';
import { loadReviewsList } from '../../../store/reviews';
import { loadRoomsList } from '../../../store/rooms';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users';

const AppLoader = ({ children }: any) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadRoomsList());
    dispatch(loadLikesList());
    dispatch(loadReviewsList());
    dispatch(loadBookingsList());
  }, [isLoggedIn]);

  if (!usersStatusLoading) {
    return children;
  } else {
    return <></>;
  }
};

export default AppLoader;
