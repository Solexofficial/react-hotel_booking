import React from 'react';
import { publicRoutes, privateRoutes } from '../router/routes';
import { Switch, Route, Redirect } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const AppRouter = () => {
  const { currentUser } = useAuth();

  return (
    <Switch>
      {publicRoutes.map(route =>
        route.path ? <Route path={route.path} component={route.component} exact={route.exact} key={route.path} /> : null
      )}
      {currentUser &&
        privateRoutes.map(route =>
          route.path ? (
            <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
          ) : null
        )}
      <Redirect to={currentUser ? '/' : 'login/signIn'} />
    </Switch>
  );
};

export default AppRouter;
