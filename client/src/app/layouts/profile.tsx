import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import ProfilePage from '../components/pages/ProfilePage';
import { getCurrentUserId } from '../store/users';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        {userId ? <ProfilePage /> : <Redirect to={`profile/${currentUserId}`} />}
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
