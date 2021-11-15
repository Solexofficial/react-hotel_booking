import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Title from '../typography/title';
import LogoImage from './logoImage';

const useStyles = makeStyles(theme => ({
  LinkLogo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
  },

  LogoTitle: {
    '&.MuiTypography-root': {
      textTransform: 'uppercase',
      marginLeft: '13px',
      flexGrow: 1,
    },
  },
}));

const Logo = () => {
  const classes = useStyles();
  return (
    <NavLink to='/' className={classes.LinkLogo}>
      <LogoImage viewBox='0 0 40 40' />
      <Title variant='h6' component='h2' className={classes.LogoTitle}>
        Toxin
      </Title>
    </NavLink>
  );
};

export default Logo;
