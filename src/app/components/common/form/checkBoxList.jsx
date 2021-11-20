import React from 'react';

const CheckBoxList = ({ children }) => {
  return (
    <ul className='checkbox-list'>
      {React.Children.map(children, child => {
        return <li className='checkbox-list__item'>{child}</li>;
      })}
    </ul>
  );
};

export default CheckBoxList;
