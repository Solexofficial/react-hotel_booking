import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import { useForm } from '../../hooks/useForm';
import roomsService from '../../services/rooms.service';
import sessionStorageService from '../../services/sessionStorage.service';
import filterRooms from '../../utils/filterRooms';
import Breadcrumbs from '../common/breadcrumbs';
import Container from '../common/container';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import RoomsFilter from '../ui/rooms/roomsFilter/roomsFilter';
import RoomsList from '../ui/rooms/roomsList';
import RoomsListSkeleton from '../ui/rooms/roomsListSkeleton';

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
  const [roomsList, setRoomsList] = useState(null);
  const pageSize = 12;

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      const { content } = await roomsService.getAll();
      console.log(content);
      setRoomsList(content);
    } catch (error) {
      console.log(error);
    }
  };

  const { data, setData, handleInputChange, handleResetForm } = useForm(filtersInitialData, false, {});

  useEffect(() => {
    const dateOfStay = sessionStorageService.getDateOfStayData();
    const guestsCount = sessionStorageService.getCountGuestsData();

    if (dateOfStay && guestsCount) {
      setData(prevState => ({
        ...prevState,
        dateOfStay: dateOfStay,
        guests: guestsCount,
      }));
    }
  }, []);

  const filteredRoomsList = filterRooms(roomsList, data);

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
            />
          </aside>
          <section className='mainContent' style={{ flex: '1' }}>
            <h2 style={{ margin: '30px 0 20px' }}>Номера, которые мы для вас подобрали</h2>
            {roomsList ? (
              <RoomsList rooms={filteredRoomsList} pageSize={pageSize} />
            ) : (
              <RoomsListSkeleton pageSize={pageSize} />
            )}
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default RoomsListPage;
