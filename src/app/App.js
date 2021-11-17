import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import AppRouter from './components/appRouter';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
