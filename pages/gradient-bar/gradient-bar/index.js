import versionCompare from '../../../utils/version-compare';
const { SDKVersion, version, statusBarHeight } = wx.getSystemInfoSync();
const showBar = versionCompare(SDKVersion, '2.5.2') || versionCompare(version, '7.0.0');

Component({
  properties: {
    opacity: Number,
    title: String,
    showBackBtn: {
      type: Boolean,
      value: false
    },
    textColor: {
      type: String,
      value: '#333'
    },
    sticky: {
      type: Boolean,
      value: true
    }
  },
  data: {
    top: 0,
    showBack: false,
    showBar: false
  },
  methods: {
    onClickBack() {
      wx.navigateBack();
    }
  },
  attached() {
    const pages = getCurrentPages();
    const { showBackBtn } = this.data;
    console.log('showBack', showBackBtn && pages && pages.length >= 1)
    this.setData({
      showBack: showBackBtn && pages && pages.length >= 1,
      top: statusBarHeight,
      showBar
    });
  }
});
