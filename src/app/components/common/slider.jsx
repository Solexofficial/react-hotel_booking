import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import slide1 from '../../assets/img/slide1.jpg';
import slide2 from '../../assets/img/slide2.jpg';
import slide3 from '../../assets/img/slide3.jpg';

const sliderImages = [{ url: slide3 }, { url: slide2 }, { url: slide1 }];

const ImageSlider = () => {
  return (
    <SimpleImageSlider
      images={sliderImages}
      width='100%'
      height={900}
      autoPlay='true'
      slideDuration={3}
      autoPlayDelay={10}
      style={{ position: 'absolute', top: 0, zIndex: -1 }}
    />
  );
};

export default ImageSlider;
