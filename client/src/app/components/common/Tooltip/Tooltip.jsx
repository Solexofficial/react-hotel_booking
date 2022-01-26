import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

const Tooltip = ({ children, title, placement = 'top', ...props }) => {
  return (
    <MuiTooltip title={title} placement={placement} arrow {...props}>
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
