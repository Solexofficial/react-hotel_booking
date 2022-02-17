import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import Page404 from '../components/pages/404Page';

const Login = React.lazy(() => import('../layouts/login'));
const Main = React.lazy(() => import('../layouts/main'));
const Profile = React.lazy(() => import('../layouts/profile'));
const Rooms = React.lazy(() => import('../layouts/rooms'));

export const userProfileRoutes = [
  { path: '/profile/booking', name: 'Мои бронирования', icon: StarBorderIcon },
  { path: '/profile/likes', name: 'Понравилось', icon: FavoriteBorderIcon },
  { path: '/profile/favorites', name: 'Избранное', icon: BookmarkBorderIcon },
];

export type RoutesNavType = {
  path: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

export const adminRoutes = [
  { path: '/profile/dashboard', name: 'Панель администратора', icon: AdminPanelSettingsIcon },
  { path: '/profile/booking', name: 'Мои бронирования', icon: StarBorderIcon },
  { path: '/profile/likes', name: 'Понравилось', icon: FavoriteBorderIcon },
  { path: '/profile/favorites', name: 'Избранное', icon: BookmarkBorderIcon },
];

export const navigationRoutes = [
  { path: '/rooms', name: 'Доступные номера' },
  { path: '/services', name: 'Услуги' },
  { path: '/vacancy', name: 'Вакансии' },
  { path: '/news', name: 'Новости' },
  { path: '/agreement', name: 'Соглашения' },
];

export const publicRoutes = [
  { path: '/', component: Main, exact: true },
  { path: '/login/:type?', component: Login, exact: true },
  { path: '/rooms/:roomId?/', component: Rooms, exact: true },
];

export const privateRoutes = [{ path: '/profile/:userId?/:route?', component: Profile, exact: true }];
