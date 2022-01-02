import { Backdrop as MuiBackdrop } from '@mui/material';
import React from 'react';
import Loader from '../Loader';

const Backdrop = ({ isOpen }) => {
  return (
    <MuiBackdrop open={isOpen}>
      <Loader />
    </MuiBackdrop>
  );
};

export default Backdrop;
