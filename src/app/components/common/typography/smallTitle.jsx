import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const SmallTitle = ({ children, isBold, upperCase, ...props }) => {
  return (
    <Typography
      {...props}
      variant='h3'
      component='h3'
      style={{
        fontSize: '16px',
        fontWeight: isBold ? '700' : '400',
        textTransform: upperCase ? 'uppercase' : 'capitalize',
        marginBottom: '5px',
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
