import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoImage from './logoImage';

const Logo = () => {
  return (
    <NavLink to='/' className='logo-link'>
      <LogoImage viewBox='0 0 40 40' />
      <h2 className='logo-title'>Toxin</h2>
    </NavLink>
  );
};

export default Logo;
