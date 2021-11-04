import React from 'react';
import Header from '../components/common/header';
import { Container } from '@mui/material';
import ImageSlider from '../components/common/slider';

const Main = () => {
  return (
    <>
      <Header />
      <ImageSlider />
      <Container>
        <h1>Main</h1>
      </Container>
    </>
  );
};

export default Main;
