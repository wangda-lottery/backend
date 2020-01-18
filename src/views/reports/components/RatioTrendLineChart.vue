<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts';
  import {debounce} from '@/utils';

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
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        chart: null,
      }
    },

    watch: {
      chartData: {
        deep: true,

        handler(val) {
          this.generateChartOptions(val);
        }
      }
    },

    mounted() {
      this.chart = echarts.init(this.$el, 'macarons');

      this.generateChartOptions(this.chartData);

      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100);

        window.addEventListener('resize', this.__resizeHandler)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },

    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);

      this.chart.dispose();
      this.chart = null
    },

    methods: {
      /**
       * 侧边栏变化处理器
       */
      sidebarResizeHandler(e) {
        if (e.propertyName === 'width') this.__resizeHandler()
      },

      /**
       * 生成拆线图数据。
       */
      generateChartOptions(trendingRatio) {
        this.chart.setOption({
          // X轴
          xAxis: {
            data: trendingRatio.map(item => item.label),
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          // 网格属性
          grid: {
            left: 0,
            right: 0,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          title: {
            text: `72小时成交率趋势`,
            x: 'left',
            y: 'top'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['成交率趋势']
          },
          // 折线属性
          series: [{
            name: '成交率趋势',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#f34500',
                lineStyle: {
                  color: '#f34500',
                  width: 2
                }
              }
            },

            data: trendingRatio.map(item => (item.value * 100).toFixed(2)),
            animationDuration: 1500,
            animationEasing: 'quadraticOut'
          }]
        })
      }
    }
  }
</script>
