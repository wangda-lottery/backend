<template>
  <div class="app-container setting-container">
    <el-tabs type="border-card" style="width: 96%">
      <el-tab-pane label="通用设置">
        <el-form label-width="180px" style="width: 600px;">
          <el-form-item v-for="(key, idx) in Object.keys(settings.general)"
                        :key="idx" :label="settings.general[key].title">
            <el-switch v-if="settings.general[key].type === 'boolean'"
                       v-model="settings.general[key].value"
                       @change="onSaveSettings"></el-switch>
            <el-input v-else-if="settings.general[key].type === 'number'"
                      v-model="settings.general[key].value"
                      :min="settings.general[key].min"
                      :max="settings.general[key].max"
                      :type="settings.general[key].type"
            @change="onSaveSettings">
            <template slot="append" v-if="settings.general[key].unit">
              {{settings.general[key].unit}}
            </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="应用缓存">
        <el-table :data="localStorageList" border fit highlight-current-row style="width: 100%;">
          <el-table-column label="键" align="center" width="180px">
            <template slot-scope="scope">
              <span>{{scope.row.key}}</span>
            </template>
          </el-table-column>
          <el-table-column label="值" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80px">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="onClearCache(scope.row.key)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>


        <div style="text-align: center; margin-top: 20px;">
          <el-button type="warning" size="small" @click="onClearCache(null)">清除全部缓存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {UserActions, SettingActions} from "../../store/actionTypes";

  export default {
    name: 'AppSettings',

    data() {
      return {}
    },

    computed: {
      ...mapGetters(['settings']),

      localStorageList() {
        return Object.keys(localStorage).map(key => {
          return {
            key: key,
            value: localStorage.getItem(key)
          }
        })
      }
    },

    async mounted() {
    },

    methods: {
      // 保存设置
      async onSaveSettings() {
        this.$store.dispatch(SettingActions.SaveSettings);
      },

      // 清理全部缓存
      async onClearCache(key) {
        try {
          if (key) {
            await this.$confirm('确定删除该缓存？', '删除缓存');

            localStorage.removeItem(key);
          } else {
            await this.$confirm('清除缓存后将会退出，您需要重新登录。确定清除应用缓存？', '清除缓存');

            this.$store.dispatch(UserActions.ClearCache);
          }

          location.reload();
        } catch (e) {
          if (e.measure) this.$message.error(e.message);
        }
      },
    }
  }
</script>

<style lang="css" scoped>
  .setting-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
