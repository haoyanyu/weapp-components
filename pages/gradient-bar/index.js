import throttle from '../../utils/throttle';
const SCROLL_TOP_OFFSET = 200;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0,
    list: new Array(40)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  onPageScroll(evt) {
    throttle(this.handleScroll.bind(this), 300)(evt);
  },

  handleScroll({ scrollTop }) {
    if (scrollTop > SCROLL_TOP_OFFSET && this.data.opacity === 1) {
      // 不需要再计算
      return;
    }
    let opacity = scrollTop / SCROLL_TOP_OFFSET;
    if (scrollTop > SCROLL_TOP_OFFSET) {
      opacity = 1;
    }

    this.setData({ opacity });
  }
})