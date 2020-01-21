/**
 * 会员充值 store。
 */
import {
  MemTopUpActions
} from '../actionTypes';
import {
  MemTopUpMutations
} from '../mutationTypes';
import {param, parseTime} from "../../utils/index";
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
      const data = Object.assign({}, payload);
      if (payload.queryTime && payload.queryTime[0]) {
        data['queryTimeStart'] = parseTime(payload.queryTime[0]);
        data['queryTimeEnd'] = parseTime(payload.queryTime[1]);
      }

      const memberTopUps = await request({
        url: `member-top-ups?` + param(data),
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
