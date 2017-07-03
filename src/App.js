/**
 * Created by LzxHahaha on 2016/6/8.
 */

import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import routes from './routes';
import Index from './pages/Index';

import { autoLogin } from './logic/auth';

function renderRouter(routes) {
  return routes.map((el, index) => {
    return (el.childRoutes && el.childRoutes > 0) ? (
      <Switch key={`route_${el.path}_${index}`}>
        <Route exact path={el.path} component={el.component} />
        { renderRouter(el.childRoutes) }
      </Switch>
    ) : (
      <Route exact key={`route_${el.path}_${index}`} path={el.path} component={el.component} />
    );
  });
}

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
          {
            renderRouter(routes)
          }
          <Route component={Index}/>
        </Switch>
      </Router>
    );
  }
}