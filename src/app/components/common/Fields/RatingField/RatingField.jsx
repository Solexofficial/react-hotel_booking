import React, { useState } from 'react';
import Rating from '../../Rating';

const labels = {
  1: 'Разочарован',
  2: 'Удовлетворительно',
  3: 'Хорошо',
  4: 'Отлично',
  5: 'Великолепно',
};

const RatingField = ({ name, label, value, onChange, ...rest }) => {
  const [hover, setHover] = useState(-1);

  return (
    <div className='rating-wrapper' role='group'>
      <legend className='rating-label'>{label}</legend>
      <Rating
        name={name}
        value={value}
        {...rest}
        onChange={onChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <div className='rating-feedback'>{labels[hover !== -1 ? hover : value]}</div>}
    </div>
  );
};

export default RatingField;
