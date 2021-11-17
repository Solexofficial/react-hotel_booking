import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';

const Checkbox2 = ({ name, label, labelDescription, value, color, onChange, ...rest }) => {
  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <>
      <FormControlLabel
        style={{ alignItems: 'flex-start' }}
        control={
          <Checkbox
            name={name}
            color={color || 'primary'}
            checked={value}
            onChange={e => onChange(convertToDefEventParam(name, e.target.checked))}
            style={{ padding: '0 10px' }}
            {...rest}
          />
        }
        label={
          labelDescription ? (
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ fontWeight: 700 }}>{label}</div>
              <div className='label-description' style={{ fontSize: '12px', color: 'rgba(31,32,65,0.5)' }}>
                {labelDescription}
              </div>
            </div>
          ) : (
            <div>{label}</div>
          )
        }
      />
    </>
  );
};

export default Checkbox2;
