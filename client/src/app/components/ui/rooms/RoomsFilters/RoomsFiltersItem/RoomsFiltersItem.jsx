import React from 'react';

const RoomsFiltersItem = ({ title, children }) => {
  return (
    <div className='filters__item'>
      <fieldset className='filters__group'>
        {title && <legend className='filters__group-title'>{title}</legend>}
        {children}
      </fieldset>
    </div>
  );
};

export default RoomsFiltersItem;
