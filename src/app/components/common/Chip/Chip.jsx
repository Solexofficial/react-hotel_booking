import React from 'react';
import { Chip as MuiChip } from '@mui/material';

const Chip = ({ label, color, ...props }) => {
  return <MuiChip label={label} color={color || 'primary'} {...props} />;
};

export default Chip;
