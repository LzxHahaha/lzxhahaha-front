/**
 * Created by LzxHahaha on 2016/6/8.
 */

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import routes from './routes';

import {autoLogin} from './logic/auth';

// history.listen(location => console.log(location));

function renderRouter(routes) {
  return routes.map((el, index) => {
    return (
      <Route key={`route_${el.path}_${index}`} path={el.path}>
        <IndexRoute component={el.component} />
        {el.childRoutes && renderRouter(el.childRoutes)}
      </Route>
    )
  });
}

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
      <Router history={browserHistory}>
        {
          renderRouter(routes)
        }
      </Router>
    );
  }
}