import React from 'react';
import { Link } from 'react-router-dom';
import declOfNum from '../../../utils/declOfNum';
import Divider from '../../common/divider';
import SlickSlider from '../../common/imageSlider/slickSlider';
import Rating from '../../common/rating';

const RoomCard = ({ id, numberRoom, rentPerDay, rate, countReviews, type, images }) => {
  return (
    <div className='room-card'>
      <SlickSlider className='room-card__gallery'>
        {images &&
          images.map(img => (
            <div className='room-card__gallery-item' key={img.key}>
              <img className='room-card__gallery-item--img' src={img.url} alt='roomsPhoto' />
            </div>
          ))}
      </SlickSlider>
      <Link to={`/rooms/${id}`} className='room-card__description'>
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
