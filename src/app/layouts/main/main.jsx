import { Card } from '@material-ui/core';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Footer from '../../components/common/footer/footer';
import Header from '../../components/common/header/header';
import ImageSlider from '../../components/common/slider';
import SearchRoomsForm from '../../components/ui/searchRoomsForm/searchRoomsForm';
import useStyles from './styles';

const Main = () => {
  const classes = useStyles();
  return (
    <>
      <ImageSlider />
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
