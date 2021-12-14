import React from 'react';
import useMockData from '../../hooks/useMockData';
import Container from '../common/container';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import SearchRoomsForm from '../ui/forms/searchRoomsForm';
import { Paper } from '@mui/material';

const HomePage = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log('clicked');
    initialize();
  };

  return (
    <>
      <Header />
      <main className='main-home__page'>
        <Container>
          <div className='main-home__wrapper'>
            <h1 className='visually-hidden'>Поиск номеров в отеле toxin result school</h1>
            <Paper elevation={3} className='form-card searchRooms-form'>
              <h2>Найдём номера под ваши пожелания</h2>
              <SearchRoomsForm />
            </Paper>
            <p className='main__text-wishes'>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
          </div>
          <h3>Инициализация данных в FireBase</h3>
          <ul>
            <li>Status: {status}</li>
            <li>Progress: {progress}%</li>
            {error && <li>error: {error}</li>}
          </ul>
          <button className='btn btn-primary' onClick={handleClick}>
            Инициализировать
          </button>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
