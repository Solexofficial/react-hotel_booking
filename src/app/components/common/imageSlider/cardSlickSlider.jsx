import React from 'react';
import Slider from 'react-slick';

const SlickSlider = ({ images, ...settings }) => {
  return (
    <Slider {...settings} className='room-card__gallery'>
      {images.map(img => (
        <div className='room-card__gallery-item' key={img.key}>
          <img className='room-card__gallery-item--img' src={img.url} alt='roomsPhoto' />
        </div>
      ))}
    </Slider>
  );
};

export default SlickSlider;
