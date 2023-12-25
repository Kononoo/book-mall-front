import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例，===> new VueRouter()
// 1. history模式: createWebHistory()   http://xxx/user
// 2. hash模式: createWebHashHistory()  http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path

// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/Layout/Layout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/body/LayoutHome.vue')
        },
        {
          path: 'address',
          name: 'address',
          component: () => import('@/views/body/LayoutAddress.vue')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/views/body/LayoutOrder.vue')
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('@/views/body/LayoutDetail.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/body/LayoutCart.vue')
        },
        {
          path: 'category/:id',
          name: 'category',
          component: () => import('@/views/body/LayoutCategory.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/Login.vue')
    },
    // 管理员后台页面
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/Admin/Layout/Layout.vue'),
      redirect: '/admin/category',
      children: [
        {
          path: 'category',
          component: () => import('@/views/Admin/Category/Category.vue'),
          meta: { title: '图书分类' }
        },
        {
          path: 'book',
          component: () => import('@/views/Admin/Book/Book.vue'),
          meta: { title: '图书管理' }
        },
        {
          path: 'order',
          component: () => import('@/views/Admin/Order/Order.vue'),
          meta: { title: '订单管理' }
        },
        {
          path: 'user/profile',
          component: () => import('@/views/Admin/User/UserProfile.vue'),
          meta: { title: '用户管理' }
        },
        {
          path: 'user/avatar',
          component: () => import('@/views/Admin/User/UserAvatar.vue'),
          meta: { title: '用户管理' }
        },
        {
          path: 'user/password',
          component: () => import('@/views/Admin/User/UserPassword.vue'),
          meta: { title: '用户管理' }
        }
      ]
    }
  ]
})

// 跳转路由后返回顶部
router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  next()
})

// 路由守卫，管理页面只能管理员进
// router.beforeEach((to, from, next) => {
//   // 检查是否是访问 /admin 下的页面
//   if (to.path.startsWith('/admin')) {
//     // 检查用户角色是否为管理员
//     const userStore = useUserStore()
//     if (userStore.user && userStore.user.role === 1) {
//       // 用户角色为管理员，放行
//       next()
//     } else {
//       // 用户角色不是管理员，可以根据需求进行跳转或其他处理
//       next('/') // 重定向到首页，你也可以跳转到登录页或其他页面
//     }
//   } else {
//     next()
//   }
// })

export default router
