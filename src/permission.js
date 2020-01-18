/**
 * 路由权限逻辑。
 */
import router from './router';
import store from './store';
import NProgress from 'nprogress';                      // progress bar
import {getToken} from '@/utils/auth';                  // getToken from cookie
import 'nprogress/nprogress.css';                       // progress bar style
import {
  RouterActions
} from './store/actionTypes';

NProgress.configure({showSpinner: true});       // NProgress Configuration

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (store.getters.isLogin) {
    if (to.path === '/login') {
      next({path: '/'});

      NProgress.done();
    } else {
      if (!store.getters.routerGenerated) {

        // 根据权限，添加菜单
        const allowedRoutes = await store.dispatch(RouterActions.GenerateRoutes);
        router.addRoutes(allowedRoutes);

        // hack方法 确保addRoutes已完成
        next({...to, replace: true});
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`);

      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
