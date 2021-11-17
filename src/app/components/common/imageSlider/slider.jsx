import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

const ImageSlider = ({ images, ...rest }) => {
  return <SimpleImageSlider images={images} {...rest} />;
};

export default ImageSlider;
