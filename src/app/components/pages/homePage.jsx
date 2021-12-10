import React from 'react';
import Container from '../common/container';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import SearchRoomsForm from '../ui/forms/searchRoomsForm';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className='main-home__page'>
        <Container>
          <div className='main-home__wrapper'>
            <h1 className='visually-hidden'>Поиск номеров в отеле toxin result school</h1>
            <SearchRoomsForm />
            <p className='main__text-wishes'>Лучшие номера для вашей работы, отдыха и просто вдохновения</p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
