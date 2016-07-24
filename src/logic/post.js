/**
 * Created by LzxHahaha on 2016/7/24.
 */

import Request from "../utils/Request";

import {getToken} from './auth';

export async function getPostDetail(id) {
  return await Request.get(`${Request.URL.postDetail}/${id}`);
}

export async function publish(title, content, category) {
  await Request.post(Request.URL.postPublish, {title, content, category}, getToken());
}

export async function edit(id, title, content, category) {
  await Request.post(`${Request.URL.postEdit}/${id}`, {title, content, category}, getToken());
}

export async function getPostList(tag) {
  return await Request.get(Request.URL.postList, {tag});
}