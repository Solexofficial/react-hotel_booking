import AcUnitIcon from '@mui/icons-material/AcUnit';
import ComputerIcon from '@mui/icons-material/Computer';
import WifiIcon from '@mui/icons-material/Wifi';
import React from 'react';
import { Link } from 'react-router-dom';
import declOfNum from '../../../utils/declOfNum';
import Badge from '../../common/Badge';
import Divider from '../../common/Divider/Divider';
import SlickSlider from '../../common/ImageSlider';
import Rating from '../../common/Rating/Rating';

const comfortIconsMap = {
  hasWifi: <WifiIcon />,
  hasConditioner: <AcUnitIcon />,
  hasWorkSpace: <ComputerIcon />,
};

const RoomCard = ({ _id, numberRoom, rentPerDay, rate, countReviews, type, images, comforts }) => {
  return (
    <div className='room-card'>
      {comforts && (
        <Badge className='badge'>
          {comforts.map(comfort => (
            <div key={comfort}>{comfortIconsMap[comfort]}</div>
          ))}
        </Badge>
      )}
      <SlickSlider className='room-card__gallery'>
        {images &&
          Object.keys(images).map(img => (
            <div className='room-card__gallery-item' key={img}>
              <img className='room-card__gallery-item--img' src={images[img]} alt='roomsPhoto' />
            </div>
          ))}
      </SlickSlider>
      <Link to={`/rooms/${_id}`} className='room-card__description'>
        <div className='room-card__description-row'>
          <h3 className='room-card__title'>
            № <span className='room-card__title--big'>{numberRoom}</span>
            {type && <span className='room-card__type'>{type}</span>}
          </h3>
          <div className='room-card__rentPerDay'>
            <span>{rentPerDay}&#8381;</span> в сутки
          </div>
        </div>
        <Divider />
        <div className='room-card__description-row'>
          <div className='room-card__rating'>
            <Rating name='read-only' value={rate} totalCount={countReviews} readOnly />
          </div>
          <div className='room-card__reviews'>
            <span className='room-card__reviews-count'>{`${countReviews} ${declOfNum(countReviews, [
              'Отзыв',
              'Отзыва',
              'Отзывов',
            ])}`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
