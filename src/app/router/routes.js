import Login from '../layouts/login/login';
import Main from '../layouts/main/main';
import Rooms from '../layouts/rooms/rooms';
import Profile from '../layouts/profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const userProfileRoutes = [
  { path: '/profile', name: 'Профиль', icon: <AccountCircleIcon /> },
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
