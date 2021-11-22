import React from 'react';
import Header from '../common/header/header';
import Container from '../common/container';
import RoomsFilter from '../ui/rooms/roomsFilter/roomsFilter';
import RoomsList from '../ui/rooms/roomsList';
import Footer from '../common/footer/footer';

const RoomsListPage = ({ roomsList }) => {
  return (
    <>
      <Header />
      <Container>
        <div className='rootWrapper' style={{ display: 'flex' }}>
          <aside className='filters'>
            <RoomsFilter />
          </aside>
          <section className='mainContent' style={{ flex: '1' }}>
            <h2 style={{ margin: '30px 0 20px' }}>Номера, которые мы для вас подобрали</h2>
            <RoomsList rooms={roomsList} />
            <div></div>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default RoomsListPage;
