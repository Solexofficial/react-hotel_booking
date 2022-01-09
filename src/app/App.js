import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './hooks';
import './scss/app.scss';
import theme from './theme';
import { loadRoomsList } from './store/rooms';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRoomsList());
  }, []);
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
