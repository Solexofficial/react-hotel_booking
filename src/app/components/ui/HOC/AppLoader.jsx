import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRoomsList } from '../../../store/rooms';
import { getIsLoggedIn, loadUsersList } from '../../../store/users';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  // const usersStatusLoading = useSelector(getUsersLoadingStatus());
  // const roomsStatusLoading = useSelector(getRoomsLoadingStatus());

  useEffect(() => {
    dispatch(loadRoomsList());

    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  return children;
};

export default AppLoader;
