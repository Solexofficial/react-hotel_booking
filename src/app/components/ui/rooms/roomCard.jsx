import { Card, IconButton } from '@mui/material';
import React from 'react';
import image1 from '../../../assets/img/room888/1.jpg';
import image2 from '../../../assets/img/room888/2.jpg';
import image3 from '../../../assets/img/room888/3.jpg';
import SlickSlider from '../../common/imageSlider/slickSlider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const sliderImages = [
  { url: image1, key: 'image1' },
  { url: image2, key: 'image2' },
  { url: image3, key: 'image3' },
];

const sliderSettings = {
  dots: true,
  nextArrow: (
    <>
      <button className='room-card__gallery-arrow room-card__gallery-arrow--next slick-arrow'>
        <ChevronRightIcon />
      </button>
    </>
  ),
  prevArrow: (
    <>
      <button className='room-card__gallery-arrow room-card__gallery-arrow--prev prev-slick-arrow"'>123</button>
    </>
  ),
  infinite: false,
  draggable: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const RoomCard = ({ numberRoom, rentPerDay, rate, countReviews, images }) => {
  console.log(images);
  console.log(numberRoom, rentPerDay, rate, countReviews);
  return (
    <Card className='room-card'>
      <SlickSlider {...sliderSettings} images={sliderImages} />

      <p>Number: {numberRoom}</p>
      <p>rentPerDay: {rentPerDay}</p>
      <p>rate: {rate}</p>
      <p>countReviews: {countReviews}</p>
    </Card>
  );
};

export default RoomCard;
