/*********** Routes for applications **************/
import React from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import { Auth as auth } from '../auth';
import NotFound from '../components/NotFound';
import { frontLayout, dashboardLayout } from '../components/Layouts';
import Login from '../containers/Login';
import ForgotPassword from '../containers/ForgotPassword';
import Callback from '../containers/AuthCallback';

const Routers = store => {
  return (
    <div>
      <Switch>
        <AppRoute
          exact={true}
          path="/"
          component={Login}
          requireAuth={auth}
          layout={frontLayout}
          store={store}
          type="public"
        />

        <AppRoute
          exact={true}
          path="/forgot-password"
          component={ForgotPassword}
          requireAuth={auth}
          layout={frontLayout}
          store={store}
          type="public"
        />

        <AppRoute
          path="/callback"
          component={Callback}
          requireAuth={auth}
          layout={frontLayout}
          store={store}
          type="public"
        />

        <AppRoute
          exact
          path="/profile"
          //component={Profile}
          requireAuth={auth}
          layout={dashboardLayout}
          store={store}
        />

        <AppRoute
          exact
          path="*"
          component={NotFound}
          requireAuth={auth}
          layout={frontLayout}
          store={store}
          type="public"
        />
      </Switch>
    </div>
  );
};

export default Routers;
