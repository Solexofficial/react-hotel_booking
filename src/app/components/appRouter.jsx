import React from 'react';
import { publicRoutes } from '../router/routes';
import { Switch, Route, Redirect } from 'react-router';

const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map(route =>
        route.path ? <Route path={route.path} component={route.component} exact={route.exact} key={route.path} /> : null
      )}
      <Redirect to='/' />
    </Switch>
  );
};

export default AppRouter;
