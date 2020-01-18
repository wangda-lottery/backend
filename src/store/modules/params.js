/**
 * 平台参数 store.
 */
import request from '@/utils/request';

import {
  ParamActions
} from '../actionTypes';
import {
  ParamMutations
} from '../mutationTypes';

const params = {
  state: {
    params: {
      totalCount: 0,
      items: []
    }
  },

  getters: {
    params(state) {
      return state.params.items;
    }
  },

  mutations: {
    [ParamMutations.SetPlatParamList](state, payload) {
      state.params = payload.items;
    },
  },

  actions: {
    // 获取参数列表
    async [ParamActions.GetPlatParamList]({commit, getters}, payload) {
      const list = await request({
        url: '/params',
        method: 'get'
      });
      list.items.forEach(item => {
        if (item.type === 'switch') item.value = item.value !== '0';
      });

      commit(ParamMutations.SetPlatParamList, {items: list});
    },

    // 更新系统参数
    async [ParamActions.UpdatePlatParams]({commit, getters, state}, payload) {
      await request({
        url: `/params/${payload.id}`,
        method: 'put',
        data: payload,
      });
    }
  }
};

export default params;
