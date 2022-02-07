import React, { useMemo } from 'react';
import RoomsFilterItem from '../RoomsFiltersItem';

const RoomsFiltersList = ({ handleChange, data, children }) => {
  console.log('filters list render');
  const clonedElements = React.Children.map(children, child => {
    const childType = typeof child.type;
    let config = {};
    if (
      childType === 'object' ||
      (childType === 'function' && child.props.type !== 'submit' && child.props.type !== 'button')
    ) {
      config = {
        ...child.props,
        data,
        onChange: handleChange,
        value: data[child.props.name],
      };
    }

    return <RoomsFilterItem title={child.props.title}>{React.cloneElement(child, config)}</RoomsFilterItem>;
  });

  return <form className='filters__form'>{clonedElements}</form>;
};

export default React.memo(RoomsFiltersList);
