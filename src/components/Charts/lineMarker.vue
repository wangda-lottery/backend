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
      this.chart = null;
    },

    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id));
        this.chart.setOption({
          backgroundColor: '#f1f1f3',
          title: {
            top: 10,
            text: 'Requests',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#F1F1F3'
            },
            left: '1%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            }
          },
          // 图例
          legend: {
            top: 10,
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['成交率趋势'],
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#000000'
            }
          },
          // 表格
          grid: {
            top: 35,
            left: '10',
            right: '10',
            bottom: '2%',
            containLabel: true
          },
          // X轴
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            data: this.dataArray.map(item => item.time)
          }],
          // Y轴
          yAxis: [{
            type: 'value',
            name: '(%)',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }],
          series: [{
            name: '成交率趋势',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(219, 50, 51, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
              }
            },
            data: this.dataArray.map(item => item.ratio * 100)
          }]
        })
      }
    }
  }
</script>
