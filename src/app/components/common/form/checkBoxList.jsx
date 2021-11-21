import React from 'react';

const CheckBoxList = ({ children, onChange, value }) => {
  return (
    <ul className='checkbox-list'>
      {React.Children.map(children, child => {
        const config = {
          onChange: onChange,
          value: value || '',
          ...child.props,
        };
        return <li className='checkbox-list__item'>{React.cloneElement(child, config)}</li>;
      })}
    </ul>
  );
};

export default CheckBoxList;
