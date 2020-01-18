/**
 * 管理员 store。
 */
import request from '@/utils/request';
import {param} from '@/utils';
import {
  AdminActions
} from '../actionTypes';
import {
  PlatAdminsMutations
} from '../mutationTypes';

const platformAdmins = {
  state: {
    admins: {
      totalCount: 0,
      items: []
    },
  },

  getters: {
    admins(state) {
      return state.admins || [];
    }
  },

  mutations: {
    // 设置管理员列表
    [PlatAdminsMutations.SetPlatAdminList](state, payload) {
      state.admins = payload;
    },

    // 更新管理员
    [PlatAdminsMutations.UpdatePlatAdmin](state, payload) {
    }
  },

  actions: {
    // 获取管理员列表
    async [AdminActions.GetPlatAdminList]({commit, getters}, payload) {
      const admins = await request({
        url: `plat_admins?${param(payload)}`,
        method: 'get'
      });

      commit(PlatAdminsMutations.SetPlatAdminList, admins);
    },

    // 添加管理员
    async [AdminActions.CreatePlatAdmin]({commit, getters}, payload) {
      return request({
        url: 'plat_admins',
        method: 'post',
        data: payload
      });
    },

    // 更新管理员
    async [AdminActions.UpdatePlatAdmin]({commit, getters}, payload) {
      payload._method = 'put';

      return request({
        url: `plat_admins/${payload.id}`,
        method: 'post',
        data: payload
      })
    },

    // 搜索管理员
    async [AdminActions.SearchAdmins]({commit, getters}, payload) {
      return request({
        url: `plat_admins/search?` + param(payload),
        method: 'get'
      });
    }
  }
};

export default platformAdmins;
