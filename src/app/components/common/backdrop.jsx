import { Backdrop as MuiBackdrop } from '@mui/material';
import React from 'react';
import Loader from './loader';

const Backdrop = ({ open }) => {
  return (
    <MuiBackdrop open={open}>
      <Loader />
    </MuiBackdrop>
  );
};

export default Backdrop;
