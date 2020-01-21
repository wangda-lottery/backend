/**
 * 抽奖记录 store。
 */
import {
  DrawActions
} from '../actionTypes';
import {
  DrawMutations,
} from '../mutationTypes';
import {param, parseTime} from "../../utils/index";
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
      const data = Object.assign({}, payload);
      if (payload.queryTime && payload.queryTime[0]) {
        data['queryTimeStart'] = parseTime(payload.queryTime[0]);
        data['queryTimeEnd'] = parseTime(payload.queryTime[1]);
      }

      const draws = await request({
        url: `draws?` + param(data),
        method: 'get',
        data: payload
      });

      commit(DrawMutations.SetDrawList, draws);
    },

    // 删除
    async [DrawActions.DeleteItem]({commit, getters}, payload) {
     await request({url: `draws/${payload.id}`, method: 'delete'});
    },

    // 手动派送
    async [DrawActions.ManualDispatch]({commit, getters}, payload) {
      console.log(payload)
     await request({url: `draws/${payload.id}`, method: 'put'});
    },

    // 自动派送
    async [DrawActions.Dispatch]({commit, getters}, payload) {
     await request({url: `draws/export`, method: 'post'});
    },
  }
};

export default draws;
