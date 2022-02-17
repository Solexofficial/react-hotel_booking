import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { getCurrentUserData } from '../../../../store/users';
import AdminDashboard from '../AdminDashboard';
import ProfileBooking from '../ProfileBooking';
import ProfileEdit from '../ProfileEdit';
import ProfileFavorites from '../ProfileFavorites';
import ProfileLikes from '../ProfileLikes';
import UserProfile from '../UserProfile';

type ProfileContentProxyProps = {
  userId: string;
  route: string;
};

const ProfileContentProxy: React.FC<ProfileContentProxyProps> = ({ userId, route }) => {
  const currentUser = useSelector(getCurrentUserData());
  const contentByType: { [x: string]: JSX.Element } = {
    booking: <ProfileBooking />,
    likes: <ProfileLikes />,
    favorites: <ProfileFavorites />,
    edit: currentUser?._id === userId ? <ProfileEdit /> : <Redirect to={`/profile/${currentUser?._id}`} />,
    dashboard: currentUser?.role === 'admin' ? <AdminDashboard /> : <Redirect to={`/profile/${currentUser?._id}`} />,
  };

  const CurrentProfileContent = () => contentByType[route] || <UserProfile userId={userId} />;

  return (
    <>
      <CurrentProfileContent />
    </>
  );
};

export default ProfileContentProxy;
