<template>
  <div class="app-container" v-loading="loading">
    <div>
      <el-row type="flex" justify="space-between">
        <div class="filter-container">
          <el-input  v-model="listQuery.accountName"
                     class="filter-item"
                     style="width: 180px;"
                    clearable placeholder="会员名"/>
          <el-date-picker class="filter-item"
                          v-model="listQuery.queryTime"
                          type="datetimerange"
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="充值开始时间"
                          end-placeholder="充值结束时间"
                          align="right">
          </el-date-picker>

          <el-button class="filter-item" type="success" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-download" @click="onImportData">导入充值记录</el-button>
        </div>
      </el-row>

      <el-table :data="memberTopUps.items" border fit highlight-current-row :row-class-name="tableRowClassName">
        <el-table-column label="会员ID" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.memId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.accountName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员级别" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.accountLevel}}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值金额" align="right">
          <template slot-scope="scope">
            <span>{{(scope.row.amount / 100).toFixed(2) | toThousandFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值时间" align="center" width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.topUpAt.substr(5)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="导入时间" align="center" width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.topUpAt.substr(5)}}</span>
          </template>
        </el-table-column>
        <!--el-table-column label="操作" align="center" width="120px">
          <template slot-scope="scope">
          </template>
        </el-table-column-->
      </el-table>

      <!--分页-->
      <div class="pagination-container">
        <el-pagination v-show="memberTopUps.items.length > 0"
                       :current-page="listQuery.page"
                       :page-size="listQuery['per-page']"
                       :total="memberTopUps._meta.totalCount"
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
    MemTopUpActions,
  } from '../../store/actionTypes';
  import commonMixin from '../../mixin';

  export default {
    name: 'MemberTopUps',

    mixins: [commonMixin],

    data() {
      const data = {
        loading: true,
        listQuery: Object.assign({
          'page': 1,
          'per-page': 20,
          'sort': '-id',

          accountName: undefined,
          queryTime: [undefined, undefined],
        }, this.loadCachedData()),
      };

      // 时间选择器
      data['pickerOptions'] = this.generateDatePickerOptions();

      return data;
    },

    computed: {
      ...mapGetters(['memberTopUps']),
    },

    mounted() {
      this.getMemTopUpList();
    },

    methods: {
      // 获取会员列表
      async getMemTopUpList() {
        this.loading = true;

        try {
          await this.$store.dispatch(MemTopUpActions.GetMemList, this.listQuery);
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

        this.getMemTopUpList();
      },

      // 分页大小改变
      onSizeChange(val) {
        this.listQuery['per-page'] = val;

        this.getMemTopUpList();
      },

      // 当前页面改变
      onPageChange(val) {
        this.listQuery.page = val;

        this.getMemTopUpList();
      },

      // 导入充值记录
      async onImportData() {
        try {
          await this.$confirm('即将导入昨日的会员充值数据，若已导入将覆盖，确定执行？', '会员充值数据导入');

          this.loading = true;

          await this.$store.dispatch(MemTopUpActions.ImportData, {});

          this.$message.success('数据导入成功');

          this.getMemTopUpList();
        } catch (e) {
          if (e.message) this.$message.error(e.message);
        }

        this.loading = false;
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
