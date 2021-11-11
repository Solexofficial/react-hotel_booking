import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function valuetext(value) {
  return `${value} °C`;
}

const minDistance = 2000;

const RangeSliderField = () => {
  const [value, setValue] = React.useState([5000, 10000]);

  const handleChange = (event, newValue, activeThumb) => {
    console.log(newValue);
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 15000 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id='input-slider' gutterBottom>
        Диапазон цены
      </Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='auto'
          getAriaValueText={valuetext}
          min={0}
          max={15000}
          step={100}
          disableSwap
        />
      </Box>
    </Box>
  );
};

export default RangeSliderField;
