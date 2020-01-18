<template>
  <div class="login-container">
    <!--登录-->
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             v-if="showLogin"
             class="login-form"
             auto-complete="on"
             label-position="left">
      <div class="title-container">
        <h2 class="title">抽奖管理系统</h2>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password" style="margin-top: 2em;">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="登陆密码"
          name="password"
          autocomplete="off"
          @keyup.enter.native="handleLogin"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-row type="flex" class="row-bg" justify="center" style="margin-top: 2em;">
        <el-button :loading="loading" icon="el-icon-s-promotion" type="danger" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {isValidUsername, isValidTelphone} from '../../utils/validate';
  import {Message} from 'element-ui';
  import {UserActions} from '../../store/actionTypes';

  export default {
    name: 'Login',

    components: {},

    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isValidUsername(value)) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      };

      const validateTelphone = (rule, value, callback) => {
        if (!isValidTelphone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      };

      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码至少6位'))
        } else {
          callback()
        }
      };

      const validatePassword1 = (rule, value, callback) => {
        if (value !== this.singUpForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      };

      return {
        showLogin: true,
        loginForm: {
          username: '',
          password: ''
        },

        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },

        passwordType: 'password',
        loading: false,
        showDialog: false,
        redirect: undefined,
        singUpForm: {
          username: '',
          realName: '',
          password: '',
          password1: '',
          telphone: ''
        },
        signUpRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          realName: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          password1: [{required: true, trigger: 'blur', validator: validatePassword1}],
          telphone: [{required: true, trigger: 'blur', validator: validateTelphone}]
        },
      }
    },

    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }

    },

    async mounted() {
      try {
        let username = this.$route.query.username;
        let pwd = this.$route.query.pwd;
        if (username && pwd) {
          this.loginForm.username = username;
          this.loginForm.password = pwd;
        }

        this.handleLogin();
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },

    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    },

    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },

      handleLogin() {
        this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            try {
              this.loading = true;

              await this.$store.dispatch(UserActions.UserLogin, this.loginForm);

              this.loading = false;
              this.$router.push({path: this.redirect || '/'});
            } catch (e) {
              this.loading = false;
              this.$message.error(e.message);
            }
          } else {
            // this.$message.error('error submit!!');

            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;

      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: orangered;
  $light_gray: #ffffff;
  .login-container {
    background-image: url("http://www.51pptmoban.com/d/file/2019/02/19/0d0d5abaa19219e1e6cc0a3eb75f1647.jpg");
    background-size: cover;
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 32px;
        color: $light_gray;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
</style>
