/**
 * store 动作定义。
 */
// 路由
export const RouterActions = {
  GenerateRoutes: 'GenerateRoutes',                      // 生成路由
};

// 音频
export const AudioPlayerActions = {
  AddToPlayAudio: 'AddToPlayAudio',
  PlayAudio: 'PlayAudio',
};

// 平台管理员
export const AdminActions = {
  GetPlatAdminList: 'GetPlatAdminList',
  CreatePlatAdmin: 'CreatePlatAdmin',
  UpdatePlatAdmin: 'UpdatePlatAdmin',
  SearchAdmins: 'SearchAdmins',
};

// 字典
export const DictActions = {
  GetDictItemList: 'GetDictItemList',
};

// 用户
export const UserActions = {
  GetUserList: 'GetUserList',
  UpdateUserInfo: 'UpdateUserInfo',

  UserLogin: 'UserLogin',                                           // 登陆
  GetUserInfo: 'GetUserInfo',                                       // 获取用户信息
  UserLock: 'UserLock',                                             // 加锁
  UserUnlock: 'UserUnlock',                                         // 解锁
  UserLogout: 'UserLogout',                                         // 退出
  ClearCache: 'ClearCache',
  UpdatePwd: 'UpdatePwd',
};

// 支付报表数据
export const ReportActions = {
  GetSummary: 'GetSummary',
};

// 代付报表数据
export const EntrustReportActions = {
  GetPlatSummary: 'GetPlatSummary',
  GetPlatRecentTranAmounts: 'GetPlatRecentTranAmounts',

  GetMchSummary: 'GetMchSummary',
  GetMemSummary: 'GetMemSummary',
};

// 平台参数
export const ParamActions = {
  GetPlatParamList: 'GetPlatParamList',
  UpdatePlatParams: 'UpdatePlatParams',
};

// 会员
export const MemTopUpActions = {
  GetMemList: 'GetMemList',
  SearchMembers: 'SearchMembers',
  ImportData: 'ImportData',
};

// 抽奖
export const DrawActions = {
  GetDrawList: 'GetDrawList',
  DeleteItem: 'DeleteItem',
  Dispatch: 'Dispatch',
};

// 会员审计日志
export const MemberAuditLogActions = {
  GetMemAuditLogList: 'GetMemAuditLogList',
  GetMemControllerList: 'GetMemControllerList',
};

// 会员支付账户明细
export const MemBalanceLogActions = {
  GetMemBalanceLogs: 'GetMemBalanceLogs',
};

// 会员代付账户明细
export const MemEntrustBalanceLogActions = {
  GetMemEntrustBalanceLogs: 'GetMemEntrustBalanceLogs',
};

// 会员转账
export const MemBalanceTransferActions = {
  GetMemBalanceTransferList: 'GetMemBalanceTransferList',
};

// 会员银行卡
export const MemBankCardActions = {
  GetMemBankCardList: 'GetMemBankCardList',
  CreateMemBankCard: 'CreateMemBankCard',
  UpdateMemCard: 'UpdateMemCard',
  MemBankCardTransferTest: 'MemBankCardTransferTest'
};

// 会员订单
export const MemOrderActions = {
  GetMemOrderList: 'GetMemOrderList',
  UpdateMemOrder: 'UpdateMemOrder',
  ChangeAmount: 'ChangeAmount',
};

// 会员微信号
export const MemWechatActions = {
  GetMemWechatList: 'GetMemWechatList',
  UpdateMemWechat: 'UpdateMemWechat',
  DeleteMemWechat: 'DeleteMemWechat'
};

// 会员微博号
export const MemWeiboActions = {
  GetMemWeiboList: 'GetMemWeiboList',
  AddMemWeibo: 'AddMemWeibo',
  UpdateMemWeibo: 'UpdateMemWeibo',
  DeleteMemWeibo: 'DeleteMemWeibo',
  TestMemWeibo: 'TestMemWeibo'
};

// 会员支付账户报表
export const MemPaymentReportActions = {
  GetSummary: 'GetSummary'
};

// 会员代理
export const MemProxyActions = {
  GetMemProxyList: 'GetMemProxyList',
  UpdateMemProxy: 'UpdateMemProxy',
  UpdateMemProxyChannel: 'UpdateMemProxyChannel',
  CreateMemProxy: 'CreateMemProxy',
  GetMemProxyJuniors: 'GetMemProxyJuniors',
  GetMemProxySuperiors: 'GetMemProxySuperiors',
  OfflineProxyLine: 'OfflineProxyLine',
};

// 会员支付账户提现
export const MemWithdrawActions = {
  GetMemWithdrawList: 'GetMemWithdrawList',
  ConfirmMemWithdraw: 'ConfirmMemWithdraw',
  RefundMemWithdraw: 'RefundMemWithdraw',
};

// 会员支付账户提现
export const MemEntrustWithdrawActions = {
  GetMemEntrustWithdrawList: 'GetMemEntrustWithdrawList',
  ConfirmMemEntrustWithdraw: 'ConfirmMemEntrustWithdraw',
  RefundMemEntrustWithdraw: 'RefundMemEntrustWithdraw',
};

// 会员库存报表
export const MemStoreReportActions = {
  GetStoreReport: 'GetStoreReport',
};

// 会员通知
export const NotificationActions = {
  GetNotificationList: 'GetNotificationList',
  SendNotification: 'SendNotification'
};

// 收款码
export const QrCodeActions = {
  GetMemQrCodeList: 'GetMemQrCodeList',
  MemQrCodeReview: 'MemQrCodeReview',
  ResetRemainShowTimes: 'ResetRemainShowTimes',
  DeleteQrCodeReview: 'DeleteQrCodeReview',
};

// 邀请码
export const InvitationCodeActions = {
  GetIcList: 'GetIcList',
  CreateIc: 'CreateIc'
};

// 商户
export const MchActions = {
  GetMchList: 'GetMchList',
  SearchMerchants: 'SearchMerchants',
  UpdateMchInfo: 'UpdateMchInfo',
  UpdateMchChl: 'UpdateMchChl',
  CreateMch: 'CreateMch',
  ResetPassword: 'ResetPassword',
  MchCallbackTest: 'MchCallbackTest',
  TrimMchPaymentBalance: 'TrimMchPaymentBalance',
  TrimMchEntrustBalance: 'TrimMchEntrustBalance',
};

// 应用设置
export const SettingActions = {
  SaveSettings: 'SaveSettings',
  ClearSettings: 'ClearSettings',
};

// 平台审计日志
export const PlatformAuditLogActions = {
  GetAuditLogList: 'GetAuditLogList',
};

// 平台用户角色
export const PlatformStaffRoleActions = {
  GetStaffRoleList: 'GetStaffRoleList',
};

// 系统
export const SystemActions = {
  GetModuleList: 'GetModuleList',
};

// 平台通知
export const PlatformNotificationActions = {
  GetPlatNotifications: 'GetPlatNotifications',
  SetPlatNotificationAsRead: 'SetPlatNotificationAsRead'
};
