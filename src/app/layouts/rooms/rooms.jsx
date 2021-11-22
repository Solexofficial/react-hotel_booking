import React from 'react';
import { useParams } from 'react-router';
import image1 from '../../assets/img/room888/1.jpg';
import image2 from '../../assets/img/room888/2.jpg';
import image3 from '../../assets/img/room888/3.jpg';
import RoomsListPage from '../../components/pages/roomsListPage';
import RoomPage from '../../components/pages/roomPage';

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
  const { id } = useParams();

  return <>{id ? <RoomPage roomId={id} /> : <RoomsListPage roomsList={roomsList} />}</>;
};

export default Rooms;
