<template>
  <div class="app-container">
    <div>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="listQuery">
          <el-form-item>
            <el-input v-model="listQuery.nickname" placeholder="昵称" clearable/>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSearch" icon="el-icon-search">查询</el-button>
            <el-button type="primary" icon="el-icon-circle-plus" @click="onCreateUser">管理员注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table v-loading="listLoading" :data="users.items" border fit highlight-current-row>
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center" width="140px">
          <template slot-scope="scope">
            <div style="display: flex; flex-direction: row; justify-content: start; align-items: center;">
              <img :src="scope.row.headimgUrl" alt="" width="30px" height="30px" style="border-radius: 5px; margin-right: 5px;"/>
              <span class="link-type" @click="onEditUser(scope.row)">{{scope.row.nickname}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="登录名" align="center">
          <template slot-scope="scope">
            <div><span>{{scope.row.username}}</span></div>
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            <span v-html="staffRolesToHtml(scope.row.role)"></span>
          </template>
        </el-table-column>
        <!--el-table-column label="最后登录区域" width="140px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.history_sessions.length">{{scope.row.history_sessions[0].area}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录IP" width="140px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.history_sessions.length">{{scope.row.history_sessions[0].ip}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间" width="120px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.history_sessions.length">{{scope.row.history_sessions[0].sessionTime.substr(5)}}</span>
          </template>
        </el-table-column-->
        <el-table-column label="状态" width="80px" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status ? 'success' : 'danger'" size="small">{{scope.row.status ? '正常' : '禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
            <el-button-group>
            <el-button type="danger" size="mini" @click="onDisableAdmin(scope.row, 0)" v-if="scope.row.status === 1">禁用</el-button>
            <el-button type="success" size="mini" @click="onDisableAdmin(scope.row, 1)" v-else>启用</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="pagination-container">
        <el-pagination v-show="users.length > 0"
                       :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]"
                       :page-size="listQuery.limit"
                       :total="userCount"
                       background
                       layout="total, sizes, prev, pager, next, jumper"
                       @size-change="onSizeChange"
                       @current-change="onPageChange"/>
      </div>
    </div>

    <!--编辑-->
    <el-dialog title="员工信息" :visible.sync="editDlgVisible" width="400px" v-loading="listLoading">
      <el-form :model="editObject" label-width="100px">
        <el-form-item label="登录名">
          <el-input v-model="editObject.username" :readonly="!!editObject.id"/>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="editObject.nickname"/>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-input v-model="editObject.headimgUrl"/>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="editObject.role" style="width: 100%;">
            <el-option label="管理员" value="su"/>
            <el-option label="客服" value="cs"/>
            <el-option label="财务" value="fi"/>
            <el-option label="访客" value="gu"/>
          </el-select>
        </el-form-item>
        <el-form-item label="新的密码">
          <el-input v-model="editObject.password" type="password">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="editObject.confirmPassword" type="password">
          </el-input>
        </el-form-item>
        <el-form-item label="注册时间" v-if="editObject.id">
          <el-input v-model="editObject.createTime" readonly/>
        </el-form-item>
        <el-form-item label="只读权限">
          <el-switch :value="!!editObject.readonly" @change="v => editObject.readonly = v ? 1 : 0">
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDlgVisible = false"> 关 闭</el-button>
        <el-button type="primary" @click="onSaveAdmin">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    UserActions, PlatformStaffRoleActions,
  } from '../../store/actionTypes';
  import {staffRolesTag} from "../../filters";

  export default {
    name: 'PlatStaffRoles',

    filters: {
    },

    data() {
      return {
        listLoading: true,
        listQuery: {
          'page': 1,
          'perPage': 10,
          'sort': '-id',

          nickname: undefined
        },

        // 编辑对象
        editDlgVisible: false,
        editObject: {},

        // 登录日志
        loginLogVisible: false,
      }
    },

    computed: {
      // 管理员列表
      users() {
        return this.$store.getters.users;
      },

      userCount() {
        return this.$store.getters.users._meta.totalCount;
      },

      platStaffRoleTagType(role) {
        return this.$store.getters.platStaffRoleTagType(role);
      },

      platStaffRoleText(role) {
        return this.$store.getters.platStaffRoleText(role);
      }
    },

    async mounted() {
      await this.getUserList();
    },

    methods: {
      // 获取列表
      async getUserList() {
        this.listLoading = true;

        try {
          // this.$store.dispatch(PlatformStaffRoleActions.GetStaffRoleList, {});

          await this.$store.dispatch(UserActions.GetUserList, this.listQuery);
        } catch (e) {
          this.$message.error(e.message);
        }

        this.listLoading = false;
      },

      // 创建管理员
      onCreateUser() {
        this.editObject = {};
        this.editDlgVisible = true;
      },

      // 编辑管理员信息
      onEditUser(row) {
        this.editObject = row;
        this.editDlgVisible = true;
      },

      // 保存管理员信息
      async onSaveAdmin() {
        this.listLoading = true;

        try {
          this.editObject.id
            ? await this.$store.dispatch(UserActions.UpdatePlatAdmin, this.editObject)
            : await this.$store.dispatch(UserActions.CreatePlatAdmin, this.editObject);

          this.$message.success(this.editObject.id ? '保存成功!' : '创建成功!');

          this.getUserList();
          this.editDlgVisible = false;
        } catch (e) {
          this.$message.error(e.message);
        }

        this.listLoading = false;
      },

      // 查询
      onSearch() {
        this.listQuery.page = 1;

        this.getUserList();
      },

      // 分页大小改变
      onSizeChange(val) {
        this.listQuery.limit = val;

        this.getUserList();
      },

      // 当前页面改变
      onPageChange(val) {
        this.listQuery.page = val;

        this.getUserList();
      },

      // 查看登陆日志
      async onDisableAdmin(row, status) {
        this.listLoading = true;

        try {
          let payload = {};
          Object.assign(payload, row);

          payload.status = status;
          await this.$store.dispatch(UserActions.UpdateUserInfo, payload);

          Object.assign(row, payload);

          this.$message.success('操作成功!');
        } catch (e) {
          this.$message.error(e.message);
        }

        this.listLoading = false;
      },

      // 转为HTML
      staffRolesToHtml(roles) {
        let t = staffRolesTag(roles);
        console.log(t);
        return t;
      }
    }
  }
</script>

<style lang="css">
</style>
