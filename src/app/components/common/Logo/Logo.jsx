import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ToxinLogo } from '../../../assets/svg/logo.svg';

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <NavLink to='/' className='logo-link'>
        <ToxinLogo />
        <h2 className='logo-title'>Toxin</h2>
      </NavLink>
    </div>
  );
};

export default Logo;
