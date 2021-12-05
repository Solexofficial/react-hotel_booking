import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import { useForm } from '../../hooks/useForm';
import sessionStorageService from '../../services/sessionStorage.service';
import filterRooms from '../../utils/filterRooms';
import { paginate } from '../../utils/paginate';
import Breadcrumbs from '../common/breadcrumbs';
import Container from '../common/container';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import Loader from '../common/loader';
import Pagination from '../common/pagination';
import RoomsFilter from '../ui/rooms/roomsFilter/roomsFilter';
import RoomsList from '../ui/rooms/roomsList';

const filtersInitialData = {
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

  const { data, setData, handleInputChange, handleResetForm } = useForm(filtersInitialData, false, {});

  useEffect(() => {
    const dateOfStay = sessionStorageService.getDateOfStayData();
    const guestsCount = sessionStorageService.getCountGuestsData();

    setData(prevState => ({
      ...prevState,
      dateOfStay: dateOfStay,
      guests: guestsCount,
    }));

    console.log(dateOfStay, guestsCount);
  }, []);

  const filteredRoomsList = filterRooms(roomsList, data);
  const roomsListCrop = paginate(filteredRoomsList, currentPage, pageSize);

  const roomsCount = filteredRoomsList.length;

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };

  const handleSetCurrentPage = (event, value) => {
    setCurrentPage(value);
  };

  const setSessionStorageData = useCallback(async () => {
    const { dateOfStay, guests } = data;
    sessionStorageService.setSessionStorageData(dateOfStay, guests);
  }, [data]);

  useEffect(() => {
    setSessionStorageData();
  }, [data, setSessionStorageData]);

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
            {roomsList.length > 0 ? <RoomsList rooms={roomsListCrop} /> : <Loader />}
            <Pagination itemsCount={roomsCount} pageSize={pageSize} onChange={handleSetCurrentPage} />
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default RoomsListPage;
