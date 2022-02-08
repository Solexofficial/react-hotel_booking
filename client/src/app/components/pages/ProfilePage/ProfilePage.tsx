import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { getCurrentUserData } from '../../../store/users';
import Sidebar from '../../common/Sidebar';
import AdminDashboard from '../../ui/profile/AdminDashboard';
import ProfileBooking from '../../ui/profile/ProfileBooking';
import ProfileEdit from '../../ui/profile/ProfileEdit';
import ProfileFavorites from '../../ui/profile/ProfileFavorites';
import ProfileLikes from '../../ui/profile/ProfileLikes';
import UserProfile from '../../ui/profile/UserProfile';

const ProfilePage: React.FC = () => {
  const { userId, route } = useParams<{ userId: string; route: string }>();
  const currentUser = useSelector(getCurrentUserData());

  const renderComponent = (route: string) => {
    switch (route) {
      case 'edit':
        if (currentUser._id === userId) {
          return <ProfileEdit />;
        } else {
          return <Redirect to={`/profile/${currentUser._id}`} />;
        }
      case 'booking':
        return <ProfileBooking />;
      case 'likes':
        return <ProfileLikes />;
      case 'favorites':
        return <ProfileFavorites />;
      case 'dashboard':
        if (currentUser.role === 'admin') {
          return <AdminDashboard />;
        } else {
          return <Redirect to={`/profile/${currentUser._id}`} />;
        }
      default:
        return <UserProfile userId={userId} />;
    }
  };

  return (
    <div className='profile-page'>
      {currentUser._id === userId && (
        <aside className='profile-sidebar'>
          <Sidebar />
        </aside>
      )}
      {renderComponent(route)}
    </div>
  );
};

export default ProfilePage;
