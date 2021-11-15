import { Grid } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Title from '../common/typography/title';

const useStyles = makeStyles(theme => ({
  footerNavTitle: {
    '&.MuiTypography-root': {
      marginBottom: '10px',
      fontSize: '14px',
      textTransform: 'uppercase',
    },
  },
  footerNavLink: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '14px',
    '&:hover': {
      color: '#1976d2',
    },
    transition: 'color 0.2s linear',
  },
}));

const NavList = ({ label, routes, direction = 'row' }) => {
  const classes = useStyles();
  return (
    <Grid container direction={direction}>
      {label && (
        <Title isBold component='h3' variant='subtitle2' className={classes.footerNavTitle}>
          {label}
        </Title>
      )}
      {routes.map(route => (
        <Grid key={route.name} item className='footer__list-item'>
          <NavLink to={route.path} className={classes.footerNavLink}>
            {route.name}
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default NavList;
