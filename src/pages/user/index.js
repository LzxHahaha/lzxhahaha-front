/**
 * Created by LzxHahaha on 2016/6/1.
 */

module.exports = {
  path: '/user',
  childRoutes: [
    {
      path: '/login',
      component: require('./Login').default
    },
    {
      path: '/register',
      component: require('./Register').default
    }
  ]
};