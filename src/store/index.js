import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';

import app from './modules/app';
import audioPlayer from './modules/audioPlayer';
import platformAdmins from './modules/platformAdmins';
import platformAuditLogs from './modules/platformAuditLogs';
import merchants from './modules/merchants';
import memTopUps from './modules/member_top_ups';
import draws from './modules/draws';
import permission from './modules/permission';
import settings from './modules/settings';
import system from './modules/system';
import tagsView from './modules/tagsView';
import user from './modules/user';
import platStaffRoles from './modules/platStaffRoles';
import params from './modules/params';
import platNotifications from './modules/platNotifications';
import report from './modules/report';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    audioPlayer,
    draws,
    memTopUps,
    merchants,
    settings,
    system,
    tagsView,
    permission,
    platStaffRoles,
    platformAdmins,
    platformAuditLogs,
    params,
    platNotifications,
    report,
    user,
  },

  getters
});

export default store;
