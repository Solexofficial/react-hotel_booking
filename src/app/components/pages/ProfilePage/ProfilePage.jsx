import React from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../hooks';
import Sidebar from '../../common/Sidebar';
import ProfileBooking from '../../ui/profile/ProfileBooking';
import ProfileEdit from '../../ui/profile/ProfileEdit';
import ProfileFavorites from '../../ui/profile/ProfileFavorites';
import ProfileLikes from '../../ui/profile/ProfileLikes';
import UserProfile from '../../ui/profile/UserProfile';

const ProfilePage = () => {
  const { route } = useParams();
  const { currentUser } = useAuth();

  const renderComponent = route => {
    switch (route) {
      case 'edit':
        return <ProfileEdit />;
      case 'booking':
        return <ProfileBooking />;
      case 'likes':
        return <ProfileLikes currentUser={currentUser} />;
      case 'favorites':
        return <ProfileFavorites />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className='profile-dashboard'>
      <aside className='profile-sidebar'>
        <Sidebar />
      </aside>
      {renderComponent(route)}
    </div>
  );
};

export default ProfilePage;
