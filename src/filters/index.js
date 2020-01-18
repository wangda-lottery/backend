/**
 * 全局过滤器。
 */
import {StaffRoles} from "../utils";

export {
  parseTime,
  formatTime
} from '../utils';

/**
 * 复数化。
 *
 * @param time
 * @param label
 */
function pluralize(time, label) {
  if (time === 1) return time + label;

  return time + label + '秒'
}

/**
 * 数字格式化。
 */
export function numberFormatter(num, digits) {
  const si = [
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'k'}
  ];

  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }

  return num.toString();
}

/**
 * 千位转化。
 */
export function toThousandFilter(num) {
  return (num + '' || '0.00').toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 银行卡格式化。
 */
export function formatBankCard(value) {
  return value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
}

/**
 * 会员银行卡状态。
 */
const MemBankCardStatus = {
  [0]: {
    text: '已禁用',
    tagType: 'danger'
  },
  [1]: {
    text: '使用中',
    tagType: 'success'
  },
  [10]: {
    text: '已匹配',
    tagType: 'primary'
  },
};

export function memBankCardStatusText(status) {
  return MemBankCardStatus[status].text;
}

export function memBankCardStatusTag(status) {
  return MemBankCardStatus[status].tagType;
}

/**
 * 商户支付订单状态。
 */
const MchPaymentOrderStatus = {
  [0]: {
    text: '待支付',
    tagType: 'info'
  },
  [2]: {
    text: '成功未回调',
    tagType: 'warning'
  },
  [3]: {
    text: '已成功',
    tagType: 'success'
  },
  [6]: {
    text: '催单中',
    tagType: 'primary'
  },
  [9]: {
    text: '已取消',
    tagType: 'danger'
  }
};

export function mchPaymentOrderText(status) {
  return MchPaymentOrderStatus[status].text;
}

export function mchPaymentOrderTagType(status) {
  return MchPaymentOrderStatus[status].tagType;
}

/**
 * 商户提现订单状态，含下发与代付。
 */
const MchWithdrawOrderStatus = {
  [0]: {
    text: '审核中',
    tagType: 'info'
  },
  [1]: {
    text: '已驳回',
    tagType: 'danger'
  },
  [2]: {
    text: '已完成',
    tagType: 'success'
  },
  [6]: {
    text: '争议中',
    tagType: 'danger'
  },
  [10]: {
    text: '打款中',
    tagType: 'primary'
  },
  [11]: {
    text: '已打款',
    tagType: 'warning'
  },
};

export function mchWithdrawOrderStatusText(status) {
  return MchWithdrawOrderStatus[status].text;
}

export function mchWithdrawOrderStatusType(status) {
  return MchWithdrawOrderStatus[status].tagType;
}

/**
 * 会员支付账户流水记录类型。
 */
const memPaymentBalanceLogTypes = {
  [10]: {
    text: '支付佣金',
    tagType: 'success'
  },
  [20]: {
    text: '会员充值',
    tagType: 'success'
  },
  [30]: {
    text: '管理员减少',
    tagType: 'danger'
  },
  [31]: {
    text: '管理员增加',
    tagType: 'success'
  },
  [40]: {
    text: '回款失败',
    tagType: 'success'
  },
  [50]: {
    text: '回款成功',
    tagType: 'success'
  },
  [60]: {
    text: '预回款',
    tagType: 'danger'
  },
  [70]: {
    text: '代理佣金',
    tagType: 'success'
  },
  [80]: {
    text: '余额转出',
    tagType: 'danger'
  },
  [90]: {
    text: '余额转入',
    tagType: 'success'
  },
};

export function memPaymentBalanceLogText(action) {
  return memPaymentBalanceLogTypes[action].text;
}

export function memPaymentBalanceLogType(action) {
  return memPaymentBalanceLogTypes[action].tagType;
}

/**
 * 会员代付账户流水记录类型。
 */
const memEntrustBalanceLogTypes = {
  [75]: {
    text: '代付代理佣金',
    tagType: 'success'
  },
  [76]: {
    text: '代付本金',
    tagType: 'success'
  },
  [77]: {
    text: '代付佣金',
    tagType: 'success'
  },
  [78]: {
    text: '账户提现',
    tagType: 'success'
  },
  [79]: {
    text: '提现驳回',
    tagType: 'success'
  },
  [100]: {
    text: '管理员增加',
    tagType: 'success'
  },
  [101]: {
    text: '管理员减少',
    tagType: 'success'
  },
};

export function memEntrustBalanceLogText(action) {
  return memEntrustBalanceLogTypes[action].text;
}

export function memEntrustBalanceLogTag(action) {
  return memEntrustBalanceLogTypes[action].tagType;
}

/**
 * 商户支付账户流水记录类型。
 */
const mchPaymentBalanceLogTypes = {
  [10]: {
    text: '订单成功',
    tagType: 'success'
  },
  [20]: {
    text: '商户下发',
    tagType: 'success'
  },
  [21]: {
    text: '下发驳回',
    tagType: 'success'
  },
  [22]: {
    text: '下发手续费',
    tagType: 'success'
  },
  [30]: {
    text: '代付账户充值',
    tagType: 'danger'
  },
  [31]: {
    text: '代付账户回退',
    tagType: 'danger'
  },
  [40]: {
    text: '管理员增加',
    tagType: 'success'
  },
  [41]: {
    text: '管理员减少',
    tagType: 'success'
  },
};

export function mchPaymentBalanceLogText(action) {
  return mchPaymentBalanceLogTypes[action].text;
}

export function mchPaymentBalanceLogType(action) {
  return mchPaymentBalanceLogTypes[action].tagType;
}


/**
 * 商户代理流水操作。
 */
const mchProxyBalanceLogAction = {
  [10]: {
    text: '订单成交',
    tagType: 'success'
  },
  [20]: {
    text: '代理提现',
    tagType: 'danger'
  },
  [30]: {
    text: '提现回退',
    tagType: 'success'
  }
};

export function mchProxyBalanceLogText(action) {
  return mchProxyBalanceLogAction[action].text;
}

export function mchProxyBalanceLogType(action) {
  return mchProxyBalanceLogAction[action].tagType;
}

/**
 * 员工角色。
 */
const StaffRoleMapping = {
  [StaffRoles.su]: {
    text: '管理员',
    tag: 'danger'
  },
  [StaffRoles.cs]: {
    text: '客服',
    tag: 'primary'
  },
  [StaffRoles.fi]: {
    text: '财务',
    tag: 'success'
  },
  [StaffRoles.gu]: {
    text: '访客',
    tag: 'info'
  }
};

export function staffRolesText(roles) {
  if (!roles) return '';

  return roles.split(',').map(item => StaffRoleMapping[item].text).join(',');
}

// v-html无法将el-tag转换为span，所以直接把元素在此写入
export function staffRolesTag(roles) {
  if (!roles) return '';

  return roles.split(',').map(
    role => {
      return `<span class="el-tag el-tag--${StaffRoleMapping[role].tag} el-tag--small">${StaffRoleMapping[role].text}</span>`;
    }
  ).join('&nbsp;');
}

/**
 * 审计日志操作类型
 */
const AuditLogActionTypes = {
  ['save']: {
    text: 'save',
    tag: 'success'
  },
  ['update']: {
    text: 'update',
    tag: 'primary'
  },
  ['delete']: {
    text: 'delete',
    tag: 'danger'
  },
};

export function auditLogActionText(action) {
  let type = AuditLogActionTypes[action.toLowerCase()];
  return type ? type.text : action;
}

export function auditLogActionTag(action) {
  let type = AuditLogActionTypes[action.toLowerCase()];
  return type ? type.tag : 'info';
}

/**
 * 平台银行卡用途
 */
const PlatformBankCardUsages = {
  [1]: {
    text: '会员收款',
    tag: 'primary'
  },
  [10]: {
    text: '代付收款',
    tag: 'success'
  },
};

export function platformBankCardUsageText(usage) {
  return PlatformBankCardUsages[usage].text;
}

export function platformBankCardUsageTag(usage) {
  return PlatformBankCardUsages[usage].tag;
}

/**
 * 收款码状态。
 */
const QrCodeStatus = {
  [0]: {
    text: '待审核',
    tag: 'info'
  },
  [1]: {
    text: '未通过',
    tag: 'danger'
  },
  [2]: {
    text: '待匹配',
    tag: 'primary'
  },
  [3]: {
    text: '已下线',
    tag: 'warning'
  },
  [4]: {
    text: '已作废',
    tag: 'danger'
  },
  [10]: {
    text: '已出码',
    tag: 'success'
  },
};

export function qrCodeStatusText(status) {
  return QrCodeStatus[status].text;
}

export function qrCodeStatusTag(status) {
  return QrCodeStatus[status].tag;
}

/**
 * 微信号状态。
 */
const MemWechatStatus = {
  [0]: {
    text: '待审核',
    tag: 'info'
  },
  [1]: {
    text: '未通过',
    tag: 'warning'
  },
  [2]: {
    text: '使用中',
    tag: 'success'
  },
  [3]: {
    text: '待启用',
    tag: 'primary'
  },
  [4]: {
    text: '已作废',
    tag: 'danger'
  },
  [10]: {
    text: '已出码',
    tag: 'success'
  },
};

export function memWechatStatusText(status) {
  return MemWechatStatus[status].text;
}

export function memWechatStatusTag(status) {
  return MemWechatStatus[status].tag;
}

/**
 * 微博号状态。
 */
const MemWeiboStatus = {
  [0]: {
    text: '待审核',
    tag: 'info'
  },
  [1]: {
    text: '未通过',
    tag: 'warning'
  },
  [2]: {
    text: '使用中',
    tag: 'success'
  },
  [3]: {
    text: '已下架',
    tag: 'primary'
  },
  [4]: {
    text: '已作废',
    tag: 'danger'
  },
  [10]: {
    text: '已出码',
    tag: 'success'
  },
};

export function memWeiboStatusText(status) {
  return MemWeiboStatus[status].text;
}

export function memWeiboStatusTag(status) {
  return MemWeiboStatus[status].tag;
}

/**
 * 商户状态
 */
const MchStatus = {
  [0]: {
    text: '禁用',
    tagType: 'danger'
  },
  [1]: {
    text: '正常',
    tagType: 'success'
  }
};

export function mchStatusText(status) {
  return MchStatus[status] ? MchStatus[status].text : '';
}

export function mchStatusTagType(status) {
  return MchStatus[status ? 1 : 0].tagType;
}

/**
 * 应用ID
 */
const Apps = {
  ['com.skynet.member']: {
    text: '飞迈',
    tagType: 'primary'
  },
  ['com.skynet.entrusted']: {
    text: '飞迈(代)',
    tagType: 'success'
  }
};

export function appText(appId) {
  return Apps[appId] ? Apps[appId].text : appId;
}

export function appTagType(appId) {
  return Apps[appId] ? Apps[appId].tagType : '';
}
