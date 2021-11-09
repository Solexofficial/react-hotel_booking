import { makeStyles } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';
import React from 'react';
import CircleButton from '../../ui/buttons/circleButton';
import SmallTitle from '../typography/smallTitle';

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

const NumberField = ({ name, label, value, setData, fieldName }) => {
  const classes = useStyle();

  const handleIncrease = () => {
    setData(prevState => {
      return {
        ...prevState,
        [fieldName]: { ...prevState[fieldName], [name]: { ...prevState[fieldName][name], value: value + 1 } },
      };
    });
  };

  const handleDecrease = () => {
    setData(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        [name]: { ...prevState[fieldName][name], value: value > 0 ? value - 1 : 0 },
      },
    }));
  };

  return (
    <Box className={classes.root}>
      <SmallTitle variant='subtitle2'>{label}</SmallTitle>
      <Box className={classes.btnGroup}>
        <CircleButton variant='contained' size='small' aria-label='reduce' onClick={handleDecrease}>
          <RemoveIcon fontSize='small' />
        </CircleButton>
        <span className={classes.count}>{value}</span>
        <CircleButton variant='contained' size='small' aria-label='increase' onClick={handleIncrease}>
          <AddIcon fontSize='small' />
        </CircleButton>
      </Box>
    </Box>
  );
};

export default NumberField;
