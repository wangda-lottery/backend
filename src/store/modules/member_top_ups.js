/**
 * 会员充值 store。
 */
import {
  MemTopUpActions
} from '../actionTypes';
import {
  MemTopUpMutations
} from '../mutationTypes';
import {param} from "../../utils/index";
import request from "../../utils/request";

const memberTopUps = {
  state: {
    memberTopUps: {
      items: [],
      _meta: {}
    },
  },

  getters: {
    memberTopUps(state) {
      return state.memberTopUps;
    }
  },

  mutations: {
    // 设置会员列表
    [MemTopUpMutations.SetMemList](state, payload) {
      state.memberTopUps = payload;
    },
  },

  actions: {
    // 获取会员列表
    async [MemTopUpActions.GetMemList]({commit, getters}, payload) {
      const memberTopUps = await request({
        url: `member-top-ups?` + param(payload),
        method: 'get',
        data: payload
      });

      commit(MemTopUpMutations.SetMemList, memberTopUps);
    },

    // 搜索会员
    async [MemTopUpActions.SearchMembers]({commit, getters}, payload) {
      return request({
        url: `member-top-ups/search?` + param(payload),
        method: 'get',
      });
    },

    // 导入数据
    async [MemTopUpActions.ImportData]({commit, getters}, payload) {
      return request({
        url: `member-top-ups/import`,
        method: 'post',
        data: payload
      });
    },
  }
};

export default memberTopUps;
