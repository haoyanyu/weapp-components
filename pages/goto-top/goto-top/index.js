// pages/goto-top/goto-top/index.js
export default {
  data: {
    goTopThreshold: 0,
    goTopVisiable: false
  },
  component: {
    setThreshold() {
      const that = this;
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            goTopThreshold: res.windowHeight
          });
        }
      });
    },
    handleGoTop(event) {
      wx.pageScrollTo({
        scrollTop: 0
      });

      this.setData({
        goTopVisiable: false
      });
    },
    onPageScroll(event) {
      const currScrollTop = event.scrollTop;
      const goTopThreshold = this.data.goTopThreshold * 2;
      if (currScrollTop > goTopThreshold) {
        if (!this.data.goTopVisiable) {
          this.setData({
            goTopVisiable: true
          })
        }
      } else {
        if (this.data.goTopVisiable) {
          this.setData({
            goTopVisiable: false
          })
        }
      }
    }
  }
};
