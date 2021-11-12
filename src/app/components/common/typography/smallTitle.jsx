import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const SmallTitle = ({ children, isBold, upperCase, ...props }) => {
  return (
    <Typography
      {...props}
      variant={props.variant || 'h3'}
      component={props.component || 'h3'}
      style={{
        fontSize: '14px',
        fontWeight: isBold ? '700' : '400',
        textTransform: upperCase ? 'uppercase' : 'capitalize',
      }}
    >
      {children}
    </Typography>
  );
};

SmallTitle.propTypes = {
  children: PropTypes.node,
};

export default SmallTitle;
