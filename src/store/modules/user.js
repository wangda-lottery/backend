/**
 * 用户 Store。
 */
import router from '@/router';
import request from '@/utils/request';
import {param, StaffRoles} from "../../utils";

import {
  UserActions,
} from '../actionTypes';

import {
  UserMutations
} from '../mutationTypes';

const USER_INFO_LC_KEY = 'UserInfo';

// 获取本地缓存信息
function getLocalUserInfo() {
  let userInfo = localStorage[USER_INFO_LC_KEY];
  if (userInfo) return JSON.parse(userInfo);

  return null;
}

// 清理本地用户缓存
function clearLocalUserInfo() {
  localStorage.removeItem(USER_INFO_LC_KEY);
}

const user = {
  state: {
    // 系统用户列表
    users: {
      items: [],
      _meta: {}
    },

    // 当前登录用户信息
    userInfo: {
      id: undefined,
      username: undefined,
      headimgUrl: '',
      roles: [StaffRoles.gu],
      accessToken: '',

      platform: {}
    }
  },

  getters: {
    users(state) {
      return state.users;
    },

    userInfo(state) {
      // 若是id为空，从本地存储中读取一次
      if (!state.userInfo.id) state.userInfo = getLocalUserInfo();

      // 默认访客权限
      if (state.userInfo && !state.userInfo.roles) state.userInfo.roles = ['gu'];

      return state.userInfo;
    },

    isLogin(state, getters) {
      return getters.userInfo && getters.userInfo.id;
    },

    isSu(state, getters) {
      return getters.userInfo.roles && getters.userInfo.roles.includes('su');
    },

    isDev(state, getters) {
      return getters.userInfo.roles && getters.userInfo.roles.includes('dev');
    },

    accessToken(state, getters) {
      return getters.userInfo ? getters.userInfo.accessToken : null;
    }
  },

  mutations: {
    // 设置列表
    [UserMutations.SetUserList](state, payload) {
      state.users = payload;
    },

    // 设置用户信息
    [UserMutations.SetUserInfo](state, userInfo) {
      state.userInfo = userInfo;

      localStorage[USER_INFO_LC_KEY] = JSON.stringify(userInfo);
    }
  },

  actions: {
    // 获取列表
    async [UserActions.GetUserList]({dispatch, commit}, payload) {
      const users = await request({
        url: `users?${param(payload)}`,
        method: 'get',
      });

      commit(UserMutations.SetUserList, users);
    },

    // 登录
    async [UserActions.UserLogin]({dispatch, commit}, payload) {
      const userInfo = await request({
        url: 'users/login',
        method: 'post',
        data: {
          username: payload.username.trim(),
          password: payload.password
        }
      });

      userInfo.roles = userInfo.role.split(',');
      commit(UserMutations.SetUserInfo, userInfo);
    },

    // 获取用户信息
    async [UserActions.GetUserInfo]({getters, commit}) {
      if (!getters.isLogin) return;

      const userInfo = await request({
        url: `users/${getters.userInfo.id}`,
        method: 'get',
      });

      userInfo.roles = userInfo.role.split(',');
      commit(UserMutations.SetUserInfo, userInfo);
    },

    // 退出
    async [UserActions.UserLogout]({commit, state}) {
      document.title = '客服管理系统';

      request({
        url: 'users/logout',
        method: 'get'
      });

      commit(UserMutations.SetUserInfo, {});
      clearLocalUserInfo();

      router.push({name: 'Login'});
    },

    // 锁屏
    async [UserActions.UserLock]() {
      await request({
        url: 'users/lock',
        method: 'get'
      });
    },

    // 解锁
    async [UserActions.UserUnlock](context, payload) {
      await request({
        url: 'users/unlock',
        method: 'post',
        data: payload
      });
    },

    // 清理缓存
    async [UserActions.ClearCache]() {
      clearLocalUserInfo();
    },

    // 更新密码
    async [UserActions.UpdatePwd]({getters}, payload) {
      await request({
        url: 'users/update_pwd',
        method: 'post',
        data: {
          password: payload.password.trim(),
          newPassword: payload.newPassword.trim(),
          confirmPassword: payload.confirmPassword.trim(),
        }
      });
    },
  }
};

export default user;
