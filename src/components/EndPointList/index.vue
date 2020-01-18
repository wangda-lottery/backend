<template>
  <el-dropdown trigger="click" @command="onShowEndPoint">
    <div>
      <svg-icon class-name="size-icon" icon-class="link"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
            <span @click="onTestLink">
              <svg-icon class="link-type" icon-class="reddit"/>
              <span> 测试链接</span>
            </span>
      </el-dropdown-item>
      <el-dropdown-item divided>
            <span @click="onMchLink">
              <svg-icon class="link-type" icon-class="shop"/>
              <span> 商户后台</span>
            </span>
      </el-dropdown-item>
      <el-dropdown-item>
            <span @click="onMchProxyLink">
              <svg-icon class="link-type" icon-class="flow-redirect-scheme"/>
              <span> 商户代理后台</span>
            </span>
      </el-dropdown-item>
      <el-dropdown-item>
            <span @click="onMemProxyLink">
              <svg-icon class="link-type" icon-class="users"/>
              <span> 会员代理后台</span>
            </span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import {Base64} from 'js-base64';

  export default {
    data() {
      return {
        sizeOptions: [
          {label: '暂无消息', value: 'default'}
        ]
      }
    },

    computed: {
      size() {
        return this.$store.getters.size
      }
    },

    methods: {
      onShowEndPoint(size) {
        this.$ELEMENT.size = size;
      },

      // 测试链接
      async onTestLink() {
        const platformId = `platformId=${this.$store.getters.userInfo.platform.id}`;
        const ticket = Base64.encode(`${platformId}`);
        const url = `${this.$store.getters.merchantApiDomain}/demo/index?ticket=${ticket}`;
        window.open(url, '_blank');
      },

      // 商户后台
      async onMchLink() {
        const url = `${this.$store.getters.merchantDomain}`;
        window.open(url, '_blank');
      },

      // 商户代理后台
      async onMchProxyLink() {
        const url = `${this.$store.getters.merchantProxyDomain}`;
        window.open(url, '_blank');
      },

      // 会员代理后台
      async onMemProxyLink() {
        const url = `${this.$store.getters.memberProxyDomain}`;
        window.open(url, '_blank');
      },
    }
  }
</script>
