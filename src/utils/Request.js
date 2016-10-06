/**
 * Created by LzxHahaha on 2016/6/1.
 */

import URI from 'urijs';

import * as urls from '../configs/url';

export default class Request {
  static URL = urls;

  static async get(urlKey, params, header, host) {
    return await Request.request(urlKey, 'GET', params, header, host);
  }

  static async post(urlKey, params, header, host) {
    return await Request.request(urlKey, 'POST', params, header, host);
  }

  static async request(urlKey, method, params, header = null, host = urls.host) {
    if (!urlKey) {
      throw new Error('need url');
    }

    let url = host + urlKey;

    let options = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...header
      }
    };

    if (method === 'GET' && params) {
      url = URI(url).query(params).toString();
    }
    else if (method === 'POST' || method === 'PUT') {
      let body = {};
      for (let param in params) {
        body[param] = params[param];
      }
      options.body = JSON.stringify(body);
    }

    try {
      let response = await fetch(url, options);
      if (response.ok) {
        let json = await response.text();
        let jsonObj = JSON.parse(json);
        if (!jsonObj) {
          throw new Error("Wrong json: " + json);
        }
        else if (jsonObj.status === 1) {
          return jsonObj.data;
        }
        else {
          throw new Error(jsonObj.data || '未知错误');
        }
      }

      const message = response.status;
        throw new Error(message);
    }
    catch (error) {
      console.warn('[Request error]: URL:', url, 'message:', error.message);
      throw error;
    }
  }
}