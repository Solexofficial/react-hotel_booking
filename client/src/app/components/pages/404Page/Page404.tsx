import React from 'react';
import history from '../../../utils/history';
import Button from '../../common/Button';
import Container from '../../common/Container';
import Footer from '../../common/Footer';
import Header from '../../common/Header';

const Page404 = () => {
  const handleGoHome = () => {
    history.push('/');
  };

  return (
    <>
      <Header />
      <Container>
        <main className='main-page404'>
          <h2 className='page404__title'>404 Страница не найдена :(</h2>
          <Button className='page404__button' onClick={handleGoHome}>
            На главную
          </Button>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Page404;
