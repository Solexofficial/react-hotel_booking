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
import filterRooms from '../../utils/filterRooms';
import Pagination from '../common/pagination';
import { paginate } from '../../utils/paginate';
import Breadcrumbs from '../common/breadcrumbs';
import api from '../../api';

const filtersList = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: { arrival: new Date(Date.now()).getTime(), departure: new Date(Date.now()).getTime() },
  rentPerDay: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
};

const RoomsListPage = () => {
  const [roomsList, setRoomsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    api.rooms.fetchAll().then(data => setRoomsList(data));
  }, []);

  const { data, setData, handleInputChange, handleResetForm } = useForm(filtersList, false, {});

  const filteredRoomsList = filterRooms(roomsList, data);
  const roomsListCrop = paginate(filteredRoomsList, currentPage, pageSize);

  const roomsCount = filteredRoomsList.length;

  const history = useHistory();
  const querySearchStr = history.location.search;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };

  const handleSetCurrentPage = (event, value) => {
    setCurrentPage(value);
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
        <Breadcrumbs />
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
            {roomsList.length > 0 ? <RoomsList rooms={roomsListCrop} /> : <h2>Loading...</h2>}
            <Pagination itemsCount={roomsCount} pageSize={pageSize} onChange={handleSetCurrentPage} />
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default RoomsListPage;
