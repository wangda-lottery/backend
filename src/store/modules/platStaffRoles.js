/**
 * 平台角色 store。
 */
import {param} from "@/utils";
import request from '@/utils/request';

import {
  PlatformStaffRoleActions
} from '../actionTypes';
import {
  PlatformStaffRoleMutations
} from '../mutationTypes';

const platStaffRoles = {
  state: {
    platStaffRoles: {
      totalCount: 0,
      items: []
    },
  },

  getters: {
    // 角色列表
    platStaffRoles(state) {
      return state.platStaffRoles;
    },

    platStaffRoleTagType(state) {
      return (role) => {
        for(let i = 0; i < state.platStaffRoles.items.length; ++i) {
          if (state.platStaffRoles.items[i].role === role) return state.platStaffRoles.items[i].tagType;
        }

        return 'info';
      }
    }
  },

  mutations: {
    // 设置角色列表
    [PlatformStaffRoleMutations.SetStaffRoleList](state, payload) {
      state.platStaffRoles = payload;
    },
  },

  actions: {
    // 获取角色列表
    async [PlatformStaffRoleActions.GetStaffRoleList]({commit, getters}, payload) {
      if (getters.platStaffRoles.items.length > 0) return;

      const platStaffRoles = await request({
        url: `plat_staff_roles?${param(payload)}`,
        method: 'get'
      });
      commit(PlatformStaffRoleMutations.SetStaffRoleList, platStaffRoles);
    },
  }
};

export default platStaffRoles;
