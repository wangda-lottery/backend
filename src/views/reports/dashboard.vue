<template>
  <div class="dashboard-editor-container">
    <panel-group v-loading="todaySummaryLoading"/>

    <!--el-row style="background:#fff; padding:16px 16px 0; margin-bottom: 8px;">
      <cash-flow-line-chart :chart-data="recentTransAmounts" height="220px" v-loading="cashFlowLoading"/>
    </el-row>

    <el-row style="background:#fff; padding:16px 16px 0; margin-bottom: 8px;">
      <ratio-trend-line-chart :chart-data="trendingRatio" height="220px" v-loading="ratioTrendLoading"/>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper" v-loading="totalSummaryLoading">
          <pie-chart :chart-data="merchantCashFlow"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper" v-loading="totalSummaryLoading">
          <bar-chart :chart-data="orderCount"/>
        </div>
      </el-col>
    </el-row-->
  </div>
</template>

<script>
  import PanelGroup from './components/PanelGroup'
  import CashFlowLineChart from './components/CashFlowLineChart'
  import RatioTrendLineChart from './components/RatioTrendLineChart'
  import TransactionTable from './components/TransactionTable'
  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'
  import BoxCard from './components/BoxCard'
  import {ReportActions, PlatformNotificationActions} from "../../store/actionTypes";

  export default {
    name: 'Dashboard',

    components: {
      PanelGroup,
      CashFlowLineChart,
      RatioTrendLineChart,
      RaddarChart,
      PieChart,
      BarChart,
      TransactionTable,
      BoxCard
    },

    data() {
      return {
        todaySummaryLoading: false,
        cashFlowLoading: false,
        ratioTrendLoading: false,
        totalSummaryLoading: false,
      }
    },

    computed: {

    },

    async mounted() {
      this.getTodaySummary();
    },

    methods: {
      // 今日摘要
      async getTodaySummary() {
        this.todaySummaryLoading = true;

        try {
          await this.$store.dispatch(ReportActions.GetSummary)
        } catch (err) {
          this.$message.error(err.message);
        }

        this.todaySummaryLoading = false;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 10px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
