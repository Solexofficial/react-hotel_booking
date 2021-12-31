import { makeStyles } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';
import React from 'react';
import CircleButton from '../../ui/buttons/circleButton';

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnGroup: {
    minWidth: '120px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  count: {
    all: 'unset',
    margin: '0 15px',
    minWidth: '25px',
    textAlign: 'center',
    display: 'inline-block',
  },
}));

const NumberField = ({ name, label, value, onIncrease, onDecrease }) => {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <p>{label}</p>
      <Box className={classes.btnGroup}>
        <CircleButton variant='contained' size='small' aria-label='reduce' onClick={() => onDecrease(name)}>
          <RemoveIcon fontSize='small' />
        </CircleButton>
        <span className={classes.count}>{value}</span>
        <CircleButton variant='contained' size='small' aria-label='increase' onClick={() => onIncrease(name)}>
          <AddIcon fontSize='small' />
        </CircleButton>
      </Box>
    </Box>
  );
};

export default NumberField;
