import React, { Suspense } from 'react';
import { publicRoutes, privateRoutes } from '../routes';
import { Switch, Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users';

const AppRouter: React.FC = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <>
      <Switch>
        <Suspense fallback={<></>}>
          {isLoggedIn &&
            privateRoutes.map(route =>
              route.path ? (
                <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
              ) : null
            )}
          {publicRoutes.map(route =>
            route.path ? (
              <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
            ) : null
          )}
        </Suspense>
        <Redirect to={isLoggedIn ? '/' : 'login/signIn'} />
      </Switch>
    </>
  );
};

export default AppRouter;
