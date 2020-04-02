import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged i
  const hasToken = getToken()

   if (hasToken) {
    //如果已登录
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // 如果已经登录,直接指向主页面
      next({ path: '/' })
      NProgress.done()
    } else {
      //如果要去别的页面
      // determine whether the user has obtained his permission roles through getInfo
      // 通过getInfo来决定用户是否获得他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 如果有roles身份.继续下一步
        //store.dispatch('student/getStudentBasic',{uid:5})
        //store.dispatch('student/getStudentProject',{uid:5})
        //store.dispatch('student/getStudentEducation',{uid:5})
        //store.dispatch('student/getStudentScore',{uid:5})
        next()
      } else {
        // 如果没有roles身份
        try {
          // 尝试getInfo获取roles
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // roles必须是一个数组对象
          const data = await store.dispatch('user/getInfo')

          const roleType = data.userRole
          let roles
          if(roleType === 1 ) {
            roles = ['student']
          } else if(roleType === 2) {
            roles = ['tutor']
          } else if(roleType === 3) {
            roles = ['school']
          }
          
          // generate accessible routes map based on roles
          // 通过roles生成可访问的路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 动态添加可访问的路由表
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // hack方法 确保addRoutes已完成
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // 如果try失败了重新登录
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
