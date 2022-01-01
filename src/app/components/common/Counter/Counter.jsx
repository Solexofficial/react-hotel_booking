import React, { useState, useEffect } from 'react';
import CircleButton from '../../ui/buttons/circleButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Counter = ({ name, label, value, min, max, onChange }) => {
  const [counterValue, setValue] = useState(+value || 0);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    onChange({ target: { name, value: +counterValue } });
  }, [counterValue, name]);

  const handleIncrease = () => {
    if (counterValue >= max) return;
    setValue(counterValue + 1);
  };
  const handleDecrease = () => {
    if (counterValue <= min) return;
    setValue(counterValue - 1);
  };

  return (
    <div className='counter-wrapper'>
      {label && <p className='counter-label'>{label}</p>}
      <div className='counter-buttons__wrapper'>
        <CircleButton variant='contained' size='small' aria-label='reduce' onClick={handleDecrease}>
          <RemoveIcon fontSize='small' />
        </CircleButton>
        <input className='counter-input' type='text' value={+counterValue} readOnly />
        <CircleButton variant='contained' size='small' aria-label='increase' onClick={handleIncrease}>
          <AddIcon fontSize='small' />
        </CircleButton>
      </div>
    </div>
  );
};

export default Counter;
