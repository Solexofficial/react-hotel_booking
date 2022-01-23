import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikesLoadingStatus, loadLikesList } from '../../../store/likes';
import { getRoomsLoadingStatus, loadRoomsList } from '../../../store/rooms';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());
  const roomsStatusLoading = useSelector(getRoomsLoadingStatus());
  const likesStatusLoading = useSelector(getLikesLoadingStatus());

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadRoomsList());
    dispatch(loadLikesList());

    if (isLoggedIn) {
    }
  }, [isLoggedIn]);

  if (usersStatusLoading || roomsStatusLoading || likesStatusLoading) return 'Loading';

  return children;
};

export default AppLoader;
