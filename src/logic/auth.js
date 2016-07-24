/**
 * Created by LzxHahaha on 2016/7/24.
 */

import Request from "../utils/Request";

let token = window.localStorage.token || null;
let userInfo = null;

export function getMyInfo() {
  return userInfo;
}

export function getToken() {
  return token ? {'X-Token': token} : null;
}

export function isLogin() {
  return !!userInfo;
}

export function isAdmin() {
  return userInfo && userInfo.isAdmin;
}

export async function autoLogin() {
  try {
    if (token) {
      userInfo = await Request.post(Request.URL.info, null, getToken());
    }
  }
  catch (err) {
    window.localStorage.removeItem('token');
  }
}

export async function login(username, password) {
  try {
    let data = await Request.post(Request.URL.login, {username, password});
    console.warn(1, token);
    token = data.token;
    window.localStorage.token = data.token;
    await autoLogin();
  }
  catch (err) {
    throw err;
  }
}

export async function register(username, password) {
  try {
    let data = await Request.post(Request.URL.register, {username, password});
    token = data.token;
    window.localStorage.token = data.token;
    await autoLogin();
  }
  catch (err) {
    throw err;
  }
}
