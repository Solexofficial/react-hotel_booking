import React, { useCallback, useEffect, useState } from 'react';
import useFetching from '../../hooks/useFetching';
import { useForm } from '../../hooks/useForm';
import { usePagination } from '../../hooks/usePagination';
import { useRoomsFilter } from '../../hooks/useRoomsFilter';
import { useSort } from '../../hooks/useSort';
import roomsService from '../../services/rooms.service';
import sessionStorageService from '../../services/sessionStorage.service';
import { SelectField } from '../common/form/fields';
import Pagination from '../common/pagination';
import RoomsFilter from '../ui/rooms/roomsFilter/roomsFilter';
import RoomsSort from '../ui/rooms/roomsFilter/roomsSort';
import RoomsList from '../ui/rooms/roomsList';
import RoomsListSkeleton from '../ui/rooms/roomsListSkeleton';

const oneDayMs = 86000000;

const filtersInitialData = {
  guests: [
    { name: 'adults', label: 'Взрослые', value: 0 },
    { name: 'children', label: 'Дети', value: 0 },
    { name: 'babies', label: 'Младенцы', value: 0 },
  ],
  dateOfStay: {
    arrival: new Date(new Date().toISOString().slice(0, 10)).getTime(),
    departure: new Date(new Date().toISOString().slice(0, 10)).getTime() + oneDayMs,
  },
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

const RoomsListPage = () => {
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

  console.log(roomsIsLoading);

  useEffect(() => {
    fetchingRooms();
  }, []);

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
  }, [setData]);

  const setSessionStorageData = useCallback(async () => {
    const { dateOfStay, guests } = data;
    sessionStorageService.setSessionStorageData(dateOfStay, guests);
  }, [data]);

  useEffect(() => {
    setSessionStorageData();
  }, [data, setSessionStorageData]);

  const handleSort = ({ target }) => {
    setSortBy(JSON.parse(target.value));
  };

  return (
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
        <RoomsSort sortBy={sortBy} onSort={handleSort} />
        <SelectField
          style={{ minWidth: '140px' }}
          autoWidth={true}
          label='Отображать по'
          value={pageSize}
          onChange={({ target }) => setPageSize(target.value)}
          options={[
            { name: '6', value: 6 },
            { name: '12', value: 12 },
            { name: '18', value: 18 },
            { name: '24', value: 24 },
          ]}
        />
        <h2 style={{ margin: '30px 0 20px' }}>Номера, которые мы для вас подобрали</h2>
        {roomsIsLoading ? <RoomsListSkeleton pageSize={pageSize} /> : <RoomsList rooms={itemsListCrop} />}
        {itemsListCrop.length === 0 && <h2>Мы не нашли для вас подходящих номеров по вашим параметрам &#128577;</h2>}

        {filteredItems.length > pageSize && (
          <div className='pagination'>
            <Pagination
              items={filteredItems}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={handleChangePage}
            />
            <p className='pagination__info'>{`1 - ${pageSize} из ${rooms?.length} вариантов аренды`}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default RoomsListPage;
