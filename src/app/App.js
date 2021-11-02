import React from 'react';
import AppRouter from './components/appRouter';
import '../app/styles/app.scss';
import Container from './components/common/container/container';
const App = () => {
  return (
    <>
      <Container>
        <AppRouter />
      </Container>
    </>
  );
};

export default App;
