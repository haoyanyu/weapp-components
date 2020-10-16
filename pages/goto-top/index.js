// pages/goto-top/index.js
import GoTop from './goto-top/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: new Array(140),
    ...GoTop.data
  },

  onLoad() {
    this.setThreshold()
  },
  ...GoTop.component
})