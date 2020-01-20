<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb class="breadcrumb-container"/>

    <!--右侧菜单-->
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip content="全屏显示切换" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>
      </template>

      <el-tooltip content="系统消息" effect="dark" placement="bottom">
        <notification-list class="right-menu-item hover-effect international"/>
      </el-tooltip>

      <!--el-tooltip content="后台链接" effect="dark" placement="bottom">
        <end-point-list class="right-menu-item hover-effect international"/>
      </el-tooltip-->

      <el-tooltip content="锁屏" effect="dark" placement="bottom">
        <lock-screen class="right-menu-item hover-effect international"/>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userInfo ? userInfo.headimgUrl : ''" class="user-avatar"/>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <svg-icon class="link-type" icon-class="user"/>
            <span> 当前用户：{{userInfo.username}}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <svg-icon class="link-type" icon-class="key"/>
            <span @click="onShowUpdatePwdForm"> 修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="onSettings">
              <svg-icon class="link-type" icon-class="setting"/>
              <span> 应用设置</span>
            </span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="onLogout"><svg-icon class="link-type" icon-class="rocket"/> 退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="pwdFormVisible" width="400px">
      <el-form :model="pwdForm" label-width="80px">
        <el-form-item label="原始密码">
          <el-input v-model="pwdForm.password" show-password type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新的密码">
          <el-input v-model="pwdForm.newPassword" show-password type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="pwdForm.confirmPassword" show-password type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="pwdFormVisible = false"> 关 闭</el-button>
        <el-button type="primary" @click="onUpdatePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Breadcrumb from '@/components/Breadcrumb';
  import Hamburger from '@/components/Hamburger';
  import Screenfull from '@/components/Screenfull';
  import NotificationList from '@/components/NotificationList'
  import EndPointList from '@/components/EndPointList'
  import LockScreen from '@/components/LockScreen'
  import {UserActions} from '../../../store/actionTypes'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull,
      NotificationList,
      EndPointList,
      LockScreen,
    },

    data() {
      return {
        pwdFormVisible: false,
        pwdForm: {
          password: undefined,
          newPassword: undefined,
          confirmPassword: undefined,
        }
      };
    },

    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'device'
      ]),

      userInfo() {
        return this.$store.getters.userInfo;
      },

      isRechargeMode() {
        return this.userInfo && this.userInfo.platform && this.userInfo.platform.type === 1;
      }
    },

    mounted() {
    },

    methods: {
      async toggleSideBar() {
        await this.$store.dispatch('toggleSideBar')
      },

      // 更新密码
      async onShowUpdatePwdForm() {
        this.pwdFormVisible = true;
      },

      async onUpdatePassword() {
        try {
          if (!this.pwdForm.password) return this.$message.error('原始密码不能为空');

          if (!this.pwdForm.newPassword
            || !this.pwdForm.confirmPassword
            || this.pwdForm.newPassword !== this.pwdForm.confirmPassword
            || this.pwdForm.newPassword.length < 6) {
            return this.$message.error('两次密码必须一致，且不能少于6位');
          }

          await this.$store.dispatch(UserActions.UpdatePwd, {
            id: this.userInfo.id,
            ...this.pwdForm
          });

          this.pwdFormVisible = false;
          this.$message.success('密码修改成功');
        } catch (e) {
          if (e.message) this.$message.error(e.message);
        }
      },

      // 查看余额变更日志
      async onShowBalanceLogs() {
        this.$router.push({name: 'PlatformBalanceLogs'});
      },

      // 应用设置
      async onSettings() {
        this.$router.push({name: 'Settings'});
      },

      // 退出
      async onLogout() {
        await this.$store.dispatch(UserActions.UserLogout);

        location.reload();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }

      .screenfull {
        height: 20px;
      }

      .international {
        vertical-align: top;
      }

      .theme-switch {
        vertical-align: 15px;
      }

      .avatar-container {
        height: 50px;
        margin-right: 30px;

        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
