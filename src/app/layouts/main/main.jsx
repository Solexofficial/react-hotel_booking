import { Box, Container, Typography } from '@mui/material';
import React from 'react';
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
          <Typography align='right' className={classes.textWishes}>
            Лучшие номера для вашей работы, отдыха и просто вдохновения
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Main;
