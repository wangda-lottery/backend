<template>
  <div @click="onLock">
    <svg-icon class-name="size-icon" icon-class="lock"/>
  </div>
</template>

<script>
  import {UserActions} from "../../store/actionTypes";

  export default {
    data() {
      return {
      }
    },

    methods: {
      async onLock() {
        try {
          await this.$confirm('锁屏后需要输入登录密码方可解锁，确定锁屏?', '锁屏');

          await this.$store.dispatch(UserActions.UserLock, {});

          this.$router.push({name: 'Lock', replace: true});
          // history.pushState(null, null, document.URL);
        } catch (e) {
        }
      }
    }
  }
</script>
