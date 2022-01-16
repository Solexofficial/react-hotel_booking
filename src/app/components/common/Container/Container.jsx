import { Container as MuiContainer } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return <MuiContainer disableGutters>{children}</MuiContainer>;
};
Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
export default Container;
