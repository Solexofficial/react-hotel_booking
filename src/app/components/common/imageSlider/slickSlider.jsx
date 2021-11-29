import React from 'react';
import Slider from 'react-slick';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const defaultSettings = {
  dots: true,
  nextArrow: <NextButton />,
  prevArrow: <PrevButton />,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function NextButton({ onClick }) {
  return (
    <button className='slick-arrow slick-arrow--next' onClick={onClick}>
      <ChevronRightIcon />
    </button>
  );
}

function PrevButton({ onClick }) {
  return (
    <button className='slick-arrow slick-arrow--before' onClick={onClick}>
      <ChevronLeftIcon />
    </button>
  );
}

const SlickSlider = ({ children, ...settings }) => {
  return (
    <Slider {...defaultSettings} {...settings}>
      {children}
    </Slider>
  );
};

export default SlickSlider;
