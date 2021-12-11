import React from 'react';
import { usePagination } from '../../../hooks/usePagination';
import Pagination from '../../common/pagination';
import RoomCard from './roomCard';

const RoomsList = ({ rooms, pageSize }) => {
  const { currentPage, handleChangePage, itemsListCrop } = usePagination(rooms, pageSize);

  return (
    <>
      {rooms.length > 0 ? (
        <>
          <ul className='rooms__list'>
            {itemsListCrop.map(room => (
              <li key={room.id} className='rooms__list-item'>
                <RoomCard {...room} />
              </li>
            ))}
          </ul>
          {rooms.length > pageSize && (
            <div className='pagination'>
              <Pagination items={rooms} pageSize={pageSize} currentPage={currentPage} onChange={handleChangePage} />
              <p className='pagination__info'>{`1 - ${pageSize} из ${rooms.length} вариантов аренды`}</p>
            </div>
          )}
        </>
      ) : (
        <h2>Мы не нашли для вас подходящих номеров по вашим параметрам &#128577;</h2>
      )}
    </>
  );
};

export default RoomsList;
