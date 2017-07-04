/**
 * Created by LzxHahaha on 2016/6/1.
 */

import * as React from "react";
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
// import Register from './Register';

export default (
  <Switch>
    <Route exact path="/user/login" component={Login}/>
  </Switch>
);
