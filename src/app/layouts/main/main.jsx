import { Card } from '@material-ui/core';
import { Container, Typography } from '@mui/material';
import React from 'react';
import Footer from '../../components/common/footer/footer';
import Header from '../../components/common/header/header';
import SearchRoomsForm from '../../components/ui/searchRoomsForm/searchRoomsForm';
import useStyles from './styles';

const Main = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <main className='main-home__page'>
        <Container>
          <div className='main-home__wrapper'>
            <h1 className='visually-hidden'>Поиск номеров в отеле</h1>
            <SearchRoomsForm />
            <p className='main__text-wishes'>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Main;
