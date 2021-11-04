import { Button, Typography } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';

const NumberField = ({ name, label, data, setData }) => {
  const handleDecrease = () => {
    setData(prevState => ({
      ...prevState,
      [name]: prevState[name] > 0 ? +prevState[name] - 1 : 0,
    }));
  };

  const handleIncrease = () => {
    setData(prevState => ({
      ...prevState,
      [name]: +prevState[name] + 1,
    }));
  };

  return (
    <Box sx={{ mt: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
        {label}
      </Typography>
      <Box sx={{ minWidth: '120px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          sx={{ width: 30, height: 30, borderRadius: '50%', minWidth: 30 }}
          variant='contained'
          aria-label='reduce'
          onClick={handleDecrease}
        >
          <RemoveIcon fontSize='small' />
        </Button>
        <span style={{ margin: '0 15px', minWidth: '25px', textAlign: 'center' }}>{data[name]}</span>
        <Button
          sx={{ width: 30, height: 30, borderRadius: '50%', minWidth: 30 }}
          variant='contained'
          aria-label='increase'
          onClick={handleIncrease}
        >
          <AddIcon fontSize='small' />
        </Button>
      </Box>
    </Box>
  );
};

export default NumberField;
