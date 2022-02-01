import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Link as RouterLink, Route } from 'react-router-dom';
import { getRoomById } from '../../../store/rooms';
import { getUserById } from '../../../store/users';

const UserBreadcrumb = props => {
  const user = useSelector(getUserById(props.match.params.userId));
  return <span>{`${user.firstName} ${user.secondName}`}</span>;
};

const RoomBreadcrumb = props => {
  const room = useSelector(getRoomById(props.match.params.roomId));
  return <span>Номер №{room.roomNumber}</span>;
};

const UserRouteBreadcrumb = props => {
  const route = props.match.params.route;

  let breadcrumbText;
  switch (route) {
    case 'booking':
      breadcrumbText = 'Мои бронирования';
      break;
    case 'dashboard':
      breadcrumbText = 'Панель администратора';
      break;
    case 'likes':
      breadcrumbText = 'Понравилось';
      break;
    case 'favorites':
      breadcrumbText = 'Избранное';
      break;
    case 'edit':
      breadcrumbText = 'Редактировать профиль';
      break;

    default:
      breadcrumbText = '';
      break;
  }
  return <span>{breadcrumbText}</span>;
};

const routeConfig = [
  {
    path: '/',
    breadcrumb: 'Главная',
  },
  {
    path: '/rooms',
    breadcrumb: 'Доступные номера',
  },
  {
    path: '/rooms/:roomId?',
    breadcrumb: RoomBreadcrumb,
  },
  {
    path: '/profile',
    breadcrumb: 'Профиль',
  },
  {
    path: '/profile/:userId?',
    breadcrumb: UserBreadcrumb,
  },
  {
    path: '/profile/:userId?/:route?',
    breadcrumb: UserRouteBreadcrumb,
  },
];

const LinkRouter = props => <Link {...props} className='breadcrumbs-item' underline='hover' component={RouterLink} />;

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumbs'>
      <Route>
        {() => {
          return (
            <MuiBreadcrumbs aria-label='breadcrumb'>
              {breadcrumbs.map(({ match, breadcrumb }, index) => {
                const last = index === breadcrumbs.length - 1;
                return last ? (
                  <span className='breadcrumbs-item--last' key={match.url}>
                    {breadcrumb}
                  </span>
                ) : (
                  <span key={match.url}>
                    <LinkRouter key={match.url} to={match.url}>
                      {breadcrumb}
                    </LinkRouter>
                  </span>
                );
              })}
            </MuiBreadcrumbs>
          );
        }}
      </Route>
    </div>
  );
};

export default withBreadcrumbs(routeConfig)(Breadcrumbs);
