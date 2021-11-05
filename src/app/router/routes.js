import Login from '../layouts/login/login.jsx';
import Main from '../layouts/main/main.jsx';
import Rooms from '../layouts/rooms';
import Dashboard from '../layouts/dashboard';

export const publicRoutes = [
  { path: '/login/:type?', component: Login, exact: true },
  { path: '/rooms', component: Rooms, exact: true },
  { path: '/', component: Main, exact: true },
];

export const privateRoutes = [{ path: '/dashboard', component: Dashboard, exact: true }];
