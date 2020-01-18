<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>

    <!--左侧菜单栏-->
    <sidebar class="sidebar-container"/>

    <!--右侧工作区-->
    <div class="main-container">
      <!--顶部导航栏-->
      <navbar/>

      <!--窗口列表栏-->
      <tags-view/>

      <!--主工作域-->
      <app-main/>
    </div>
  </div>
</template>

<script>
  import AppMain from './components/AppMain';
  import Sidebar from './components/Sidebar/index';
  import Navbar from './components/Navbar';
  import TagsView from './components/TagsView';
  import ResizeMixin from './mixin/ResizeHandler';

  export default {
    name: 'AppContainer',

    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView
    },

    mixins: [ResizeMixin],

    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },

      device() {
        return this.$store.state.app.device
      },

      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },

    methods: {
      async handleClickOutside() {
        await this.$store.dispatch('closeSideBar', {withoutAnimation: false})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
