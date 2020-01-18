/**
 * 配置 store。含本地与全局配置。
 */
import {
  SettingActions
} from '../actionTypes';

const SETTINGS_LC_KEY = 'application-settings';

// 获取本地缓存配置
function readLocalSettingsCache() {
  let settings = localStorage[SETTINGS_LC_KEY];
  if (settings) return JSON.parse(settings);

  return {};
}

// 保存本地缓存配置
function saveLocalSettingsCache(settings) {
  localStorage[SETTINGS_LC_KEY] = JSON.stringify(settings);
}

// 清理本地缓存配置
function clearLocalSettingsCache() {
  localStorage.removeItem(SETTINGS_LC_KEY);
}

const settings = {
  state: {
    settings: {
      initialized: false,

      // 通用设置
      general: {
        enableMemberTopUpPrompt: {
          title: '会员充值语音播报',
          value: true,
          type: 'boolean'
        },
        memberTopUpPromptInterval: {
          title: '会员充值播报间隔',
          value: 50,
          min: 30,
          max: 100,
          unit: '秒',
          type: 'number'
        },
        mchOrderAutoRefreshInterval: {
          title: '支付订单自动刷新',
          value: 30,
          min: 30,
          max: 100,
          unit: '秒',
          type: 'number'
        },
        entrustWithdrawOrderAutoRefresh: {
          title: '代付订单自动刷新',
          value: false,
          type: 'boolean'
        },
      }
    }
  },

  getters: {
    settings(state) {
      if (!state.settings.initialized) {
        let cached = readLocalSettingsCache();
        if (cached.general) {
          state.settings.general = cached.general;
        }

        state.settings.initialized = true;
      }

      return state.settings;
    },
  },

  actions: {
    // 保存设置
    [SettingActions.SaveSettings]({getters}) {
      saveLocalSettingsCache(getters.settings);
    },

    // 清除设置
    [SettingActions.ClearSettings]() {
      clearLocalSettingsCache();
    },
  },
};

export default settings;
