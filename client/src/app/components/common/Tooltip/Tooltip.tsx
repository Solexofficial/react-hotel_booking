import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

const Tooltip: React.FC<TooltipProps> = ({ children, title, placement = 'top', ...props }) => {
  return (
    <MuiTooltip title={title} placement={placement} arrow {...props}>
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
