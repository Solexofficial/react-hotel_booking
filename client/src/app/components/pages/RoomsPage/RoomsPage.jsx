import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFiltersQuery, usePagination, useSort } from '../../../hooks';
import { setSessionStorageData } from '../../../services/sessionStorage.service';
import { getRooms, getRoomsLoadingStatus } from '../../../store/rooms';
import Pagination from '../../common/Pagination';
import RoomsDisplayCount from '../../ui/rooms/RoomsDisplayCount';
import RoomsFilter from '../../ui/rooms/RoomsFilters';
import RoomsList from '../../ui/rooms/RoomsList';
import RoomsListSkeleton from '../../ui/rooms/RoomsList/RoomsListSkeleton';
import RoomsSort from '../../ui/rooms/RoomsSort';

const setPageSizeOptions = [
  { name: '6', value: 6 },
  { name: '12', value: 12 },
  { name: '18', value: 18 },
  { name: '24', value: 24 },
];

// !TODO: add validation filters
// !TODO: add serverSide filter by queryString

const RoomsPage = () => {
  const rooms = useSelector(getRooms());
  const roomsIsLoading = useSelector(getRoomsLoadingStatus());
  const [searchFilters, handleChangeFilter, onResetFilters] = useFiltersQuery();

  useEffect(() => {
    console.log('filters', searchFilters);
    const data = axios.get('http://localhost:8080/api/rooms', { params: searchFilters });
    data.then(res => console.log('test filtering', res.data));
    setSessionStorageData(searchFilters)
  }, [searchFilters]);

  const { sortedItems, sortBy, setSortBy } = useSort(rooms || [], { path: 'roomNumber', order: 'desc' });
  const {
    itemsListCrop: roomsListCrop,
    currentPage,
    pageSize,
    handleChangePage,
    handleChangePageSize,
  } = usePagination(sortedItems || [], setPageSizeOptions[1].value);

  const handleSort = event => {
    setSortBy(JSON.parse(event.target.value));
    handleChangePage(event, 1);
  };

  // useEffect(() => {
  //   const searchQueryData = getSearchQueryData();
  //   if (searchQueryData) {
  //     setData(prevState => ({ ...prevState, ...searchQueryData }));
  //   }
  // }, []);

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
        <RoomsFilter searchParams={searchFilters} onChange={handleChangeFilter} onReset={onResetFilters} />
      </aside>
      <section className='rooms-page__rooms'>
        <div className='rooms-page__sorting'>
          <RoomsSort sortBy={sortBy} onSort={handleSort} />
          <RoomsDisplayCount count={pageSize} setCount={handleChangePageSize} options={setPageSizeOptions} />
        </div>
        <h2 className='rooms__title'>Номера, которые мы для вас подобрали</h2>
        {roomsIsLoading ? <RoomsListSkeleton pageSize={pageSize} /> : <RoomsList rooms={roomsListCrop} />}
        {roomsListCrop.length === 0 && <h2>Мы не нашли для вас подходящих номеров по вашим параметрам &#128577;</h2>}

        {sortedItems.length > pageSize && (
          <div className='rooms-page__pagination'>
            <Pagination items={sortedItems} pageSize={pageSize} currentPage={currentPage} onChange={handleChangePage} />
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
