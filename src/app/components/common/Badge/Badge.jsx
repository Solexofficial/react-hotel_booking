import React from 'react';
import { Badge as MuiBadge } from '@mui/material';

const Badge = ({ children, ...props }) => {
  return <MuiBadge {...props}>{children}</MuiBadge>;
};

export default Badge;
