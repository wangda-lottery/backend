import Qs from 'qs';
import axios from 'axios';
import store from '@/store';
import Vue from 'vue';

import {UserActions} from "../store/actionTypes";

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 8000,
  withCredentials: true,
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }]
});

// HTTP请求拦截器
service.interceptors.request.use(
  (config) => {
    // 增加授权认证用的 Token
    if (store.getters.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.accessToken;
    }

    return config;
  },

  (error) => {
    // 错误处理
    console.error('API请求出错: ', error);
    Promise.reject(error);
  }
);

// HTTP响应拦截器
service.interceptors.response.use(
  async (response) => {
    if (!response) return store.dispatch(UserActions.UserLogout);

    if (response.status === 200 && !response.errorCode) {
      return response.data;
    }

    throw new Error(response.data.message);
  },

  async (error) => {
    console.log(error);
    if (!error.response) {
      throw new Error('网络异常，请刷新或重新登录!');
    }

    if (error.response.status === 403) {
      if (error.response.data && error.response.data.message) {
        Vue.prototype.$notify.error(error.response.data.message);
      }

      await store.dispatch(UserActions.UserLogout);
    } else {
      let message = null;

      try {
        message = error.response.data.message;
      } catch (err) {
        console.error(`解析REST请求错误消息出错: ${err.message}`);
      }

      throw new Error(message);
    }
  }
);

export default service
