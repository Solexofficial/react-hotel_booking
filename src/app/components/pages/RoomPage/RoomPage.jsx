import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import roomsService from '../../../services/rooms.service';
import ImageSlider from '../../common/ImageSlider';
import Loader from '../../common/Loader';
import { BookingForm } from '../../ui/forms';
import Reviews from '../../ui/reviews/reviews';
import RoomInfoCard from '../../ui/RoomCards/RoomInfoCard';
import RoomReviewsCard from '../../ui/RoomCards/RoomReviewsCard';
import RoomRulesCard from '../../ui/RoomCards/RoomRulesCard';
import RoomCancelCard from '../../ui/RoomCards/RoomCancelCard';

const RoomPage = ({ roomId }) => {
  const [currentRoom, setRoom] = useState(null);
  console.log('room render');

  const getRoomData = async id => {
    const { content } = await roomsService.getById(id);
    setRoom(content);
  };

  useEffect(() => {
    getRoomData(roomId);
  }, []);

  if (currentRoom) {
    const { images, countReviews, type, rentPerDay, isBooked } = currentRoom;
    return (
      <main>
        <ImageSlider className='room-page__gallery'>
          {Object.keys(images).map(img => (
            <img key={img} className='room-page__gallery-item--img' src={images[img]} alt='roomsPhoto' />
          ))}
        </ImageSlider>
        <div className='room-info'>
          <div className='room-info__column'>
            <div className='room-info__group'>
              <RoomInfoCard />
              <RoomReviewsCard countReviews={countReviews} />
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
                  {type && <span className='booking-form__numberRoom-type'>{type}</span>}
                </div>
                <div className='booking-form__cost'>
                  <span>{rentPerDay}&#8381;</span> в сутки
                </div>
              </div>

              <BookingForm rentPerDay={rentPerDay} isBooked={isBooked} />
            </Paper>
          </div>
        </div>
      </main>
    );
  }
  return <Loader />;
};

export default RoomPage;
