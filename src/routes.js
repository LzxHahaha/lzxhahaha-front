/**
 * Created by LzxHahaha on 2016/5/31.
 */

import Index from './pages/Index';
import * as Post from './pages/post';
import * as User from './pages/user';
import * as Works from './pages/works';
import About from './pages/About';
import Resume from './pages/Resume';

export default [
  {
    path: '/',
    component: Index,
    childRoutes: [
      Post,
      User,
      Works,
      {
        path: 'about',
        component: About
      },
      {
        path: 'resume',
        component: Resume
      }
    ],
    notFound: Index
  }
]