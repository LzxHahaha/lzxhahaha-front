/**
 * Created by LzxHahaha on 2016/6/5.
 */
import { createAction, handleActions } from 'redux-actions';

import Request from '../../utils/Request';

const LOAD_DATA = 'app/session/load_data';

const initialState = null;

export default handleActions({
  [LOAD_DATA]: (state, action) => ({
    ...state,
    ...action.payload
  })
}, initialState);

const loadAction = createAction(LOAD_DATA);

export function autoLogin() {
  return (dispatch, getState) => {
    try {
      let token = window.localStorage.token;
      if (token) {
        // 增加尝试登录判断，失败就抛异常
        dispatch(loadAction({token}));
      }
    }
    catch (err) {
      window.localStorage.removeItem('token');
    }
  }
}

export function login(username, password) {
  return async (dispatch, getState) => {
    try {
      let data = await Request.post(Request.URL.login, {username, password});
      dispatch(loadAction({token: data.token}));
      window.localStorage.token = data.token;
    }
    catch (err) {
      throw err;
    }
  }
}

export function register(username, password) {
  return async (dispatch, getState) => {
    try {
      let data = await Request.post(Request.URL.register, {username, password});
      dispatch(loadAction({token: data.token}));
      window.localStorage.token = data.token;
    }
    catch (err) {
      throw err;
    }
  }
}