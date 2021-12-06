import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import AppRouter from './components/appRouter';
import theme from './theme';
import './scss/app.scss';
import AuthProvider from './hooks/useAuth';
import { ToastContainer } from 'react-toastify';

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
