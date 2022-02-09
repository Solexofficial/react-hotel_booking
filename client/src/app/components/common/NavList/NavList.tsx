import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutesNavType } from '../../../router/routes';

type NavListProps = {
  label?: string;
  direction?: 'row' | 'column';
  routes: RoutesNavType[];
  [x: string]: any;
};

const NavList: React.FC<NavListProps> = ({ label, routes, direction = 'row', ...rest }) => {
  return (
    <nav {...rest}>
      {label && <h3>{label}</h3>}
      <ul className='nav-wrapper' style={{ flexDirection: direction }}>
        {routes.map(route => (
          <li key={route.name} className='nav-item'>
            <NavLink className='nav-item__link' to={route.path}>
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
