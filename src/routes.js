/**
 * Created by LzxHahaha on 2016/5/31.
 */

export default [
  {
    path: '/',
    component: require('./pages/index').default,
    childRoutes: [
      require('./pages/post/index'),
      require('./pages/user/index'),
      require('./pages/works/index'),
      {
        path: 'about',
        component: require('./pages/About').default
      }
    ]
  }
]