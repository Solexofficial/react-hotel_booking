import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Title = ({ children, isBold }) => {
  return (
    <Typography variant='h2' component='h2' style={{ fontSize: '24px', fontWeight: isBold ? '700' : '400' }}>
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
