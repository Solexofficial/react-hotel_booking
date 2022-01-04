import Login from '../layouts/login';
import Main from '../layouts/main';
import Rooms from '../layouts/rooms';
import Profile from '../layouts/profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const userProfileRoutes = [
  { path: '/profile', name: 'Профиль', icon: <AccountCircleIcon /> },
  { path: '/profile/booking', name: 'Мои бронирования', icon: <StarBorderIcon /> },
  { path: '/profile/likes', name: 'Понравилось', icon: <FavoriteBorderIcon /> },
  { path: '/profile/favorites', name: 'Избранное', icon: <BookmarkBorderIcon /> },
];

export const adminRoutes = [
  { path: '/profile', name: 'Профиль', icon: <AccountCircleIcon /> },
  { path: '/profile/dashboard', name: 'Панель администратора', icon: <AdminPanelSettingsIcon /> },
  { path: '/profile/booking', name: 'Мои бронирования', icon: <StarBorderIcon /> },
  { path: '/profile/likes', name: 'Понравилось', icon: <FavoriteBorderIcon /> },
  { path: '/profile/favorites', name: 'Избранное', icon: <BookmarkBorderIcon /> },
];

export const navigationRoutes = [
  { path: '/rooms', name: 'Доступные номера' },
  { path: '/services', name: 'Услуги' },
  { path: '/vacancy', name: 'Вакансии' },
  { path: '/news', name: 'Новости' },
  { path: '/agreement', name: 'Соглашения' },
];

export const publicRoutes = [
  { path: '/login/:type?', component: Login },
  { path: '/rooms/:roomId?/', component: Rooms },
  { path: '/', component: Main, exact: true },
];

export const privateRoutes = [{ path: '/profile/:route?', component: Profile, exact: true }];
