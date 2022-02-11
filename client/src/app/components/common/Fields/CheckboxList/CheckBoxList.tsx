import React, { PropsWithChildren, ReactElement } from 'react';

type CheckBoxListTypes = {
  children: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLFormElement>;
  data?: {
    [key: string]: any;
  };
  title?: string;
};

type CheckboxItemProps = {
  name: string;
  data?: {
    [key: string]: any;
  };
  value?: string;
  error?: string;
  type?: string;
  props?: {
    [key: string]: any;
  };
  onChange?: (e: React.ChangeEvent<HTMLFormElement>) => void;
  onKeyDown?: (e: React.ChangeEvent<HTMLFormElement>) => void;
};

const CheckBoxList: React.FC<CheckBoxListTypes> = ({ children, onChange, data }) => {
  return (
    <ul className='checkbox-list'>
      {React.Children.map(children, child => {
        const item = child as ReactElement<PropsWithChildren<CheckboxItemProps>>;
        const config = {
          onChange,
          value: (data && data[item.props.name]) || '',
          ...item.props,
        };
        return <li className='checkbox-list__item'>{React.cloneElement(item, config)}</li>;
      })}
    </ul>
  );
};

export default CheckBoxList;
