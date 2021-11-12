import { Slider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Title from '../typography/title';
import Text from '../typography/text';

const valuetext = value => {
  return `${value}₽`;
};

const minDistance = 2000;

const RangeSliderField = () => {
  const [value, setValue] = useState([5000, 10000]);

  const handleChange = (event, newValue, activeThumb) => {
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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <Title component='h3' variant='subtitle2' isBold>
          Диапазон цены
        </Title>
        <Text component='span' variant='subtitle2' sx={{ fontSize: '12px' }}>
          {value[0]}&#8381; - {value[1]}&#8381;
        </Text>
      </Box>
      <Slider
        value={value}
        valueLabelFormat={valuetext}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={0}
        max={15000}
        step={100}
      />
      <Text variant='subtitle2' component='p' sx={{ fontSize: '12px' }}>
        Стоимость за сутки пребывания в номере
      </Text>
    </Box>
  );
};

export default RangeSliderField;
