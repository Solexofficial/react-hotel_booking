import React from 'react';
import Breadcrumbs from '../components/common/breadcrumbs';
import Container from '../components/common/container';
import Footer from '../components/common/Footer/Footer';
import Header from '../components/common/header/header';
import ProfileDashboard from '../components/ui/profile/ProfileDashboard';

const Profile = () => {
  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <ProfileDashboard />
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
