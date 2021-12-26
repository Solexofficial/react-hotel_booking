import React from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import SideBar from '../../common/sidebar';
import ProfileEditPage from '../../pages/profileEditPage';
import ProfilePage from '../../pages/profilePage';
import ProfileBooking from './ProfileBooking';
import ProfileFavorites from './ProfileFavorites';
import ProfileLikes from './ProfileLikes';

const ProfileDashboard = () => {
  const { route } = useParams();
  const { currentUser } = useAuth();

  const renderComponent = route => {
    switch (route) {
      case 'edit':
        return <ProfileEditPage />;
      case 'booking':
        return <ProfileBooking />;
      case 'likes':
        return <ProfileLikes currentUser={currentUser} />;
      case 'favorites':
        return <ProfileFavorites />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className='profile-dashboard'>
      <aside className='profile-sidebar'>
        <SideBar />
      </aside>
      {renderComponent(route)}
    </div>
  );
};

export default ProfileDashboard;
