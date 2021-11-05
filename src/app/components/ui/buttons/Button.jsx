import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px',
  },
  label: {
    textTransform: 'none',
  },
}));

const Button = ({ size, color, variant, onClick, children, ...rest }) => {
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...rest}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
