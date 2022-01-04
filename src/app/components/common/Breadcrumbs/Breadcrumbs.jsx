import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink, Route, useHistory } from 'react-router-dom';

const breadcrumbsMap = {
  '/rooms': 'Доступные номера',
  '/profile': 'Мой профиль',
  '/profile/booking': 'Мои Бронирования',
  '/profile/likes': 'Понравилось',
  '/profile/favorites': 'Избранное',
  '/profile/edit': 'Редактировать профиль',
  '/profile/dashboard': 'Панель администратора',
};

const LinkRouter = props => <Link {...props} className='breadcrumbs-item' underline='hover' component={RouterLink} />;

const Breadcrumbs = () => {
  const history = useHistory();
  return (
    <div className='breadcrumbs'>
      <Route>
        {() => {
          const pathNames = history.location.pathname.split('/').filter(x => x);

          return (
            <MuiBreadcrumbs aria-label='breadcrumb'>
              <LinkRouter className='breadcrumbs-item' to='/'>
                Главная
              </LinkRouter>
              {pathNames.map((value, index) => {
                const last = index === pathNames.length - 1;
                const to = `/${pathNames.slice(0, index + 1).join('/')}`;

                return last ? (
                  <span className='breadcrumbs-item--last' key={to}>
                    {breadcrumbsMap[to] || pathNames[pathNames.length - 1]}
                  </span>
                ) : (
                  <LinkRouter to={to} key={to}>
                    {breadcrumbsMap[to]}
                  </LinkRouter>
                );
              })}
            </MuiBreadcrumbs>
          );
        }}
      </Route>
    </div>
  );
};

export default Breadcrumbs;
