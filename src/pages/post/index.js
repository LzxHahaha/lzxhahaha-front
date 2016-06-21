/**
 * Created by LzxHahaha on 2016/5/31.
 */

module.exports = {
  path: 'post',
  component: require('./List').default,
  childRoutes: [
    {
      path: 'detail/:id',
      component: require('./Detail').default
    },
    {
      path: 'new',
      component: require('./New').default
    },
    {
      path: 'edit/:id',
      component: require('./Edit').default
    }
  ]
};