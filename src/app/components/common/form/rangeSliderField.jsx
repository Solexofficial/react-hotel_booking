import { Slider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import Text from '../typography/text';
import Title from '../typography/title';

const valuetext = value => {
  return `${value}₽`;
};

const RangeSliderField = ({ label, name, onChange, value, min, max, minDistance = 2000 }) => {
  const [sliderValue, setSliderValue] = useState(value);
  const [mouseState, setMouseState] = useState(null);

  const handleChange = useCallback(
    (event, newValue, activeThumb) => {
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], max - minDistance);
          setSliderValue([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setSliderValue([clamped - minDistance, clamped]);
        }
      } else {
        setSliderValue(newValue);
      }
    },
    [sliderValue, onChange]
  );

  useEffect(() => {
    if (mouseState === 'leave') {
      onChange({ target: { name, value: sliderValue } });
    }
  }, [mouseState]);

  console.log('render range slider');
  if (value) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
          <Title component='h3' variant='subtitle2' isBold>
            {label || 'Range Slider'}
          </Title>
          <Text component='span' variant='subtitle2' sx={{ fontSize: '12px' }}>
            {value[0]}&#8381; - {value[1]}&#8381;
          </Text>
        </Box>
        <Slider
          name={name}
          value={sliderValue}
          valueLabelFormat={valuetext}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          step={100}
          onMouseDown={() => setMouseState('hold')}
          onMouseUp={() => setMouseState('leave')}
        />
        <Text variant='subtitle2' component='p' sx={{ fontSize: '12px' }}>
          Стоимость за сутки пребывания в номере
        </Text>
      </Box>
    );
  }
  return <p>Loading...</p>;
};

export default React.memo(RangeSliderField);
