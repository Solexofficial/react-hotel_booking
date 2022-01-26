import { Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRoomById } from '../../../store/rooms';
import ImageSlider from '../../common/ImageSlider';
import Loader from '../../common/Loader';
import { BookingForm } from '../../ui/forms';
import Reviews from '../../ui/reviews/Reviews';
import RoomCancelCard from '../../ui/RoomPageCards/RoomCancelCard';
import RoomInfoCard from '../../ui/RoomPageCards/RoomInfoCard';
import RoomReviewsCard from '../../ui/RoomPageCards/RoomReviewsCard';
import RoomRulesCard from '../../ui/RoomPageCards/RoomRulesCard';

const RoomPage = ({ roomId }) => {
  const room = useSelector(getRoomById(roomId));

  console.log('room render');

  if (room) {
    const { roomNumber, images, countReviews, type, rentPerDay } = room;
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
                  <span className='booking-form__numberRoom-text'>№ {roomNumber}</span>
                  {type && <span className='booking-form__numberRoom-type'>{type}</span>}
                </div>
                <div className='booking-form__cost'>
                  <span>{rentPerDay}&#8381;</span> в сутки
                </div>
              </div>

              <BookingForm rentPerDay={rentPerDay} />
            </Paper>
          </div>
        </div>
      </main>
    );
  }
  return <Loader />;
};

export default RoomPage;
