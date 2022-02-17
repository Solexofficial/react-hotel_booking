import React from 'react';
import Container from '../../common/Container';
import Footer from '../../common/Footer';
import Header from '../../common/Header';

const Page404 = () => {
  return (
    <>
      <Header />
      <Container>
        <main>
          <h1>404 Страница не найдена :(</h1>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Page404;
