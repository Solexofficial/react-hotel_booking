import React, { useEffect, useState } from 'react';
import { useFetching, useForm, usePagination, useRoomsFilter, useSort } from '../../../hooks';
import roomsService from '../../../services/rooms.service';
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

const RoomsPage = () => {
  const [rooms, setRoomsList] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'numberRoom', order: 'desc' });
  const [pageSize, setPageSize] = useState(12);

  const { data, setData, handleInputChange, handleResetForm } = useForm(filtersInitialData, false, {});
  const { sortedItems } = useSort(rooms, sortBy);
  const { filteredItems } = useRoomsFilter(sortedItems, data);
  const { currentPage, handleChangePage, itemsListCrop } = usePagination(filteredItems || [], pageSize);

  const [fetchingRooms, roomsIsLoading] = useFetching(async () => {
    const { content } = await roomsService.getAll();
    setRoomsList(content);
  });

  useEffect(() => {
    fetchingRooms();
  }, []);

  const handleSort = ({ target }) => {
    setSortBy(JSON.parse(target.value));
  };

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
        <RoomsDisplayCount count={pageSize} setCount={setPageSize} />
        <h2 className='rooms__title'>Номера, которые мы для вас подобрали</h2>
        {roomsIsLoading ? <RoomsListSkeleton pageSize={pageSize} /> : <RoomsList rooms={itemsListCrop} />}
        {itemsListCrop.length === 0 && <h2>Мы не нашли для вас подходящих номеров по вашим параметрам &#128577;</h2>}

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
              из ${rooms?.length} вариантов аренды`}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default RoomsPage;
