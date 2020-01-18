<template>
  <div>
    <el-dropdown trigger="click" @command="onShowMessage">
      <div>
        <svg-icon class-name="size-icon" icon-class="notification"/>
        <el-badge :value="unreadCount" style="margin-top: -15px;">
        </el-badge>
      </div>
      <el-dropdown-menu slot="dropdown">
        <div v-if="platNotifications.items.length > 0">
          <el-dropdown-item
            v-for="item of platNotifications.items"
            :key="item.id"
            :command="item">
        <span>
          <svg-icon :icon-class="item.read ? 'read' : 'unread'"/>[{{item.createTime.substr(5)}}] {{item.title}}
        </span>
          </el-dropdown-item>
        </div>
        <el-dropdown-item v-else>
          <span>暂无系统消息</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="系统消息" :visible.sync="msgDlgVisible">
      <el-form :model="msg">
        <el-form-item></el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {PlatformNotificationActions} from "../../store/actionTypes";

  export default {
    data() {
      return {
        msgDlgVisible: false,
        msg: {}
      };
    },

    computed: {
      ...mapGetters(['platNotifications']),

      unreadCount() {
        return this.$store.getters.platNotifications.items.filter((item) => item.read === 0).length;
      },

      size() {
        return this.$store.getters.size
      }
    },

    methods: {
      async onShowMessage(msg) {
        if (!msg) return;

        try {
          await this.$alert(msg.content, msg.title, {
            confirmButtonText: '知道了'
          });

          if (msg.read === 1) return;

          await this.$store.dispatch(PlatformNotificationActions.SetPlatNotificationAsRead, {id: msg.id});
          await this.$store.dispatch(PlatformNotificationActions.GetPlatNotifications, {});
        } catch (e) {
          if (e.message) this.$message.error(e.message);
        }
      }
    }
  }
</script>
