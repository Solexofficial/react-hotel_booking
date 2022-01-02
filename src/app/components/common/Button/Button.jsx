import { Button as MuiButton } from '@mui/material';
import React from 'react';

const Button = ({ size, color, variant, onClick, type, children, ...rest }) => {
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      type={type || 'default'}
      className={type === 'circle' ? 'button-circle' : 'button'}
      sx={{
        background: variant === 'outlined' ? 'transparent' : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
