/**
 * 商户 store。
 */
import request from '@/utils/request';
import {param} from "@/utils";

import {
  MchActions
} from '../actionTypes';
import {
  MchMutations
} from '../mutationTypes';

const merchants = {
  state: {
    merchants: {},
  },

  getters: {
    merchants(state) {
      return state.merchants;
    }
  },

  mutations: {
    // 设置商户列表
    [MchMutations.SetMchList](state, payload) {
      state.merchants = payload;
    },

    // 更新商户
    [MchMutations.UpdateMchInfo](state, payload) {
      state.merchants.items.forEach(item => {
        if (item.id === payload.id) {
          item.status = payload.status
        }
      })
    }
  },

  actions: {
    // 获取商户列表
    async [MchActions.GetMchList]({commit, getters, state}, payload) {
      const merchants = await request({
        url: `merchants?` + param(payload),
        method: 'get'
      });

      commit(MchMutations.SetMchList, merchants);
    },

    // 更新商户信息
    async [MchActions.UpdateMchInfo]({commit, getters, state},payload) {
      payload._method = 'put';

      await request({
        url: `merchants/${payload.id}`,
        method: 'post',
        data: payload
      });

      commit(MchMutations.UpdateMchInfo, payload);
    },

    // 更新商户通道权限
    async [MchActions.UpdateMchChl]({commit, getters, state},payload) {
      payload._method = 'put';
      payload.action = 'UpdateMchChannel';

      await request({
        url: `merchants/${payload.id}`,
        method: 'post',
        data: payload
      });

      commit(MchMutations.UpdateMchInfo, payload);
    },

    // 支付账户余额调整
    async [MchActions.TrimMchPaymentBalance]({commit, getters}, payload) {
      payload._method = 'put';
      payload.action = 'TrimMchPaymentBalance';

      return request({
        url: `merchants/${payload.id}`,
        method: 'post',
        data: payload
      });
    },

    // 代付账户余额调整
    async [MchActions.TrimMchEntrustBalance]({commit, getters}, payload) {
      payload._method = 'put';
      payload.action = 'TrimMchEntrustBalance';

      return request({
        url: `merchants/${payload.id}`,
        method: 'post',
        data: payload
      });
    },

    // 搜索商户
    async [MchActions.SearchMerchants](ctx, payload) {
      return request({
        url: `merchants/search?` + param(payload),
        method: 'get'
      });
    },

    // 创建商户
    async [MchActions.CreateMch]({commit, getters}, payload) {
      await request({
        url: 'merchants',
        method: 'post',
        data: payload
      });
    },

    // 回调测试
    async [MchActions.MchCallbackTest]({commit, getters}, payload) {
      return request({
        url: `merchants/${payload.id}/callback_test?${param(payload)}`,
        method: 'get',
        data: payload
      });
    },

    // 重置密码
    async [MchActions.ResetPassword]({commit, getters}, payload) {
      return request({
        url: `merchants/${payload.id}/reset_password?${param(payload)}`,
        method: 'get',
      });
    }
  }
};

export default merchants;
