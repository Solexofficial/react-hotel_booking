import React from 'react';
import Header from '../common/header/header';
import Container from '../common/container';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs';

const RoomPage = ({ roomId }) => {
  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <h1>Room page id: {roomId}</h1>
      </Container>
      <Footer />
    </>
  );
};

export default RoomPage;
