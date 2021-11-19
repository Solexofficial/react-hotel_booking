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

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <>
      <button
        style={{
          ...style,
          display: 'block',
          background: 'green',
          right: 0,
          position: 'absolute',
          width: '20px',
          height: '20px',
          zIndex: 3,
        }}
        onClick={onClick}
      ></button>
    </>
  );
}

const sliderSettings = {
  dots: true,
  nextArrow: <SamplePrevArrow />,
  prevArrow: <SamplePrevArrow />,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const RoomCard = ({ numberRoom, rentPerDay, rate, countReviews, images }) => {
  console.log(images);
  console.log(numberRoom, rentPerDay, rate, countReviews);
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
