/**
 * Created by LzxHahaha on 2016/6/8.
 */

import * as React from "react";
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Index from './pages/Index';
import Post from './pages/post';
import User from './pages/user';
import About from './pages/About';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';

import { autoLogin } from './logic/auth';

const history = createBrowserHistory();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  async componentWillMount() {
    await autoLogin();
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/about" exact component={About}/>
          <Route path="/resume" exact component={Resume}/>
          {Post}
          {User}
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}