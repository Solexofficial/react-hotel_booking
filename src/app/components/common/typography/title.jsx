import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Title = ({ children, component, variant, isBold, ...rest }) => {
  return (
    <Typography
      variant={variant || 'h2'}
      component={component || 'h2'}
      style={{ fontWeight: isBold ? '700' : '400' }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
