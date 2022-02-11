import React from 'react';

type RoomsFiltersItemProps = {
  title?: string;
  children: React.ReactNode;
};

const RoomsFiltersItem: React.FC<RoomsFiltersItemProps> = ({ title, children }) => {
  return (
    <div className='filters__item'>
      <fieldset className='filters__group'>
        {title && <legend className='filters__group-title'>{title}</legend>}
        {children}
      </fieldset>
    </div>
  );
};

export default React.memo(RoomsFiltersItem);
