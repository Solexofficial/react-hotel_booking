import LocationCityIcon from '@mui/icons-material/LocationCity';
import MoodIcon from '@mui/icons-material/Mood';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import roomsService from '../../services/rooms.service';
import declOfNum from '../../utils/declOfNum';
import Breadcrumbs from '../common/breadcrumbs';
import Container from '../common/container';
import Divider from '../common/divider';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import SlickSlider from '../common/imageSlider/slickSlider';
import Loader from '../common/loader';
import BookingForm from '../ui/forms/bookingForm';
import Reviews from '../ui/reviews/reviews';
import RoomInfoCard from '../ui/room/cards/roomInfoCard';

const RoomPage = ({ roomId }) => {
  const [roomData, setRoomData] = useState(null);
  console.log('room render');

  const getRoomData = async id => {
    api.rooms.getById(roomId).then(data => setRoomData(data));
    const { content } = await roomsService.getById(id);
    setRoomData(content);
  };

  useEffect(() => {
    getRoomData(roomId);
  }, [roomId]);

  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <main>
          {roomData ? (
            <>
              <SlickSlider className='room-page__gallery'>
                {Object.keys(roomData.images).map(img => (
                  <img key={img} className='room-page__gallery-item--img' src={roomData.images[img]} alt='roomsPhoto' />
                ))}
              </SlickSlider>
              <div className='room-info'>
                <div className='room-info__column'>
                  <div className='room-info__group'>
                    <RoomInfoCard />
                    <div className='room-info__card'>
                      <h3 className='room-info__card-title'>Впечатления от номера</h3>
                      Оценок
                      <span className='room-info__card-rating'>{`${roomData.countReviews} ${declOfNum(
                        roomData.countReviews,
                        ['Отзыв', 'Отзыва', 'Отзывов']
                      )}`}</span>
                    </div>
                  </div>
                  <Reviews />
                  <div className='room-info__group'>
                    <div className='room-info__card'>
                      <h3 className='room-info__card-title'>Правила</h3>
                      <ul className='bullet-list'>
                        <li className='bullet-list__item'>Нельзя с питомцами</li>
                        <li className='bullet-list__item'>Без вечеринок и мероприятий</li>
                        <li className='bullet-list__item'>Время прибытия — после 13:00, а выезд до 12:00</li>
                      </ul>
                    </div>
                    <div className='room-info__card'>
                      <h3 className='room-info__card-title'>Отмена</h3>
                      <p>
                        Бесплатная отмена в течение 48 ч. После этого при отмене не позднее чем за 5 дн. до прибытия вы
                        получите полный возврат за вычетом сбора за услуги.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='room-info__form'>
                  <BookingForm room={roomData} />
                </div>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default RoomPage;
