/**
 * Created by LzxHahaha on 2016/6/1.
 */

import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from './Login';
// import Register from './Register';

export default  [
  <Route path="/user" exact component={() => <Redirect to="/"/>} />,
  <Route path="/user/login" exact component={Login}/>,
];
