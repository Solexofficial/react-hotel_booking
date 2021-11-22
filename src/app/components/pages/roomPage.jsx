import React from 'react';
import Header from '../common/header/header';
import Container from '../common/container';
import Footer from '../common/footer/footer';

const RoomPage = ({ roomId }) => {
  return (
    <>
      <Header />
      <Container>
        <h1>Room page id: {roomId}</h1>
      </Container>
      <Footer />
    </>
  );
};

export default RoomPage;
