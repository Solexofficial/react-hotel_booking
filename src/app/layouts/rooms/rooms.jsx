import React from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '../../components/common/breadcrumbs';
import Container from '../../components/common/container';
import Footer from '../../components/common/footer/footer';
import Header from '../../components/common/header/header';
import RoomPage from '../../components/pages/roomPage';
import RoomsListPage from '../../components/pages/roomsListPage';

const Rooms = () => {
  const { roomId } = useParams();

  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        {roomId ? <RoomPage roomId={roomId} /> : <RoomsListPage />}
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
