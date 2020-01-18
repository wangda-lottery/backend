/**
 * 平台通知 store。
 */
import request from '@/utils/request';

import {
  PlatformNotificationActions
} from '../actionTypes';
import {
  PlatformNotificationMutations
} from '../mutationTypes';

const platNotifications = {
  state: {
    platNotifications: {
      totalCount: 0,
      items: []
    },
  },

  getters: {
    platNotifications(state) {
      return state.platNotifications;
    }
  },

  mutations: {
    // 设置通知列表
    [PlatformNotificationMutations.SetPlatNotifications](state, payload) {
      state.platNotifications = payload;
    },
  },

  actions: {
    // 获取通知列表
    async [PlatformNotificationActions.GetPlatNotifications]({commit, getters}, payload) {
      if (!getters.isLogin) return;

      const platNotifications = await request({
        url: `plat_notifications`,
        method: 'get'
      });

      commit(PlatformNotificationMutations.SetPlatNotifications, platNotifications);
    },

    // 设置为已读
    async [PlatformNotificationActions.SetPlatNotificationAsRead]({commit, getters}, payload) {
      const data = Object.assign({_method: 'put'}, payload);

      return request({
        url: `plat_notifications/${payload.id}`,
        method: 'post',
        data: data
      });
    }
  }
};

export default platNotifications;
