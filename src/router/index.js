import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/tdetail',
    component: Layout,
    redirect: '/tdetail/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tdetail/index'),
        name: 'Tdetail',
        meta: { title: '导师详情', icon: 'tab', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '学生简历',icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    redirect: '/chat/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/chat/index'),
        name: 'Chat',
        meta: { title: '聊天室',icon: 'peoples', noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // 一直显示跟路由
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/tutor',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tutor/index'),
        name: 'Tutor',
        meta: { title: '查看指导教师',roles: ['student'], icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: '我的简历及志愿', roles: ['student'], icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '个人简历填写',roles: ['student'], icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/view-students',
    component: Layout,
    redirect: '/view-students/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/view-students/index'),
        name: 'View-students',
        meta: { title: '查看待选学生',roles: ['tutor'], icon: 'peoples', noCache: true }
      }
    ]
  },
  {
    path: '/selected-students',
    component: Layout,
    redirect: '/selected-students/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/selected-students/index'),
        name: 'Selected-students',
        meta: { title: '查看学生进度',roles: ['tutor'], icon: 'people', noCache: true }
      }
    ]
  },
  {
    path: '/tedit',
    component: Layout,
    redirect: '/tedit/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tedit/index'),
        name: 'Tedit',
        meta: { title: '个人简历填写', roles: ['tutor'], icon: 'edit', noCache: true }
      }
    ]
  },
  {
    path: '/application-manage',
    component: Layout,
    redirect: '/application-manage/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/application-manage/index'),
        name: 'applicationManage',
        meta: { title: '学生志愿管理', roles: ['school'], icon: 'people', noCache: true }
      }
    ]
  },
  {
    path: '/students',
    component: Layout,
    redirect: '/students/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/students/index'),
        name: 'Students',
        meta: { title: '所有学生列表', roles: ['school'], icon: 'peoples', noCache: true }
      }
    ]
  },
  {
    path: '/tutors',
    component: Layout,
    redirect: '/tutors/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tutors/index'),
        name: 'Tutors',
        meta: { title: '所有导师列表', roles: ['school'], icon: 'peoples', noCache: true }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/manage/index'),
        name: 'Manage',
        meta: { title: '所有人员管理', roles: ['school'], icon: 'guide', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
