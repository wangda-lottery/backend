<template>
  <div class="app-container" v-loading="listLoading">
    <div class="filter-container">
      <el-input v-model="paramNameFilter"
                class="filter-item"
                style="width: 240px;"
                clearable placeholder="输入参数名称过滤"
                icon="el-icon-circle-plus"/>
      <el-button class="filter-item" type="success" icon="el-icon-search" @click="getParamList">查询</el-button>
    </div>

    <el-table v-loading="listLoading" :data="params" border fit stripe highlight-current-row>
      <el-table-column label="参数名称" align="center" width="200px" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="onEditParam(scope.row)">{{scope.row.title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="参数值" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" @click="copyData(scope.row.value)">{{scope.row.value}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="参数单位" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.unit || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.tips}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑参数-->
    <el-dialog title="参数编辑" :visible.sync="editDlgVisible" width="500px">
      <el-form :model="editObject" label-width="90px">
        <el-form-item label="参数名">
          <el-input v-model="editObject.title" type="text" readonly/>
        </el-form-item>
        <el-form-item label="参数值">
          <el-input v-model="editObject.value" type="textarea" rows="5"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editDlgVisible = false"> 关 闭</el-button>
        <el-button type="primary" @click="onSaveValue">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    ParamActions,
  } from '../../store/actionTypes';
  import {mapGetters} from "vuex";

  export default {
    name: 'PlatParams',

    filters: {},

    data() {
      return {
        listLoading: false,
        paramNameFilter: undefined,

        editDlgVisible: false,
        editObject: {},
      }
    },

    computed: {
      ...mapGetters(['params']),
    },

    async mounted() {
      this.getParamList();
    },

    methods: {
      // 获取列表
      async getParamList() {
        this.listLoading = true;

        try {
          await this.$store.dispatch(ParamActions.GetPlatParamList, {});
        } catch (e) {
          this.$message.error(e.message);
        }

        this.listLoading = false;
      },

      // 编辑
      onEditParam(row) {
        this.editObject = row;
        this.editDlgVisible = true;
      },

      // 保存
      async onSaveValue() {
        this.listLoading = true;

        try {
          await this.$store.dispatch(ParamActions.UpdatePlatParams, this.editObject);

          this.editDlgVisible = false;
          this.$message.success('修改成功');
        } catch (e) {
          this.$message.error(e.message);
        }

        this.getParamList();
        this.listLoading = false;
      }
    }
  }
</script>

<style lang="css">
</style>
