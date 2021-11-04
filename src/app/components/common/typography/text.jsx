import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const Text = ({ children, ...props }) => {
  return (
    <Typography sx={{ fontSize: '14px' }} {...props}>
      {children}
    </Typography>
  );
};
Text.propTypes = {
  children: PropTypes.node,
};
export default Text;
