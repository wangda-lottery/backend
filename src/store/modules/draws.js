/**
 * 抽奖记录 store。
 */
import {
  DrawActions
} from '../actionTypes';
import {
  DrawMutations,
} from '../mutationTypes';
import {param} from "../../utils/index";
import request from "../../utils/request";

const draws = {
  state: {
    draws: {
      items: [],
      _meta: {}
    },
  },

  getters: {
    draws(state) {
      return state.draws;
    }
  },

  mutations: {
    // 设置列表
    [DrawMutations.SetDrawList](state, payload) {
      state.draws = payload;
    },
  },

  actions: {
    // 获取列表
    async [DrawActions.GetDrawList]({commit, getters}, payload) {
      const draws = await request({
        url: `draws?` + param(payload),
        method: 'get',
        data: payload
      });

      commit(DrawMutations.SetDrawList, draws);
    },

    // 删除
    async [DrawActions.DeleteItem]({commit, getters}, payload) {
     await request({url: `draws/${payload.id}`, method: 'delete'});
    },

    // 派头
    async [DrawActions.Dispatch]({commit, getters}, payload) {
     await request({url: `draws/export`, method: 'post'});
    },
  }
};

export default draws;
