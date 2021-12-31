import { Grid } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavList = ({ label, routes, direction = 'row', spacing, ...rest }) => {
  return (
    <Grid container component='nav' direction={direction} spacing={spacing} {...rest}>
      {label && <h3>{label}</h3>}
      {routes.map(route => (
        <Grid item key={route.name} className='nav-item'>
          <NavLink className='nav-item__link' to={route.path}>
            {route.name}
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default NavList;
