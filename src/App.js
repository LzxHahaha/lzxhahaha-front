/**
 * Created by LzxHahaha on 2016/6/8.
 */

import * as React from "react";
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

// import routes from './routes';
import Index from './pages/Index';
import Post from './pages/post';
import User from './pages/user';
import About from './pages/About';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';

import { autoLogin } from './logic/auth';

// function renderRouter(routes) {
//   return routes.map((el, index) => {
//     return (el.childRoutes && el.childRoutes > 0) ? (
//       <Switch key={`route_${el.path}_${index}`}>
//         <Route exact path={el.path} component={el.component} />
//         { renderRouter(el.childRoutes) }
//       </Switch>
//     ) : (
//       <Route exact key={`route_${el.path}_${index}`} path={el.path} component={el.component} />
//     );
//   });
// }

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
          <Route exact path="/" component={Index}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/resume" component={Resume}/>
          { Post }
          { User }
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}