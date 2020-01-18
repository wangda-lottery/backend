/**
 * REST 客户端。
 */
import request from './request';
import {param} from "./index";

function generalRequest(url, method, payload) {
  return request({
    url: url,
    method: method,
    data: payload
  });
}

export default {
  read: function (url, payload) {
    return generalRequest(`${url}?${param(payload)}`, 'get');
  },

  create: function (url, payload) {
    return generalRequest(url, 'post', payload);
  },

  update: function (url, payload) {
    let data = Object.assign({}, payload);
    data._method = 'put';

    return generalRequest(url, 'post', data);
  },

  delete: function (url, payload) {
    let data = Object.assign({}, payload);
    data._method = 'delete';

    return generalRequest(url, 'post', payload);
  },

  doRequest(url, method, payload) {
    return generalRequest(url, method, payload);
  }
};
