import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetching, useForm, usePagination, useRoomsFilter, useSort } from '../../../hooks';
import roomsService from '../../../services/rooms.service';
import { getRooms, getRoomsLoadingStatus, loadRoomsList } from '../../../store/rooms';
import Pagination from '../../common/Pagination';
import RoomsDisplayCount from '../../ui/rooms/RoomsDisplayCount';
import RoomsFilter from '../../ui/rooms/RoomsFilters';
import RoomsList from '../../ui/rooms/RoomsList';
import RoomsListSkeleton from '../../ui/rooms/RoomsList/RoomsListSkeleton';
import RoomsSort from '../../ui/rooms/RoomsSort';

const oneDayMs = 86000000;

const filtersInitialData = {
  dateOfStay: {
    arrival: Date.now(),
    departure: Date.now() + oneDayMs,
  },
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 0,
  children: 0,
  babies: 0,
  rentPerDay: [0, 15000],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

const setPageSizeOptions = [
  { name: '6', value: 6 },
  { name: '12', value: 12 },
  { name: '18', value: 18 },
  { name: '24', value: 24 },
];

const RoomsPage = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(getRooms());
  const roomsIsLoading = useSelector(getRoomsLoadingStatus());

  const { data, setData, handleInputChange, handleResetForm } = useForm(filtersInitialData, false, {});
  const { sortedItems, sortBy, setSortBy } = useSort(rooms || [], { path: 'roomNumber', order: 'desc' });
  const { filteredItems } = useRoomsFilter(sortedItems, data);
  const {
    itemsListCrop: roomsListCrop,
    currentPage,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = usePagination(filteredItems || [], setPageSizeOptions[1].value);

  useEffect(() => {
    dispatch(loadRoomsList());
  }, []);

  const handleSort = ({ target }) => {
    setSortBy(JSON.parse(target.value));
  };

  console.log(data.arrivalDate, data.departureDate);

  const bookings = [
    { arrivalDate: 1641763565000, departureDate: 1641936365000, time: '10,12' }, // 10-12
    { arrivalDate: 1642022765000, departureDate: 1642281965000, time: '13,16' }, // 13-16
  ];

  console.log(
    bookings.filter(booking => {
      return data.arrivalDate >= booking.departureDate;
    })
  );

  return (
    <main className='rooms-page'>
      <aside className='rooms-page__filters'>
        <RoomsFilter
          data={data}
          setData={setData}
          handleInputChange={handleInputChange}
          handleResetForm={handleResetForm}
        />
      </aside>
      <section className='rooms-page__rooms'>
        <RoomsSort sortBy={sortBy} onSort={handleSort} />
        <RoomsDisplayCount count={pageSize} setCount={handleChangePageSize} options={setPageSizeOptions} />
        <h2 className='rooms__title'>Номера, которые мы для вас подобрали</h2>
        {roomsIsLoading ? <RoomsListSkeleton pageSize={pageSize} /> : <RoomsList rooms={roomsListCrop} />}
        {roomsListCrop.length === 0 && <h2>Мы не нашли для вас подходящих номеров по вашим параметрам &#128577;</h2>}

        {filteredItems.length > pageSize && (
          <div className='rooms-page__pagination'>
            <Pagination
              items={filteredItems}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={handleChangePage}
            />
            <p className='rooms-page__pagination-info'>
              {`${(currentPage - 1) * pageSize || 1} - 
              ${pageSize * currentPage > rooms.length ? rooms.length : pageSize * currentPage}
              из ${rooms.length} вариантов аренды`}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default RoomsPage;
