import React from 'react';

const Checkbox = ({ label, labelDetails, name, color, value, onChange, ...rest }) => {
  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <label className='checkbox'>
      <input
        className='visually-hidden checkbox__input'
        type='checkbox'
        name={name}
        value={value}
        onChange={e => onChange(convertToDefEventParam(name, e.target.checked))}
        {...rest}
      />
      <div className='checkbox__indicator'>
        <div className='checkbox__mark'></div>
      </div>
      <div className={labelDetails ? 'checkbox__description--with-details' : 'checkbox__description'}>
        {label}
        {labelDetails && <p className='checkbox__details'>{labelDetails}</p>}
      </div>
    </label>
  );
};

export default Checkbox;
