import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import image1 from '../../assets/img/room888/1.jpg';
import image2 from '../../assets/img/room888/2.jpg';
import image3 from '../../assets/img/room888/3.jpg';
import { useForm } from '../../hooks/useForm';
import Container from '../common/container';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import RoomsFilter from '../ui/rooms/roomsFilter/roomsFilter';
import RoomsList from '../ui/rooms/roomsList';

const rooms = [
  {
    id: '888',
    numberRoom: '888',
    rentPerDay: 9990,
    rate: 5,
    countReviews: 145,
    type: 'Люкс',
    images: [image1, image2, image3],
    canSmoke: true,
  },
  { id: '1', numberRoom: '1', rentPerDay: 15000, rate: 4, countReviews: 145, canSmoke: true },
  { id: '2', numberRoom: '2', rentPerDay: 1500, rate: 3, countReviews: 145 },
  { id: '3', numberRoom: '3', rentPerDay: 3000, rate: 2, countReviews: 145 },
  { id: '4', numberRoom: '4', rentPerDay: 4000, rate: 4, countReviews: 145 },
  { id: '5', numberRoom: '5', rentPerDay: 9990, rate: 3, countReviews: 145 },
  { id: '6', numberRoom: '6', rentPerDay: 9990, rate: 2, countReviews: 145 },
  { id: '7', numberRoom: '7', rentPerDay: 9990, rate: 4, countReviews: 145 },
  { id: '8', numberRoom: '8', rentPerDay: 9990, rate: 3, countReviews: 145 },
  { id: '9', numberRoom: '9', rentPerDay: 9990, rate: 2, countReviews: 145 },
  { id: '10', numberRoom: '10', rentPerDay: 9990, rate: 4, countReviews: 145 },
  { id: '11', numberRoom: '11', rentPerDay: 9990, rate: 3, countReviews: 145 },
];

const filtersList = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: { arrival: new Date(Date.now()).getTime(), departure: new Date(Date.now()).getTime() },
  rentPerDay: [5000, 10000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
};

const RoomsListPage = () => {
  const [roomsList, setRoomsList] = useState(rooms || []);
  const { data, setData, handleInputChange, handleResetForm } = useForm(filtersList, false, {});

  let filteredData = roomsList;

  if (data.canSmoke) {
    filteredData = filteredData.filter(room => room.canSmoke);
  }

  if (data.rentPerDay) {
    filteredData = filteredData.filter(
      room => room.rentPerDay >= data.rentPerDay[0] && room.rentPerDay <= data.rentPerDay[1]
    );
  }

  const history = useHistory();
  const querySearchStr = history.location.search;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };

  const getQueryData = useCallback(async () => {
    let queryData = queryString.parse(querySearchStr);
    queryData = { ...queryData, guests: JSON.parse(queryData.guests), dateOfStay: JSON.parse(queryData.dateOfStay) };
    return queryData;
  }, [querySearchStr]);

  useEffect(() => {
    if (querySearchStr) {
      try {
        getQueryData().then(data => setData(prevState => ({ ...prevState, ...data })));
      } catch (error) {
        console.log(error);
      }
    }
  }, [querySearchStr, getQueryData, setData]);

  return (
    <>
      <Header />
      <Container>
        <div className='rootWrapper' style={{ display: 'flex' }}>
          <aside className='filters'>
            <RoomsFilter
              data={data}
              setData={setData}
              handleInputChange={handleInputChange}
              handleResetForm={handleResetForm}
              handleSubmit={handleSubmit}
            />
          </aside>
          <section className='mainContent' style={{ flex: '1' }}>
            <h2 style={{ margin: '30px 0 20px' }}>Номера, которые мы для вас подобрали</h2>
            <RoomsList rooms={filteredData} />
            <div></div>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default RoomsListPage;
