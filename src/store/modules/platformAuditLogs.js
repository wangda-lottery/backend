/**
 * 平台审计日志 store。
 */
import request from '@/utils/request';
import {param, parseTime} from '@/utils';
import {
  PlatformAuditLogActions
} from '../actionTypes';
import {
  PlatAuditMutations
} from '../mutationTypes';

const platformAuditLogs = {
  state: {
    platformAuditLogs: {
      totalCount: 0,
      items: []
    },
  },

  getters: {
    platformAuditLogs(state) {
      return state.platformAuditLogs || [];
    },
  },

  mutations: {
    // 设置日志列表
    [PlatAuditMutations.SetAuditLogList](state, payload) {
      state.platformAuditLogs = payload;
    },

    // 设置控制器列表
    [PlatAuditMutations.SetControllerList](state, payload) {
      state.platformControllers = payload;
    },
  },

  actions: {
    // 获取日志列表
    async [PlatformAuditLogActions.GetAuditLogList]({commit, getters}, payload) {
      let data = Object.assign({}, payload);
      if (payload.createTime && payload.createTime[0] && payload.createTime[1]) {
        data.queryTimeStart = parseTime(payload.createTime[0]);
        data.queryTimeEnd = parseTime(payload.createTime[1]);
      }

      const platformAuditLogs = await request({
        url: `plat_audit_logs?${param(data)}`,
        method: 'get'
      });

      commit(PlatAuditMutations.SetAuditLogList, platformAuditLogs);
    },
  }
};

export default platformAuditLogs;
