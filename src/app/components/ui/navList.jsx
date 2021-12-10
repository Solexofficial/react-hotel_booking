import { Grid } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Title from '../common/typography/title';

// const useStyles = makeStyles(theme => ({
//   NavWrapper: {
//     '&.MuiGrid-root.MuiGrid-item': {
//       marginBottom: '10px',
//     },
//   },

//   NavTitle: {
//     '&.MuiTypography-root': {
//       marginBottom: '10px',
//       fontSize: '14px',
//       textTransform: 'uppercase',
//     },
//   },
//   NavLink: {
//     marginBottom: '5px',
//     textDecoration: 'none',
//     color: 'inherit',
//     fontSize: '14px',
//     '&:hover': {
//       color: '#1976d2',
//     },
//     transition: 'color 0.2s linear',
//   },
// }));

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
