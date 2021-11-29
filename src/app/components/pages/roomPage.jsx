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
import Rating from '../common/rating';
import SearchRoomsForm from '../ui/searchRoomsForm/searchRoomsForm';

const RoomPage = ({ roomId }) => {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    api.rooms.getById(roomId).then(data => setRoomData(data));
  }, [roomId]);

  const getRating = rating => +Math.ceil(rating / roomData.countReviews).toFixed();

  console.log(roomData);
  return (
    <>
      <Header />
      <Container>
        {roomData ? (
          <>
            <Breadcrumbs />
            <main>
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
                      <Rating name='read-only' value={getRating(roomData.rate)} readOnly />
                      <span className='room-info__card-rating'>{`${roomData.countReviews} ${declOfNum(
                        roomData.countReviews,
                        ['Отзыв', 'Отзывов', 'Отзывов']
                      )}`}</span>
                    </div>
                  </div>
                </div>
                <div className='room-info__form'>
                  <SearchRoomsForm />
                </div>
              </div>
            </main>
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default RoomPage;
