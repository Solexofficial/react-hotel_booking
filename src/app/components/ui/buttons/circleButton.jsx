import { makeStyles } from '@material-ui/core';
import React from 'react';
import Button from './button';

const useStyles = makeStyles(theme => ({
  root: {
    '&.MuiButton-root': {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      minWidth: '30px',
    },
  },
}));

const CircleButton = ({ onClick, children, ...rest }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={classes.root} {...rest}>
      {children}
    </Button>
  );
};

export default CircleButton;
