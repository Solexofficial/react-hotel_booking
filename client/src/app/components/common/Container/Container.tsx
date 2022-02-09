import { Container as MuiContainer, ContainerProps } from '@mui/material';
import React from 'react';

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return <MuiContainer {...rest}>{children}</MuiContainer>;
};

export default Container;
