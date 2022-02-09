import React from 'react';
import Slider, { CustomArrowProps, Settings as SlickSettings } from 'react-slick';
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

function NextButton({ onClick }: CustomArrowProps) {
  return (
    <button className='slick-arrow slick-arrow--next' onClick={onClick}>
      <ChevronRightIcon />
    </button>
  );
}

function PrevButton({ onClick }: CustomArrowProps) {
  return (
    <button className='slick-arrow slick-arrow--before' onClick={onClick}>
      <ChevronLeftIcon />
    </button>
  );
}

type ImageSliderProps = {
  children: React.ReactNode | React.ReactNode[];
  settings?: SlickSettings;
  [x: string]: any;
};

const ImageSlider: React.FC<ImageSliderProps> = ({ children, ...settings }) => {
  return (
    <Slider {...defaultSettings} {...settings}>
      {children}
    </Slider>
  );
};

export default ImageSlider;
