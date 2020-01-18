<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts';
  import resize from './mixins/resize';

  export default {
    mixins: [resize],

    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      dataArray: {
        type: Array,
        default: () => {
          return [{
            time: '12:02',
            ratio: 12
          }, {
            time: '12:04',
            ratio: 22
          }];
        }
      }
    },

    data() {
      return {
        chart: null
      }
    },

    mounted() {
      this.initChart();
    },

    watch: {
      dataArray() {
        this.initChart();
      }
    },

    beforeDestroy() {
      if (!this.chart) return;

      this.chart.dispose();
      this.chart = null
    },

    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id));

        const xAxisData = [];
        const data = [];
        for (let i = 0; i < this.dataArray.length; i++) {
          xAxisData.push(this.dataArray[i].time);
          data.push(this.dataArray[i].ratio);
        }

        this.chart.setOption({
          backgroundColor: '#eaf0f0',

          // 网格
          grid: {
            left: '2%',
            right: '2%'
          },

          // 可视区域
          /*visualMap: {
            show: true,
            min: 0,
            max: 90,
            dimension: 0,
            inRange: {
              color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
            }
          },*/

          // X轴
          xAxis: [{
            show: true,
            data: xAxisData
          }, {
            show: false,
            data: xAxisData
          }],

          // Y轴
          yAxis: {
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#4a657a'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#08263f'
              }
            },
            axisTick: {
              show: false
            }
          },

          // 数据序列
          series: [/*{
            name: 'Simulate Shadow',
            type: 'line',
            data,
            z: 2,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
              normal: {
                color: 'transparent'
              }
            },
            areaStyle: {
              normal: {
                color: '#08263a',
                shadowBlur: 50,
                shadowColor: '#000'
              }
            }
          }, */{
            name: 'front',
            type: 'bar',
            data,
            xAxisIndex: 1,
            z: 3,
            itemStyle: {
              normal: {
                barBorderRadius: 8
              }
            }
          }],

          animationEasing: 'elasticOut',
          animationEasingUpdate: 'elasticOut',

          animationDelay(idx) {
            return idx * 20
          },

          animationDelayUpdate(idx) {
            return idx * 20
          }
        })
      }
    }
  }
</script>
