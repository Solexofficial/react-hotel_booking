import React from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MoodIcon from '@mui/icons-material/Mood';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Divider from '../../common/Divider/Divider';

const RoomInfoCard = () => {
  return (
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
  );
};

export default RoomInfoCard;
