import { Box } from '@mui/system';
import React from 'react';
import Header from '../components/common/header';
import { Container } from '@mui/material';
import SimpleImageSlider from 'react-simple-image-slider';
import slide1 from '../assets/img/slide1.jpg';
import slide2 from '../assets/img/slide2.jpg';
import slide3 from '../assets/img/slide3.jpg';

const sliderImages = [{ url: slide3 }, { url: slide2 }, { url: slide1 }];

const Main = () => {
  return (
    <>
      <Header />
      <SimpleImageSlider
        images={sliderImages}
        width='100%'
        height={900}
        autoPlay='true'
        slideDuration={3}
        autoPlayDelay={10}
        style={{ position: 'absolute', top: 0, zIndex: -1 }}
      />
      <Box sx={{ height: 830, position: 'absolute', top: 0, zIndex: -1 }}>
        {/* <img src={slide3} alt='main' sx={{ maxHeight: '100%' }} /> */}
      </Box>
      <Container>
        <h1>Main</h1>
      </Container>
    </>
  );
};

export default Main;
