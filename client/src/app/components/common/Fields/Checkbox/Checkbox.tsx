import React from 'react';

type ConvertFn = {
  target: {
    name: string;
    value: boolean;
  };
};

type CheckboxTypes = {
  label?: string;
  labelDetails?: string;
  name: string;
  value?: string | boolean;
  onChange?: (cb: ConvertFn) => ConvertFn;
};

const Checkbox: React.FC<CheckboxTypes> = ({ label, labelDetails, name, value, onChange, ...rest }) => {
  const convertToDefEventParam = (name: string, value: boolean) => ({
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
        checked={!!value}
        name={name}
        value={value?.toString()}
        onChange={event => onChange && onChange(convertToDefEventParam(name, event.currentTarget.checked))}
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

export default React.memo(Checkbox);
