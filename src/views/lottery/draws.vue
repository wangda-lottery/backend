<template>
  <div class="app-container" v-loading="loading">
    <div>
      <el-row type="flex" justify="space-between">
        <div class="filter-container">
          <el-input v-model="listQuery.nickname"
                    class="filter-item"
                    style="width: 180px;"
                    clearable
                    placeholder="会员名"/>
          <el-select v-model="listQuery.exported" class="filter-item" clearable placeholder="上传状态">
            <el-option label="未派送" :value="0"/>
            <el-option label="已派送" :value="1"/>
          </el-select>
          <el-date-picker class="filter-item"
                          type="datetimerange"
                          v-model="listQuery.queryTime"
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="抽奖查询开始时间"
                          end-placeholder="抽奖查询结束时间"
          >
          </el-date-picker>

          <el-button class="filter-item" type="success" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-upload2" @click="onUploadData">派送抽奖结果</el-button>
        </div>
      </el-row>

      <el-table :data="draws.items" border fit highlight-current-row :row-class-name="tableRowClassName">
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.id}}</div>
          </template>
        </el-table-column>
        <el-table-column label="会员名称" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.accountName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="红包金额" align="right">
          <template slot-scope="scope">
            <span>{{(scope.row.amount / 100).toFixed(2) | toThousandFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.exported ? 'success' : 'danger'" size="small">
              {{scope.row.exported ? '已派送' : '未派送'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="抽奖时间" align="center" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.createdAt.substr(5)}}</span><br>
          </template>
        </el-table-column>
        <el-table-column label="UserAgent" align="center">
          <template slot-scope="scope">
            <el-popover title="UserAgent" placement="top-start" width="500px">
              {{scope.row.ua}}
              <el-button slot="reference" type="text">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="审计IP" align="center" width="120">
          <template slot-scope="scope">
            <span>
              {{scope.row.ip}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="success" size="small" @click="onDispatched(scope.row)" :disabled="scope.row.exported === 1">手动派送</el-button>
              <el-button type="danger" size="small" @click="onDelete(scope.row)" :disabled="scope.row.exported === 0">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="pagination-container">
        <el-pagination v-show="draws.items.length > 0"
                       :current-page="listQuery.page"
                       :page-size="listQuery.limit"
                       :total="draws._meta.totalCount"
                       :page-sizes="[10, 20, 30, 50]"
                       background
                       layout="total, sizes, prev, pager, next, jumper"
                       @size-change="onSizeChange"
                       @current-change="onPageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {format} from 'timeago.js';
  import {mapGetters} from 'vuex';
  import {
    DrawActions,
  } from '../../store/actionTypes';
  import commonMixin from '../../mixin';

  export default {
    name: 'Draws',

    mixins: [commonMixin],

    data() {
      const data = {
        loading: true,
        listQuery: Object.assign({
          'page': 1,
          'per-page': 20,
          'sort': '-id',

          memId: undefined,
          queryTime: [undefined, undefined],
        }, this.loadCachedData()),
      };

      // 时间选择器
      data['pickerOptions'] = this.generateDatePickerOptions();

      return data;
    },

    computed: {
      ...mapGetters(['draws']),
    },

    mounted() {
      this.getDrawList();
    },

    methods: {
      // 获取列表
      async getDrawList() {
        this.loading = true;

        try {
          await this.$store.dispatch(DrawActions.GetDrawList, this.listQuery);
        } catch (error) {
          this.$message.error(error.message);
        }

        this.loading = false;
      },

      // 表格行背景色
      tableRowClassName({row}) {
        if (row.virtual) return 'warning-row';

        return '';
      },

      // 查询
      onSearch() {
        this.listQuery.page = 1;

        this.getDrawList();
      },

      // 分页大小改变
      onSizeChange(val) {
        this.listQuery.limit = val;

        this.getDrawList();
      },

      // 当前页面改变
      onPageChange(val) {
        this.listQuery.page = val;

        this.getDrawList();
      },

      // 上传抽奖记录
      async onUploadData() {
        try {
          await this.$confirm('确定批量派送抽奖结果至会员账户？已派送抽奖结果的不会重复派送', '抽奖结果派送');

          await this.$store.dispatch(DrawActions.Dispatch, {});

          this.$message.success('抽奖结果批量派送成功');
        } catch(e) {
          if (e.message) this.$message.error(e.message);
        }
      },

      // manual dispatch
      async onDispatched(row) {
        try {
          await this.$confirm('此操作仅将记录标记为已派送，包网后台需要手工上分。确定执行？', '操作确认');

          await this.$store.dispatch(DrawActions.ManualDispatch, {id: row.id});

          this.$message.success('手动派送成功');
        } catch(e) {
          if (e.message) this.$message.error(e.message);
        }

        this.getDrawList();
      },

      // delete
      async onDelete(row) {
        try {
          await this.$confirm('若抽奖记录未上传，删除后将不会被上传。确定删除该记录？', '操作确认');

          await this.$store.dispatch(DrawActions.DeleteItem, {id: row.id});

          this.$message.success('删除成功');
        } catch(e) {
          if (e.message) this.$message.error(e.message);
        }

        this.getDrawList();
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
