import React from 'react';
import Slider from 'react-slick';

const SlickSlider = ({ images, ...settings }) => {
  return (
    <Slider {...settings} className='room-card__gallery'>
      {images.map(img => (
        <div className='room-card__gallery-item'>
          <img className='room-card__gallery-item--img' key={img.key} src={img.url} alt='roomsPhoto' />
        </div>
      ))}
    </Slider>
  );
};

export default SlickSlider;
