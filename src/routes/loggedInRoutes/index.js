import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../components/Home';

const LoggedInRoutes = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default LoggedInRoutes;
