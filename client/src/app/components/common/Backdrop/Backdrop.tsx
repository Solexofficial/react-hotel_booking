import { Backdrop as MuiBackdrop, BackdropProps as MuiBackdropProps } from '@mui/material';
import React from 'react';
import Loader from '../Loader';

type BackdropProps = MuiBackdropProps & {
  isOpen: boolean;
};

const Backdrop: React.FC<BackdropProps> = ({ isOpen }) => {
  return (
    <MuiBackdrop open={isOpen}>
      <Loader />
    </MuiBackdrop>
  );
};

export default Backdrop;
