<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import eCharts from 'echarts';
  import {debounce} from '@/utils';

  require('echarts/theme/macarons');

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
        type: Array,
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
      },
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
      window.removeEventListener('resize', this.__resizeHandler)
      this.chart.dispose();
      this.chart = null
    },

    methods: {
      initChart() {
        this.chart = eCharts.init(this.$el, 'macarons');

        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: this.chartData.map(item => item.name)
          },
          calculable: true,
          series: [
            {
              name: '流水比例',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              data: this.chartData,
              animationEasing: 'cubicInOut',
              animationDuration: 1600
            }
          ]
        })
      }
    }
  }
</script>
