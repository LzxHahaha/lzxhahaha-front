/**
 * Created by LzxHahaha on 2016/5/31.
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

const middleWares = [
  thunkMiddleware,
];

const finalCreateStore = applyMiddleware(
  ...middleWares
)(createStore);

export default finalCreateStore(
  combineReducers({
    routing: routerReducer,
    session: require('./modules/session').default
  })
);