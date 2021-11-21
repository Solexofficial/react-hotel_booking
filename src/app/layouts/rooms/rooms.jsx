import React from 'react';
import Container from '../../components/common/container';
import Footer from '../../components/common/footer/footer';
import Header from '../../components/common/header/header';
import RoomsFilter from '../../components/ui/rooms/roomsFilter/roomsFilter';
import RoomsList from '../../components/ui/rooms/roomsList';

import image1 from '../../assets/img/room888/1.jpg';
import image2 from '../../assets/img/room888/2.jpg';
import image3 from '../../assets/img/room888/3.jpg';

const roomsList = [
  {
    id: '888',
    numberRoom: '888',
    rentPerDay: 9990,
    rate: 5,
    countReviews: 145,
    type: 'Люкс',
    images: [image1, image2, image3],
  },
  { id: '123', numberRoom: '123', rentPerDay: 9990, rate: 4, countReviews: 145 },
  { id: '321', numberRoom: '321', rentPerDay: 9990, rate: 3, countReviews: 145 },
  { id: '423', numberRoom: '423', rentPerDay: 9990, rate: 2, countReviews: 145 },
];

const Rooms = () => {
  return (
    <>
      <Header />
      <Container>
        <div className='rootWrapper' style={{ display: 'flex' }}>
          <aside className='filters'>
            <RoomsFilter />
          </aside>
          <section className='mainContent' style={{ flex: '1' }}>
            <h2>Номера, которые мы для вас подобрали</h2>
            <RoomsList rooms={roomsList} />
            <div></div>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Rooms;
