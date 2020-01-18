/**
 * 报表 store。
 */
import request from "../../utils/request";
import {ReportActions} from '../actionTypes';
import {ReportMutations} from '../mutationTypes';

const reports = {
  state: {
    reports: {
      totalTopUpCountYesterday: 0,
      drawCountToday: 0,
      drawExportedAmountToday: 0,
      drawExportedAmountTotal: 0
    },
  },

  getters: {
    reports(state) {
      return state.reports;
    },
  },

  mutations: {
    // 更新报表数据
    [ReportMutations.SetSummary](state, payload) {
      state.reports = payload;
    },
  },

  actions: {
    // 获取
    async [ReportActions.GetSummary]({commit, state}, payload) {
      let reports = await request({url: '/reports'});

      commit(ReportMutations.SetSummary, reports);
    },
  }
};

export default reports;
