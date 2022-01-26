import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/Header/Header';
import ProfilePage from '../components/pages/ProfilePage';

const Profile = () => {
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
