<template>
  <el-row :gutter="6" class="panel-group">
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money-today">
          <svg-icon icon-class="deal" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            昨日充值
          </div>
          <count-to :start-val="0" :end-val="(reports.totalTopUpCountYesterday)" :duration="800" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日抽奖人次数</div>
          <count-to :start-val="0" :end-val="reports.drawCountToday" :duration="800" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-wechat">
          <svg-icon icon-class="transaction" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日红包总额</div>
          <count-to :start-val="0" :end-val="reports.drawExportedAmountToday / 100" :duration="800" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money-total">
          <svg-icon icon-class="total" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">累计红包总额</div>
          <count-to :start-val="0" :end-val="reports.drawExportedAmountTotal / 100" :duration="800" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {mapGetters} from "vuex";
  import CountTo from 'vue-count-to';

  export default {
    components: {
      CountTo
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters(['reports']),
    },

    methods: {},

    mounted() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 0;

    .card-panel-col {
      margin-bottom: 6px;
    }

    .card-panel {
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-alipay {
          background: #00a3f3;
        }

        .icon-alipay-ttb {
          background: #f38c00;
        }

        .icon-alipay-collect-up {
          background: #00dbf4;
        }

        .icon-alipay-redpacket {
          background: #f45700;
        }

        .icon-wechat {
          background: #00a14c;
        }

        .icon-money {
          background: #f40097;
        }

        .icon-shopping {
          background: #ba00bf
        }

        .icon-unionpay {
          background: #f40a00;
        }
      }

      .icon-alipay {
        color: #00a3f3;
      }

      .icon-alipay-ttb {
        color: #f38c00;
      }

      .icon-alipay-collect-up {
        color: #00dbf4;
      }

      .icon-alipay-redpacket {
        color: #f45700;
      }

      .icon-wechat {
        color: #00a14c;
      }

      .icon-money-today {
        color: #31ca00;
      }

      .icon-money-total {
        color: #ca4b00;
      }

      .icon-shopping {
        color: #ba00bf
      }

      .icon-unionpay {
        color: #f40a00;
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 10px 0 0 5px;
        padding: 10px;
        transition: all 0.38s ease-out;
        border-radius: 5px;
      }

      .card-panel-icon {
        float: left;
        font-size: 30px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        text-align: right;
        margin: 8px;
        margin-left: 0;

        .card-panel-text {
          line-height: 12px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .card-panel-num {
          font-size: 25px;
        }
      }
    }
  }
</style>
