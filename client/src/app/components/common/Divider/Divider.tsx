import { Divider as MuiDivider, DividerProps } from '@mui/material';
import React from 'react';

const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <MuiDivider {...props} />;
};

export default Divider;
