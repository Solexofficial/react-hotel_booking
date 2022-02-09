import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

const Chip: React.FC<ChipProps> = ({ label, color, ...props }) => {
  return <MuiChip label={label} color={color || 'primary'} {...props} />;
};

export default Chip;
