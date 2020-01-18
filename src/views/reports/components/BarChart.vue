<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts';
  import {debounce} from '@/utils';

  const animationDuration = 6000;

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      chartData: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        chart: null
      }
    },

    watch: {
      chartData: {
        deep: true,

        handler(val) {
          this.initChart(val);
        }
      }
    },

    mounted() {
      this.initChart();

      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100);

      window.addEventListener('resize', this.__resizeHandler)
    },

    beforeDestroy() {
      if (!this.chart) {
        return
      }

      window.removeEventListener('resize', this.__resizeHandler);
      this.chart.dispose();
      this.chart = null
    },

    methods: {
      initChart() {
        if (!this.chartData || !this.chartData['成交单数']) return;

        this.chart = echarts.init(this.$el, 'macarons');

        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {    // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'  // 默认为直线，可选为：'line' | 'shadow'
            }
          },

          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },

          xAxis: [{
            type: 'category',
            data: this.chartData['成交单数'].map(item => item.label),
            axisTick: {
              alignWithLabel: true
            }
          }],

          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],

          series: [{
            name: '成交单数',
            type: 'bar',
            stack: 'count',
            barWidth: '60%',
            data: this.chartData['成交单数'].map(item => item.count),
            animationDuration
          }, {
            name: '未成交单数',
            type: 'bar',
            stack: 'count',
            barWidth: '60%',
            data: this.chartData['未成交单数'].map(item => item.count),
            animationDuration
          }]
        })
      }
    }
  }
</script>
