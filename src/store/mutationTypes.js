/**
 * store mutation定义。
 */
// 路由
export const RouterMutations = {
  SetRouters: 'SetRouters'
};

// 音频播放器
export const AudioPlayerMutations = {
  SetPlaying: 'SetPlaying',
  AddAudio: 'AddAudio',
};

// 管理员
export const PlatAdminsMutations = {
  SetPlatAdminList: 'SetPlatAdminList',
  UpdatePlatAdmin: 'UpdatePlatAdmin'
};

// 首页数据
export const ReportMutations = {
  SetSummary: 'SetSummary',
};

// 首页数据
export const EntrustReportMutations = {
  SetPlatSummary: 'SetPlatSummary',
  SetPlatRecentTranAmounts: 'SetPlatRecentTranAmounts',
  SetMchSummary: 'SetMchSummary',
};

// 平台参数
export const ParamMutations = {
  SetPlatParamList: 'SetPlatParamList',
  UpdatePlatParams: 'UpdatePlatParams',
};

// 会员审计日志
export const MemAuditMutations = {
  SetMemAuditLogList: 'SetMemAuditLogList',
  SetMemControllerList: 'SetMemControllerList',
};

// 会员
export const MemTopUpMutations = {
  SetMemList: 'SetMemList',
};

// 会员
export const DrawMutations = {
  SetDrawList: 'SetDrawList',
};

// 管理员用户
export const UserMutations = {
  SetUserList: 'SetUserList',

  SetUserInfo: 'SetUserInfo',
};

// 商户
export const MchMutations = {
  SetMchList: 'SetMchList',
  SetMchInfo: 'SetMchInfo',
  UpdateMchInfo: 'UpdateMchInfo',
};

// 平台审计日志
export const PlatAuditMutations = {
  SetAuditLogList: 'SetAuditLogList',
  SetControllerList: 'SetControllerList',
};

// 平台员工角色
export const PlatformStaffRoleMutations = {
  SetStaffRoleList: 'SetStaffRoleList',
};

// 系统
export const SystemMutations = {
  SetModuleList: 'SetModuleList',
};

// 平台通知
export const PlatformNotificationMutations = {
  SetPlatNotifications: 'SetPlatNotifications',
};
