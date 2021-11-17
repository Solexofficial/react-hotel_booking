import { Card } from '@mui/material';
import React from 'react';
import image1 from '../../../assets/img/room888/1.jpg';
import image2 from '../../../assets/img/room888/2.jpg';
import image3 from '../../../assets/img/room888/3.jpg';
import ImageSlider from '../../common/imageSlider/slider';

const sliderImages = [{ url: image1 }, { url: image2 }, { url: image3 }];

const RoomCard = ({ numberRoom, rentPerDay, rate, countReviews, images }) => {
  console.log(images);
  console.log(numberRoom, rentPerDay, rate, countReviews);
  return (
    <Card>
      <div style={{ position: 'relative' }}>
        <ImageSlider images={sliderImages} showBullets={true} showNavs={true} height={150} width='100%' />
      </div>
      <p>Number: {numberRoom}</p>
      <p>rentPerDay: {rentPerDay}</p>
      <p>rate: {rate}</p>
      <p>countReviews: {countReviews}</p>
    </Card>
  );
};

export default RoomCard;
