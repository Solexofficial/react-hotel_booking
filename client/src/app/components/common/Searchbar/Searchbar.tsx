import React from 'react';
import { InputField } from '../Fields';

type SearchbarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Searchbar: React.FC<SearchbarProps> = ({ value, onChange }) => {
  return (
    <InputField
      name='searchbar'
      label='Поиск'
      placeholder='Поиск по номеру...'
      value={value}
      onChange={onChange}
      style={{ flex: '1' }}
    />
  );
};

export default Searchbar;
