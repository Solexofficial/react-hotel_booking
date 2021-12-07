import { Slider } from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import Text from '../typography/text';
import Title from '../typography/title';
import Loader from '../../common/loader';
import { InputField } from './fields';

const valuetext = value => {
  return `${value}₽`;
};

const RangeSliderField = ({ label, name, description, onChange, value, min, max, minDistance = 1500 }) => {
  const [sliderValue, setSliderValue] = useState(value);

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
    [max, minDistance]
  );

  const handleInputChange = ({ target }) => {
    console.log(target.value);
    if (target.name === 'max') {
      onChange({ target: { name, value: [sliderValue[0], +target.value] } });
    }
    if (target.name === 'min') {
      onChange({ target: { name, value: [+target.value, sliderValue[1]] } });
    }
  };

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  if (value) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
          <Title component='h3' variant='subtitle2' isBold sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
            {label || 'Range Slider'}
          </Title>
          <Text component='span' variant='subtitle2' sx={{ fontSize: '12px' }}>
            {value[0]}&#8381; - {value[1]}&#8381;
          </Text>
        </div>
        <Slider
          name={name}
          value={sliderValue}
          valueLabelFormat={valuetext}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={min}
          max={max}
          step={100}
          onChangeCommitted={() => onChange({ target: { name, value: sliderValue } })}
        />
        <div className='range-slider__inputs' style={{ display: 'flex', gap: 10 }}>
          <InputField
            inputProps={{ min: min }}
            label='От'
            name='min'
            type='number'
            min={min}
            value={value[0]}
            onChange={handleInputChange}
          />
          <InputField
            name='max'
            label='До'
            type='number'
            inputProps={{ max: max }}
            value={value[1]}
            onChange={handleInputChange}
          />
        </div>

        {description && (
          <Text variant='subtitle2' component='p' sx={{ fontSize: '12px' }}>
            Стоимость за сутки пребывания в номере
          </Text>
        )}
      </div>
    );
  }
  return <Loader />;
};

export default React.memo(RangeSliderField);
