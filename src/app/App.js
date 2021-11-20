import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import AppRouter from './components/appRouter';
import theme from './theme';
import './scss/app.scss';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
