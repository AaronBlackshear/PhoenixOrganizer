import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../../components/LoginForm';
import SignUp from '../../components/SignUpForm';

const LoggedOutRoutes = () => (
  <Switch>
    <Route path="/sign-up" component={SignUp} />
    <Route exact path="/" component={SignIn} />
  </Switch>
);

export default LoggedOutRoutes;
