import Login from '../layouts/login';
import Main from '../layouts/main';
import Rooms from '../layouts/rooms';
import Dashboard from '../layouts/dashboard';

export const publicRoutes = [
  { path: '/login', component: Login, exact: true },
  { path: '/rooms', component: Rooms, exact: true },
  { path: '/', component: Main, exact: true },
];

export const privateRoutes = [{ path: '/dashboard', component: Dashboard, exact: true }];
