import Vue from 'vue'

import Cookies from 'js-cookie';
import VuePreview from 'vue-preview';

import '@/styles/index.scss';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-photo-preview/dist/skin.css';

import './icons';
import './permission';

import App from './App'
import Element from 'element-ui';
import VueClipboard from 'vue-clipboard2';
import VueNativeNotification from 'vue-native-notification';
import preview from 'vue-photo-preview'
import router from './router'
import store from './store'
import i18n from './lang';
import common from './utils/common';

import * as filters from './filters';

VueClipboard.config.autoSetContainer = true;
Vue.config.productionTip = true;

Vue.use(preview);
Vue.use(VueClipboard);
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
});

Vue.use(VueNativeNotification, {
  // Automatic permission request before
  // showing notification (default: true)
  requestOnNotify: true
});

Vue.use(common);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// 错误处理
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm, info, a) {
    // Don't ask me why I use Vue.nextTick, it just a hack.
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      });

      console.error(err, info)
    });
  }
}

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
