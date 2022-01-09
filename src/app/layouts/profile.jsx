import React from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import ProfilePage from '../components/pages/ProfilePage';
// import { useAuth } from '../hooks';

const Profile = () => {
  const params = useParams();
  // const { userId } = params;
  // const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <ProfilePage />
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
