/**
 * 系统 store。
 */
import request from '@/utils/request';

import {
  SystemActions
} from '../actionTypes';
import {
  SystemMutations
} from '../mutationTypes';

const modules = {
  state: {
    modules: {
      console: {
        name: '控制台模块',
        controllers: {}
      },
    },
  },

  getters: {
    modules(state) {
      return state.modules;
    }
  },

  mutations: {
    // 设置模块列表
    [SystemMutations.SetModuleList](state, payload) {
      state.modules = payload;
    },
  },

  actions: {
    // 获取模块列表
    async [SystemActions.GetModuleList]({commit, getters}, payload) {
      const modules = await request({
        url: `system/modules`,
        method: 'get'
      });

      commit(SystemMutations.SetModuleList, modules);
    },
  }
};

export default modules;
