import React from 'react';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

type BadgeProps = MuiBadgeProps & {
  className: string;
};

const Badge: React.FC<BadgeProps> = ({ children, className, ...rest }) => {
  return (
    <MuiBadge className={className} {...rest}>
      {children}
    </MuiBadge>
  );
};

export default Badge;
