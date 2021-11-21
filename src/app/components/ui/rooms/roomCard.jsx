import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import image1 from '../../../assets/img/room888/1.jpg';
import image2 from '../../../assets/img/room888/2.jpg';
import image3 from '../../../assets/img/room888/3.jpg';
import SlickSlider from '../../common/imageSlider/cardSlickSlider';
import { Link } from 'react-router-dom';
import Divider from '../../common/divider';
import Rating from '../../common/rating';

const sliderImages = [
  { url: image1, key: 'image1' },
  { url: image2, key: 'image2' },
  { url: image3, key: 'image3' },
];

function NextButton(props) {
  const { onClick } = props;
  return (
    <button className='room-card__gallery-arrow room-card__gallery-arrow--next' onClick={onClick}>
      <ChevronRightIcon />
    </button>
  );
}

function PrevButton(props) {
  const { onClick } = props;
  return (
    <button className='room-card__gallery-arrow room-card__gallery-arrow--before' onClick={onClick}>
      <ChevronLeftIcon />
    </button>
  );
}

const sliderSettings = {
  dots: true,
  nextArrow: <NextButton />,
  prevArrow: <PrevButton />,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const RoomCard = ({ numberRoom, rentPerDay, rate, countReviews, type, images }) => {
  return (
    <div className='room-card'>
      <SlickSlider {...sliderSettings} images={sliderImages} />
      <Link to='/' className='room-card__description'>
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
            <Rating name='read-only' value={rate} readOnly />
          </div>
          <div>Отзывов: {countReviews}</div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
