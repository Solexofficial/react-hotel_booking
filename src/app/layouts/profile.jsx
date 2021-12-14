import React from 'react';
import { useParams } from 'react-router';
import Container from '../components/common/container';
import Footer from '../components/common/footer/footer';
import Header from '../components/common/header/header';
import ProfileEditPage from '../components/pages/profileEditPage';
import ProfilePage from '../components/pages/profilePage';
import SideBar from '../components/common/sidebar';
import ProfileBooking from '../components/ui/profile/ProfileBooking';
import ProfileLikes from '../components/ui/profile/ProfileLikes';
import ProfileFavorites from '../components/ui/profile/ProfileFavorites';
import { useAuth } from '../hooks/useAuth';
import Breadcrumbs from '../components/common/breadcrumbs';

const Profile = () => {
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
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <div className='profile-page__wrapper'>
          <aside className='sidebar-profile'>
            <SideBar />
          </aside>
          {renderComponent(route)}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
