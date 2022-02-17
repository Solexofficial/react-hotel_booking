import { Paper } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import localStorageService from '../../../services/localStorage.service';
import { getRoomById } from '../../../store/rooms';
import ButtonFavorite from '../../common/ButtonFavorite/ButtonFavorite';
import ImageSlider from '../../common/ImageSlider';
import Loader from '../../common/Loader';
import { BookingForm } from '../../ui/forms';
import Reviews from '../../ui/reviews/Reviews';
import RoomCancelCard from '../../ui/RoomPageCards/RoomCancelCard';
import RoomInfoCard from '../../ui/RoomPageCards/RoomInfoCard';
import RoomReviewsCard from '../../ui/RoomPageCards/RoomReviewsCard';
import RoomRulesCard from '../../ui/RoomPageCards/RoomRulesCard';

type RoomPageProps = {
  roomId: string;
};

const RoomPage: React.FC<RoomPageProps> = ({ roomId }) => {
  const room = useSelector(getRoomById(roomId));
  const isFavorite = localStorageService.getFavoritesRoom()
    ? localStorageService.getFavoritesRoom()!.includes(roomId)
    : false;
  const [status, setStatus] = useState(isFavorite || false);

  const handleToggleFavorite = (roomId: string) => {
    localStorageService.toggleFavoriteRoom(roomId);
    setStatus(prevState => !prevState);
  };

  if (room) {
    const { roomNumber, images, type, price, countReviews, rate } = room;
    return (
      <main>
        <div className='room-page__gallery-wrapper'>
          <ImageSlider className='room-page__gallery'>
            {images &&
              images.map((img: string) => (
                <img key={img} className='room-page__gallery-item--img' src={img} alt='roomsPhoto' />
              ))}
          </ImageSlider>
        </div>
        <div className='room-info'>
          <div className='room-info__column'>
            <div className='room-info__group'>
              <RoomInfoCard />
              <RoomReviewsCard countReviews={countReviews} rate={rate} />
            </div>
            <Reviews />
            <div className='room-info__group'>
              <RoomRulesCard />
              <RoomCancelCard />
            </div>
          </div>
          <div className='room-info__form'>
            <Paper elevation={3} className='form-card booking-form__card'>
              <div style={{ display: 'flex' }}>
                <ButtonFavorite status={status} onToggle={() => handleToggleFavorite(roomId)} />
              </div>
              <div className='booking-form__header'>
                <div className='booking-form__numberRoom'>
                  <span className='booking-form__numberRoom-text'>№ {roomNumber}</span>
                  {type && <span className='booking-form__numberRoom-type'>{type}</span>}
                </div>
                <div className='booking-form__cost'>
                  <span>{price}&#8381;</span> в сутки
                </div>
              </div>

              <BookingForm />
            </Paper>
          </div>
        </div>
      </main>
    );
  }
  return <Loader />;
};

export default RoomPage;
