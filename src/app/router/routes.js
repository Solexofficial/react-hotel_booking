import Login from '../layouts/login/login';
import Main from '../layouts/main/main';
import Rooms from '../layouts/rooms/rooms';
import Dashboard from '../layouts/dashboard';

import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const profileSettingsRoutes = [
  { path: '/profile', name: 'Редактировать профиль', icon: <SettingsIcon /> },
  { path: '/booking', name: 'Мои бронирования', icon: <StarBorderIcon /> },
  { path: '/likes', name: 'Понравилось', icon: <FavoriteBorderIcon /> },
  { path: '/favorites', name: 'Избранное', icon: <BookmarkBorderIcon /> },
];

export const navigationRoutes = [
  { path: '/rooms', name: 'Доступные номера' },
  { path: '/', name: 'Услуги' },
  { path: '/', name: 'Вакансии' },
  { path: '/', name: 'Новости' },
  { path: '/', name: 'Соглашения' },
];

export const publicRoutes = [
  { path: '/login/:type?', component: Login },
  { path: '/rooms/:roomId?/', component: Rooms },
  { path: '/', component: Main, exact: true },
];

export const privateRoutes = [{ path: '/dashboard', component: Dashboard, exact: true }];
