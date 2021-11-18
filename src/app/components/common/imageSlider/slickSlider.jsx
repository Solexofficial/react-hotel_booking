import React from 'react';
import Slider from 'react-slick';

const SlickSlider = ({ images, ...settings }) => {
  console.log(images);
  return (
    <Slider {...settings} className='room-card__gallery'>
      {images.map(img => (
        <img className='room-card__gallery-item' key={img.key} src={img.url} alt='roomsPhoto' />
      ))}
    </Slider>
  );
};

export default SlickSlider;
