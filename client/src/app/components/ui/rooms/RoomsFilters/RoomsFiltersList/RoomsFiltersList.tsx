import React, { PropsWithChildren, ReactElement } from 'react';
import RoomsFilterItem from '../RoomsFiltersItem';

type RoomsFiltersListProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: { [key: string]: any };
  children: React.ReactNode;
};

type FilterItemProps = {
  name: string;
  title?: string;
  data?: {
    [key: string]: any;
  };
  value?: string;
  error?: string;
  type?: string;
  props?: {
    [key: string]: any;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RoomsFiltersList: React.FC<RoomsFiltersListProps> = ({ handleChange, data, children }) => {
  const clonedElements = React.Children.map(children, child => {
    const item = child as ReactElement<PropsWithChildren<FilterItemProps>>;
    const childType = typeof item;
    let config = {};
    if (
      childType === 'object' ||
      (childType === 'function' && item.props.type !== 'submit' && item.props.type !== 'button')
    ) {
      config = {
        ...item.props,
        data,
        onChange: handleChange,
        value: data[item.props.name],
      };
    }

    return <RoomsFilterItem title={item.props.title}>{React.cloneElement(item, config)}</RoomsFilterItem>;
  });

  return <form className='filters__form'>{clonedElements}</form>;
};

export default React.memo(RoomsFiltersList);
