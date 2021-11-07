import { Button as MuiButton } from '@mui/material';
import React from 'react';

const Button = ({ size, color, variant, onClick, children, ...rest }) => {
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
