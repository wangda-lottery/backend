/**
 * 通用混入组件，包含以下功能：
 *
 * 1、组件数据缓存器。将组件中的 data 数据缓存到本地，组件重新打开时，继续加载上次的内容。
 * 2、会员搜索（按ID与昵称）
 * 3、商户搜索（按DI与名称）
 */
import moment from 'moment';

const commonMixin = {
  created() {
    // console.log('Mixin created...');
  },

  /**
   * 使用VUE的数据更新机制，每次都保存组件的数据，以便下次再查询页面的时候，可以重现上次的数据
   */
  updated() {
    // console.log('Mixin updated...');

    this.cacheData();
  },

  methods: {
    // 缓存组件数据
    cacheData(componentName, data) {
      componentName = componentName ? componentName : this.$options.name;
      data = data ? data : (this.$data.listQuery || {});

      // console.log(this.$data.listQuery);
      localStorage[componentName] = JSON.stringify(data);
    },

    // 加载页面数据，若有时间，JSON在解析的时候会将数据解析成特定的时间
    loadCachedData(componentName) {
      componentName = componentName ? componentName : this.$options.name;

      let data = localStorage[componentName];
      if (data) {
        data = JSON.parse(data, function (key, value) {
          if (typeof value === 'string' && value.includes('T') && value.endsWith('Z')) {
            return new Date(Date.parse(value));
          }

          return value;
        });
      }

      return data || {};
    },

    // 生成时间选择器数据
    generateDatePickerOptions() {
      return {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const today = moment();
            const end = today.endOf('day').toDate();
            const start = today.startOf('day').toDate();

            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const end = moment().subtract(1, 'day').endOf('day').toDate();
            const start = moment().subtract(1, 'day').startOf('day').toDate();

            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '前天',
          onClick(picker) {
            const end = moment().subtract(2, 'day').endOf('day').toDate();
            const start = moment().subtract(2, 'day').startOf('day').toDate();

            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '大前天',
          onClick(picker) {
            const end = moment().subtract(3, 'day').endOf('day').toDate();
            const start = moment().subtract(3, 'day').startOf('day').toDate();

            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = moment().endOf('week').toDate();
            const start = moment().startOf('week').toDate();

            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上周',
          onClick(picker) {
            const end = moment().subtract(1, 'week').endOf('week').toDate();
            const start = moment().subtract(1, 'week').startOf('week').toDate();

            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = moment().endOf('month').toDate();
            const start = moment().startOf('month').toDate();

            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上月',
          onClick(picker) {
            const end = moment().subtract(1, 'month').endOf('month').toDate();
            const start = moment().subtract(1, 'month').startOf('month').toDate();

            picker.$emit('pick', [start, end]);
          }
        }]
      };
    }
  }
};

export default commonMixin;
