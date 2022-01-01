import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRouter from './components/appRouter';
import { AuthProvider } from './hooks';
import './scss/app.scss';
import theme from './theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default App;
