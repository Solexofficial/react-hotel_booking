import { Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoomById } from '../../../../store/rooms';
import { getDateDDMMYYYY } from '../../../../utils/formatDate';
import Button from '../../../common/Button';
import { getGuestsLabel } from '../../GuestsCounter/GuestsCounter';
import RoomCard from '../../rooms/RoomCard';

const BookingCard = ({ _id, arrivalDate, departureDate, adults, children, babies, totalPrice, roomId, onRemove }) => {
  const room = useSelector(getRoomById(roomId));

  return (
    <Paper className='booking-card'>
      <div className='booking-card__wrapper'>
        <div className='booking-content'>
          <h2>
            Номер: №<span>{roomId}</span>
          </h2>
          <h3 className='booking-info__title'>Информация о бронировании</h3>
          <table className='booking-info'>
            <tbody className='booking-info__body'>
              <tr className='booking-info__item'>
                <td>Дата прибытия:</td>
                <td>
                  <span>{`${getDateDDMMYYYY(arrivalDate)}`}</span>
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>Дата выезда:</td>
                <td>
                  <span>{`${getDateDDMMYYYY(departureDate)}`}</span>
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>Количество гостей:</td>
                <td>
                  <span>{getGuestsLabel(adults, children, babies)}</span>
                </td>
              </tr>
              <tr className='booking-info__item'>
                <td>Стоимость бронирования:</td>
                <td>
                  <span>{`${totalPrice}`}&#8381;</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='booking-card__btns'>
          <div style={{ width: '100%' }}>
            <RoomCard {...room} />
          </div>
          <Link to={`/rooms/${roomId}`}>
            <Button size='small' fullWidth>
              Перейти на страницу номера
            </Button>
          </Link>
          <Button size='small' variant='outlined' color='error' onClick={() => onRemove(_id)}>
            Отменить бронирование
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default BookingCard;
