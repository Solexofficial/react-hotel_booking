import { Card } from '@material-ui/core';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Footer from '../../components/common/footer/footer';
import Header from '../../components/common/header/header';
import ImageSlider from '../../components/common/imageSlider/slider';
import SearchRoomsForm from '../../components/ui/searchRoomsForm/searchRoomsForm';
import useStyles from './styles';

import slide1 from '../../assets/img/slide1.jpg';
import slide2 from '../../assets/img/slide2.jpg';
import slide3 from '../../assets/img/slide3.jpg';

const sliderImages = [{ url: slide3 }, { url: slide2 }, { url: slide1 }];

const Main = () => {
  const classes = useStyles();
  return (
    <>
      <ImageSlider
        images={sliderImages}
        style={{ position: 'absolute', top: 0, zIndex: -1 }}
        width='100%'
        height={900}
        autoPlay='true'
        slideDuration={3}
        autoPlayDelay={10}
      />
      <Header />
      <Container>
        <Box className={classes.contentWrapper}>
          <SearchRoomsForm />
          <Card className={classes.textWishes}>
            <Typography align='right'>Лучшие номера для вашей работы, отдыха и просто вдохновения</Typography>
          </Card>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Main;
