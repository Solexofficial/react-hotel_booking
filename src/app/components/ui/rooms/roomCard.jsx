import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import image1 from '../../../assets/img/room888/1.jpg';
import image2 from '../../../assets/img/room888/2.jpg';
import image3 from '../../../assets/img/room888/3.jpg';
import SlickSlider from '../../common/imageSlider/cardSlickSlider';

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

const RoomCard = ({ numberRoom, rentPerDay, rate, countReviews, images }) => {
  return (
    <div className='room-card'>
      <SlickSlider {...sliderSettings} images={sliderImages} />

      <p>Number: {numberRoom}</p>
      <p>rentPerDay: {rentPerDay}</p>
      <p>rate: {rate}</p>
      <p>countReviews: {countReviews}</p>
    </div>
  );
};

export default RoomCard;
