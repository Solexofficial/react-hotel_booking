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
  { id: '1', numberRoom: '1', rentPerDay: 9990, rate: 4, countReviews: 145 },
  { id: '2', numberRoom: '2', rentPerDay: 9990, rate: 3, countReviews: 145 },
  { id: '3', numberRoom: '3', rentPerDay: 9990, rate: 2, countReviews: 145 },
  { id: '4', numberRoom: '4', rentPerDay: 9990, rate: 4, countReviews: 145 },
  { id: '5', numberRoom: '5', rentPerDay: 9990, rate: 3, countReviews: 145 },
  { id: '6', numberRoom: '6', rentPerDay: 9990, rate: 2, countReviews: 145 },
  { id: '7', numberRoom: '7', rentPerDay: 9990, rate: 4, countReviews: 145 },
  { id: '8', numberRoom: '8', rentPerDay: 9990, rate: 3, countReviews: 145 },
  { id: '9', numberRoom: '9', rentPerDay: 9990, rate: 2, countReviews: 145 },
  { id: '10', numberRoom: '10', rentPerDay: 9990, rate: 4, countReviews: 145 },
  { id: '11', numberRoom: '11', rentPerDay: 9990, rate: 3, countReviews: 145 },
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

export default Rooms;
