import { Paper } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import roomsService from '../../services/rooms.service';
import SlickSlider from '../common/imageSlider/slickSlider';
import Loader from '../common/loader';
import BookingForm from '../ui/forms/bookingForm';
import Reviews from '../ui/reviews/reviews';
import RoomCancelCard from '../ui/room/cards/roomCancelCard';
import RoomInfoCard from '../ui/room/cards/roomInfoCard';
import RoomReviewsCard from '../ui/room/cards/roomReviewsCard';
import RoomRulesCard from '../ui/room/cards/roomRulesCard.jsx';

const RoomPage = ({ roomId }) => {
  const [currentRoom, setRoom] = useState(null);
  console.log('room render');

  const getRoomData = async id => {
    api.rooms.getById(roomId).then(data => setRoom(data));
    const { content } = await roomsService.getById(id);
    setRoom(content);
  };

  useEffect(() => {
    getRoomData(roomId);
  }, [roomId]);

  return (
    <main>
      {currentRoom ? (
        <>
          <SlickSlider className='room-page__gallery'>
            {Object.keys(currentRoom.images).map(img => (
              <img key={img} className='room-page__gallery-item--img' src={currentRoom.images[img]} alt='roomsPhoto' />
            ))}
          </SlickSlider>
          <div className='room-info'>
            <div className='room-info__column'>
              <div className='room-info__group'>
                <RoomInfoCard />
                <RoomReviewsCard countReviews={currentRoom.countReviews} />
              </div>
              <Reviews />
              <div className='room-info__group'>
                <RoomRulesCard />
                <RoomCancelCard />
              </div>
            </div>
            <div className='room-info__form'>
              <Paper elevation={3} className='form-card booking-form__card'>
                <div className='booking-form__header'>
                  <div className='booking-form__numberRoom'>
                    <span className='booking-form__numberRoom-text'>№ {currentRoom.numberRoom}</span>
                    {currentRoom.type && <span className='booking-form__numberRoom-type'>{currentRoom.type}</span>}
                  </div>
                  <div className='booking-form__cost'>
                    <span>{currentRoom.rentPerDay}&#8381;</span> в сутки
                  </div>
                </div>
                <BookingForm rentPerDay={currentRoom.rentPerDay} />
              </Paper>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default RoomPage;
