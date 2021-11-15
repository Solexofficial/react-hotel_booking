import Login from '../layouts/login/login';
import Main from '../layouts/main/main';
import Rooms from '../layouts/rooms/rooms';
import Dashboard from '../layouts/dashboard';

export const publicRoutes = [
  { path: '/login/:type?', component: Login },
  { path: '/rooms/:search?/', component: Rooms },
  { path: '/', component: Main, exact: true },
];

export const privateRoutes = [{ path: '/dashboard', component: Dashboard, exact: true }];
