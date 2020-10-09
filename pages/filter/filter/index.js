// pages/filter/filter/index.js

const initData = {
  /** 排序字段 */
  orderBy: 'complex',
  /** 排序方式 */
  order: '',
};

Component({
  /**
   * 组件的初始数据
   */
  data: {
    ...initData
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFilterChange(e) {
      const {
        currentTarget: {
          dataset: { key }
        }
      } = e || {};
      const value = key;
      const { order: preOrder, orderBy: preOrderBy } = this.data;
      let order = '', triggerChange = true;
      if (value === 'price') {
        const orderToggleInfo = {
          desc: 'asc',
          asc: 'desc'
        }
        // 当第一次切换到价格时，preOrder是空字符串，需要指定成默认降序
        order = orderToggleInfo[preOrder] || 'desc'
        triggerChange = true;
      } else if (preOrderBy === value) {
        triggerChange = false;
      }
      // 非价格时，如果两次切换同一个筛选项，则不触发更新操作
      triggerChange && this.setData({
        orderBy: value,
        order
      }, () => {
        this.triggerEvent('filterChange', { ...this.data })
      })
    },
    // 为了父组件方便的拿到排序信息
    getFilterInfo() {
      let { orderBy, order } = this.data;
      return {
        order,
        orderBy
      };
    }
  }
})
