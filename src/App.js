/**
 * Created by LzxHahaha on 2016/6/8.
 */

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';

import store from './redux/store';
import {autoLogin} from './redux/modules/session';

import routes from './routes';

const history = syncHistoryWithStore(browserHistory, store);

// history.listen(location => console.log(location));

function renderRouter(routes : Array) {
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
  
  componentWillMount() {
    store.dispatch(autoLogin());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {
            renderRouter(routes)
          }
        </Router>
      </Provider>
    );
  }
}