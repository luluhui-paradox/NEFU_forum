export default [
  //注册页面
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  //登录页面
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  //主页
  {
    path: '/',
    name: 'Home',
    alias: '/topics',
    component: () => import('@/views/Home')
  },
  //个人信息页面
  {
    path: '/users/1/edit',
    component: () => import('@/views/users/Edit.vue'),
    children: [
      //个人信息
      {
        path: '',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile.vue'),
        meta: { auth: true }
      },
      //修改头像，这是后续要加的功能
      // {
      //   path: '/users/1/edit_avatar',
      //   name: 'EditAvatar',
      //   component: () => import('@/views/users/Avatar.vue'),
      //   meta: { auth: true }
      // },
      //修改密码
      {
        path: '/users/1/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password.vue'),
        meta: { auth: true }
      }
    ]
  },
  //帖子模块
  //创建帖子
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
  //编辑帖子
  {
    path: '/articles/:articleId/edit',
    name: 'Edit',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
  //用户专栏模块
 {
  path: '/:user',
  component: () => import('@/views/articles/Column'),
    children: [
      //用户帖子列表
      {
        path: '',
        name: 'Column',
        component: () => import('@/views/articles/List.vue')
      },
      //用户帖子内容
      {
        path: '/articles/:articleId/content',
        name: 'Content',
        component: () => import('@/views/articles/Content.vue')
      }
    ]
  },
]
