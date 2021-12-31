import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

const Tooltip = ({ children, title, placement = 'top' }) => {
  return (
    <MuiTooltip title={title} placement={placement} arrow>
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
