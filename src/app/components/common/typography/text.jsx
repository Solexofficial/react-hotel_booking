import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const Text = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};
Text.propTypes = {
  children: PropTypes.node,
};
export default Text;
