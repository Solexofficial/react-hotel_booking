import React from 'react';

const CheckBoxList = ({ children, onChange, data }) => {
  return (
    <ul className='checkbox-list'>
      {React.Children.map(children, child => {
        const config = {
          onChange,
          value: (data && data[child.props.name]) || '',
          ...child.props,
        };
        return <li className='checkbox-list__item'>{React.cloneElement(child, config)}</li>;
      })}
    </ul>
  );
};

export default CheckBoxList;
