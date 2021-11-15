import React from 'react';
import Container from '../../components/common/container';
import Footer from '../../components/common/footer/footer';
import Header from '../../components/common/header/header';
import RoomsFilter from '../../components/ui/rooms/roomsFilter';
import RoomsList from '../../components/ui/rooms/roomsList';

const Rooms = () => {
  return (
    <>
      <Header />
      <Container>
        <div className='rootWrapper' style={{ display: 'flex' }}>
          <RoomsFilter />
          <section className='mainContent' style={{ flex: '1' }}>
            <h2>Номера, которые мы для вас подобрали</h2>
            <RoomsList />
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
