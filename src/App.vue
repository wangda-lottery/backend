<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {
    UserActions,
  } from "./store/actionTypes";

  export default {
    name: 'App',
    components: {},

    data() {
      return {
        memOrderRemindTimer: undefined
      }
    },

    computed: {
      ...mapGetters(['settings']),
    },

    async mounted() {
      // 更新用户信息
      this.$store.dispatch(UserActions.GetUserInfo, {});
    },

    methods: {}
  }
</script>

<style>
  .el-table .success-row {
    background: #9bf9a2;
  }

  .el-table .warning-row {
    background: #f9ffde;
  }

  div.el-form-item {
    margin-bottom: 5px;
  }

  div.el-form-item {
    margin-bottom: 5px;
  }

  div.el-dialog__body {
    padding: 10px 20px;
  }
</style>
