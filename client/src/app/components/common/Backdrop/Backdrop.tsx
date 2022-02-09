import { Backdrop as MuiBackdrop, BackdropProps as MuiBackdropProps } from '@mui/material';
import React from 'react';
import Loader from '../Loader';

const Backdrop: React.FC<MuiBackdropProps> = ({ open }) => {
  return (
    <MuiBackdrop open={open || false}>
      <Loader />
    </MuiBackdrop>
  );
};

export default Backdrop;
