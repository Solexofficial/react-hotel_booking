import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import roomsService from '../../services/rooms.service';
import SlickSlider from '../common/ImageSlider/ImageSlider';
import Loader from '../common/Loader/Loader';
import BookingForm from '../ui/forms/BookingForm';
import Reviews from '../ui/reviews/reviews';
import RoomCancelCard from '../ui/room/cards/roomCancelCard';
import RoomInfoCard from '../ui/room/cards/roomInfoCard';
import RoomReviewsCard from '../ui/room/cards/roomReviewsCard';
import RoomRulesCard from '../ui/room/cards/roomRulesCard.jsx';

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
        <SlickSlider className='room-page__gallery'>
          {Object.keys(images).map(img => (
            <img key={img} className='room-page__gallery-item--img' src={images[img]} alt='roomsPhoto' />
          ))}
        </SlickSlider>
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
