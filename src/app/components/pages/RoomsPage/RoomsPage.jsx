import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, usePagination, useRoomsFilter, useSort } from '../../../hooks';
import { getRooms, getRoomsLoadingStatus } from '../../../store/rooms';
import Pagination from '../../common/Pagination';
import RoomsDisplayCount from '../../ui/rooms/RoomsDisplayCount';
import RoomsFilter from '../../ui/rooms/RoomsFilters';
import RoomsList from '../../ui/rooms/RoomsList';
import RoomsListSkeleton from '../../ui/rooms/RoomsList/RoomsListSkeleton';
import RoomsSort from '../../ui/rooms/RoomsSort';

const oneDayMs = 86000000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
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

const validatorConfig = {
  arrivalDate: {
    isValidDate: {
      message: 'Дата не корректна',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'Дата не корректна',
    },
  },
};

const RoomsPage = () => {
  const rooms = useSelector(getRooms());
  const roomsIsLoading = useSelector(getRoomsLoadingStatus());

  const { data, setData, errors, handleInputChange, handleResetForm } = useForm(initialState, false, validatorConfig);
  const { sortedItems, sortBy, setSortBy } = useSort(rooms || [], { path: 'roomNumber', order: 'desc' });
  const { filteredItems } = useRoomsFilter(sortedItems, data);
  const {
    itemsListCrop: roomsListCrop,
    currentPage,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = usePagination(filteredItems || [], setPageSizeOptions[1].value);

  const handleSort = ({ target }) => {
    setSortBy(JSON.parse(target.value));
  };

  //   var arrivalDate = moment("2022-01-12, 13:00:00"),
  //   bookingArrivalDate = moment("2022-01-08, 12:00:00"),
  //   bookingDepartureDate = moment("2022-01-12, 12:00:00");

  // if (arrivalDate.isBetween(bookingArrivalDate, bookingDepartureDate)) {
  //   console.log("is between");
  // } else {
  //   console.log("is not between");
  // }

  return (
    <main className='rooms-page'>
      <aside className='rooms-page__filters'>
        <RoomsFilter
          data={data}
          setData={setData}
          errors={errors}
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
