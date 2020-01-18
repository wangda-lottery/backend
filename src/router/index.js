import Vue from 'vue'
import Router from 'vue-router'
import {StaffRoles} from "../utils";

Vue.use(Router);

/**
 * 顶级容器。
 */
import AppContainer from '../views/container/AppContainer';

/**
 * 公用菜单定义。无需要权限即可访问。
 */
export const generalRoutes = [
  {
    path: '/',
    component: AppContainer,
    redirect: 'dashboard',
    alwaysShow: true,
    meta: {title: '数据简报', icon: 'area-chart', noCache: false},
    children: [
      {
        path: 'dashboard',
        name: 'PaymentDashboard',
        meta: {title: '数据看板', icon: 'dashboard', noCache: false},
        component: () => import('@/views/reports/dashboard'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/lock',
    name: 'Lock',
    component: () => import('@/views/login/lock'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errors/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errors/404'),
    hidden: true,
  },
];

/**
 * 动态菜单定义，根据不同权限获取。
 */
export const permissionRoutes = [
  {
    path: '/lottery',
    component: AppContainer,
    redirect: 'top_up',
    meta: {title: '抽奖管理', icon: 'users', noCache: false},
    alwaysShow: true,
    children: [{
      path: 'top_up',
      component: () => import('@/views/lottery/top_up'),
      name: 'TopUp',
      meta: {
        title: '会员充值',
        icon: 'users',
        noCache: false,
        roles: [StaffRoles.fi, StaffRoles.cs, StaffRoles.gu]
      },
    }, {
      path: 'draws',
      component: () => import('@/views/lottery/draws'),
      name: 'Draw',
      meta: {
        title: '抽奖记录',
        icon: 'tree',
        noCache: false,
        roles: [StaffRoles.fi, StaffRoles.cs]
      },
    }]
  }, {
    path: '/platform',
    component: AppContainer,
    redirect: 'admin',
    meta: {title: '平台管理', icon: 'setting', noCache: false},
    alwaysShow: true,
    children: [{
      path: 'accounts',
      component: () => import('@/views/system/accounts'),
      name: 'Accounts',
      meta: {
        title: '账户',
        icon: 'user',
        noCache: false,
        roles: [StaffRoles.su]
      }
    }, {
      path: 'params',
      component: () => import('@/views/system/params'),
      name: 'SystemParams',
      meta: {
        title: '参数',
        icon: 'sliders',
        noCache: false,
        roles: [StaffRoles.cs]
      }
    }, {
      path: 'plat_audit_logs',
      component: () => import('@/views/system/audit_logs'),
      name: 'PlatAuditLogs',
      hidden: true,
      meta: {
        title: '审计日志',
        icon: 'audit',
        noCache: false,
        roles: [StaffRoles.cs]
      }
    }, {
      path: '/settings',
      component: () => import('@/views/system/settings'),
      name: 'Settings',
      hidden: true,
      meta: {
        title: '应用设置',
        icon: 'audit',
        noCache: false
      },
    }]
  },
];

export default new Router({
  routes: generalRoutes
})
