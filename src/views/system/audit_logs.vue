<template>
  <div class="app-container">
    <div>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-form inline :model="listQuery">
          <el-form-item>
            <el-input class="filter-item"
                      style="width: 120px;"
                      v-model="listQuery.auditId"
                      clearable
                      placeholder="审计ID">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select class="filter-item"
                       style="width: 150px;"
                       v-model="listQuery.operatorId"
                       clearable
                       filterable
                       remote
                       multiple
                       placeholder="操作人昵称或ID"
                       :remote-method="queryOperatorAsync"
                       :loading="operatorSearching">
              <el-option
                v-for="item in operators"
                :key="item.id"
                :label="item.nickname"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.module" placeholder="模块" style="width: 140px;">
              <el-option v-for="(module, idx) in modules" :key="idx" :label="module.name"
                         :value="module.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.controller" placeholder="控制器" filterable clearable style="width: 180px;">
              <el-option v-for="(ctrl, idx) in controllers" :key="idx"
                         :label="ctrl.name"
                         :value="ctrl.value"></el-option>
            </el-select>
          </el-form-item>
          <!--el-form-item>
            <el-select v-model="listQuery.action" placeholder="方法" filterable clearable style="width: 130px;">
              <el-option label="添加(save)" value="save"></el-option>
              <el-option label="修改(update)" value="update"></el-option>
              <el-option label="删除(delete)" value="delete"></el-option>
            </el-select>
          </el-form-item-->
          <el-date-picker class="filter-item"
                          v-model="listQuery.createTime"
                          type="datetimerange"
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="查询开始时间"
                          end-placeholder="查询结束时间"
                          align="right">
          </el-date-picker>
          <el-form-item>
            <el-button type="success" @click="onSearch" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        v-loading="listLoading"
        :data="auditLogs"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <!--el-table-column label="ID" width="230" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column-->
        <el-table-column label="操作用户" align="center" width="140px">
          <template slot-scope="scope">
            <span class="link-type" @click="onOperatorClick(scope.row)">
              {{ userNickname(scope.row) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="模块" align="center">
          <template slot-scope="scope">
            <div>
              <span>{{moduleName(scope.row.module)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="控制器" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.controller}}</span>
          </template>
        </el-table-column>
        <el-table-column label="方法" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.action | auditLogActionTag" size="mini">
              {{scope.row.action | auditLogActionText}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审计IP" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.ip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审计时间" width="130px" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime.substr(5)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="请求参数" width="130px" align="center">
          <template slot-scope="scope">
            <el-popover
              width="600"
              placement="top-start"
              title="审计参数"
              trigger="click">
              <pre>{{scope.row.params}}</pre>
              <el-button type="text" size="mini" slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="返回值" width="130px" align="center">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.response"
              width="600"
              placement="left"
              title="审计参数"
              trigger="click">
              <pre>{{scope.row.response}}</pre>
              <el-button type="text" size="mini" slot="reference">查看</el-button>
            </el-popover>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <!--el-table-column label="操作" width="260px" align="center">
          <template slot-scope="scope">
            <el-button-group>
            <el-button type="danger" size="mini" @click="onDisableAdmin(scope.row, 0)" v-if="scope.row.status === 1">禁用</el-button>
            <el-button type="success" size="mini" @click="onDisableAdmin(scope.row, 1)" v-else>启用</el-button>
            <el-button type="primary" size="mini" @click="onLoginLog(scope.row)">登录日志</el-button>
            <el-button type="info" size="mini" @click="onAuditLog(scope.row)">审计日志</el-button>
            </el-button-group>
          </template>
        </el-table-column-->
      </el-table>

      <!--分页-->
      <div class="pagination-container">
        <el-pagination v-show="auditLogs.length > 0"
                       :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]"
                       :page-size="listQuery.limit"
                       :total="auditLogCount"
                       background
                       layout="total, sizes, prev, pager, next, jumper"
                       @size-change="onSizeChange"
                       @current-change="onPageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    AdminActions,
    MchActions,
    MemTopUpActions,
    PlatformAuditLogActions, SystemActions,
  } from '../../store/actionTypes';
  import commonMixin from '../../mixin';

  export default {
    name: 'PlatAuditLogs',

    mixins: [commonMixin],

    data() {
      let data = {
        listLoading: true,
        listQuery: Object.assign({
          page: 1,
          limit: 20,

          module: 'console',
          operatorId: undefined,
          controller: undefined,
          action: undefined,
          createTime: [undefined, undefined]
        }, this.loadCachedData()),

        // 编辑对象
        editDlgVisible: false,
        editObject: {},

        // 操作人查询
        operatorSearching: false,
        operators: [],
      };

      // 时间选择器
      data['pickerOptions'] = this.generateDatePickerOptions();

      return data;
    },

    computed: {
      modules() {
        return Object.keys(this.$store.getters.modules).map(module => Object.assign({}, {
          name: this.$store.getters.modules[module].name,
          value: module
        }));
      },

      // 控制器
      controllers() {
        let module = this.$store.getters.modules[this.listQuery.module];
        if (!module) return [];

        let controllers = Object.keys(module.controllers).map(controller => Object.assign({}, {
          name: module.controllers[controller].name,
          value: controller
        }));

        return controllers;
      },

      // 管理员列表
      auditLogs() {
        return this.$store.getters.platformAuditLogs.items;
      },

      auditLogCount() {
        return this.$store.getters.platformAuditLogs.totalCount;
      }
    },

    async mounted() {
      await this.getModules();
      await this.getAuditLogs();
    },

    methods: {
      // 获取模块
      async getModules() {
        try {
          await this.$store.dispatch(SystemActions.GetModuleList, this.listQuery);
        } catch (e) {
          this.$message.error(e.message);
        }
      },

      // 获取列表
      async getAuditLogs() {
        this.listLoading = true;

        try {
          await this.$store.dispatch(PlatformAuditLogActions.GetAuditLogList, this.listQuery);
        } catch (e) {
          this.$message.error(e.message);
        }

        this.listLoading = false;
      },

      moduleName(module) {
        return this.$store.getters.modules[module].name;
      },

      // 查询
      onSearch() {
        this.listQuery.page = 1;

        this.getAuditLogs();
      },

      // 分页大小改变
      onSizeChange(val) {
        this.listQuery.limit = val;

        this.getAuditLogs();
      },

      // 当前页面改变
      onPageChange(val) {
        this.listQuery.page = val;

        this.getAuditLogs();
      },

      userNickname(row) {
        if (row.admin) return row.admin.nickname;
        if (row.member) return row.member.nickname;
        if (row.merchant) return row.merchant.nickname;

        return '-';
      },

      // 账户查询
      async queryOperatorAsync(nickname) {
        try {
          if (!nickname) return;

          this.operatorSearching = true;

          switch (this.listQuery.module) {
            case 'console':
              this.operators = await this.$store.dispatch(AdminActions.SearchAdmins, {nickname});
              break;

            case 'merchant':
            case 'api':
              this.operators = await this.$store.dispatch(MchActions.SearchMerchants, {nickname});
              break;

            case 'member':
              if (nickname.startsWith('M') && nickname.length <= 8) {
                this.operators = [{id: nickname, nickname: nickname}];
              } else {
                this.operators = await this.$store.dispatch(MemTopUpActions.SearchMembers, {nickname});
              }
              break;
          }
        } catch (e) {
          if (e.message) this.$message.error(e.message);
        }

        this.operatorSearching = false;
      },

      // 点击用户，直接查询该用户相关的所有审计日志
      onOperatorClick(row) {
        let operatorNickname = null;
        if (row.admin) {
          this.listQuery.operatorId = row.admin.id;
          operatorNickname = row.admin.nickname;
        } else if (row.merchant) {
          this.listQuery.operatorId = row.merchant.id;
          operatorNickname = row.merchant.nickname;
        } else if (row.member) {
          this.listQuery.operatorId = row.member.id;
          operatorNickname = row.member.nickname;
        }

        this.operators = [{
          id: this.listQuery.id,
          nickname: operatorNickname
        }];

        this.onSearch();
      }
    }
  }
</script>

<style lang="css">
</style>
