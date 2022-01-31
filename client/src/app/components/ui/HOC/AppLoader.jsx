import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingsLoadingStatus, loadBookingsList } from '../../../store/bookings';
import { getLikesLoadingStatus, loadLikesList } from '../../../store/likes';
import { getReviewsLoadingStatus, loadReviewsList } from '../../../store/reviews';
import { getRoomsLoadingStatus, loadRoomsList } from '../../../store/rooms';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  const roomsStatusLoading = useSelector(getRoomsLoadingStatus());
  const likesStatusLoading = useSelector(getLikesLoadingStatus());
  const reviewsStatusLoading = useSelector(getReviewsLoadingStatus());
  const bookingsStatusLoading = useSelector(getBookingsLoadingStatus());

  useEffect(() => {
    dispatch(loadRoomsList());
    dispatch(loadLikesList());
    dispatch(loadReviewsList());
    dispatch(loadBookingsList());

    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (usersStatusLoading || roomsStatusLoading || likesStatusLoading || reviewsStatusLoading || bookingsStatusLoading)
    return (
      <></>
      // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      //   <h2>Добро пожаловать в отель Toxin</h2>
      // </div>
    );

  return children;
};

export default AppLoader;
