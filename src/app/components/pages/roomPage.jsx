import LocationCityIcon from '@mui/icons-material/LocationCity';
import MoodIcon from '@mui/icons-material/Mood';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import declOfNum from '../../utils/declOfNum';
import Breadcrumbs from '../common/breadcrumbs';
import Container from '../common/container';
import Divider from '../common/divider';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import SlickSlider from '../common/imageSlider/slickSlider';
import Loader from '../common/loader';
import Reviews from '../ui/reviews/reviews';

const RoomPage = ({ roomId }) => {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    api.rooms.getById(roomId).then(data => setRoomData(data));
  }, [roomId]);

  console.log(roomData);
  return (
    <>
      <Header />
      <Container>
        <Breadcrumbs />
        <main>
          {roomData ? (
            <>
              <SlickSlider className='room-page__gallery'>
                {roomData.images.map(img => (
                  <img key={img.key} className='room-page__gallery-item--img' src={img.url} alt='roomsPhoto' />
                ))}
              </SlickSlider>
              <h1>Room page id: {roomId}</h1>
              <div className='room-info'>
                <div className='room-info__column'>
                  <div className='room-info__group'>
                    <div className='room-info__card'>
                      <h3 className='room-info__card-title'>Сведения о номере</h3>
                      <ul className='features-list'>
                        <li className='features-list__item'>
                          <div className='feature'>
                            <MoodIcon className='feature__icon' />
                            <div className='feature-content'>
                              <div className='feature__title'>Комфорт</div>
                              <div className='feature__subtitle'>Шумопоглащающие стены</div>
                            </div>
                          </div>
                          <Divider className='feature-separator' />
                        </li>
                        <li className='features-list__item'>
                          <div className='feature'>
                            <LocationCityIcon className='feature__icon' />
                            <div className='feature-content'>
                              <div className='feature__title'>Удобство</div>
                              <div className='feature__subtitle'>Окно в каждой из спален</div>
                            </div>
                          </div>
                          <Divider className='feature-separator' />
                        </li>
                        <li className='features-list__item'>
                          <div className='feature'>
                            <WhatshotIcon className='feature__icon' />
                            <div className='feature-content'>
                              <div className='feature__title'>Уют</div>
                              <div className='feature__subtitle'>Номер оснащен камином</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
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
                <div className='room-info__form'>{/* <SearchRoomsForm /> */}</div>
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
