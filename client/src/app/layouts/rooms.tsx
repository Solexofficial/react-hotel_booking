import React from 'react';
import { useParams } from 'react-router';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Container from '../components/common/Container';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import RoomPage from '../components/pages/RoomPage';
import RoomsPage from '../components/pages/RoomsPage';

const Rooms: React.FC = () => {
  const { roomId } = useParams<{ roomId?: string }>();

  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        {roomId ? <RoomPage roomId={roomId} /> : <RoomsPage />}
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
