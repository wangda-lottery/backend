<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import {mapGetters} from 'vuex';
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
    },

    data() {
      return {
        chart: null,
      }
    },

    computed: {
      ...mapGetters(['platRecentTranAmounts']),
    },

    watch: {
      platRecentTranAmounts: {
        deep: true,

        handler() {
          this.generateChartOptions(this.platRecentTranAmounts);
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
      if (!this.chart) return;

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
      generateChartOptions(payload) {
        // 可能没有数据
        if (!payload || !payload.length) return;

        const options = {
          // X轴
          xAxis: {
            data: this.generateRecentDaysAxis(payload.length),
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
            text: `代付日流水`,
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
            data: payload.map(item => item.label)
          },
          // 折线属性
          series: []
        };

        // 折线数据
        options.series.push({
          name: '近30日交易额',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: this.randomColor(),
              lineStyle: {
                color: this.randomColor(),
                width: 2
              }
            }
          },
          data: payload.map(item => (item.value / 100).toFixed(2)),
          animationDuration: 1500,
          animationEasing: 'quadraticOut'
        });

        this.chart.setOption(options);
      },

      /**
       * 周报X轴标记
       * @param count
       * @returns {*[]}
       */
      generateRecentDaysAxis(count) {
        let date = new Date();
        let i = 0;
        let days = [];
        while (i < count) {
          days.push((date.getMonth() + 1) + '/' + date.getDate());
          date = new Date(date - 24 * 60 * 60 * 1000);
          i++;
        }

        return days.reverse();
      },

      randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
      }
    }
  }
</script>
