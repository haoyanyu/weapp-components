const allList = [
  {
    url: 'https://b.yzcdn.cn/public_files/80cf177b3a35cf5178796201aac340fc.jpeg',
    id: 1
  },
  {
    url: 'https://su.yzcdn.cn/public_files/0dfc4f43cdb32d14f1233673a112298a.jpeg',
    id: 2
  },
  {
    url: 'https://su.yzcdn.cn/public_files/30c5aeb6fd96e3c06f705936d8981e7f.png',
    id: 3
  },
  {
    url: 'https://su.yzcdn.cn/public_files/e31bb6573c019a80160c6fab799ab7ee.jpeg',
    id: 4
  },
  {
    url: 'https://su.yzcdn.cn/public_files/6486b02fac5a59999c75629e5db4ff7d.jpeg',
    id: 5
  },
  {
    url: 'https://b.yzcdn.cn/public_files/fb01ba017d337f2e4814713122f54d92.jpeg',
    id: 6
  },
  {
    url: 'https://su.yzcdn.cn/public_files/3a1c462d27bdbe72d1e8a1d60c7e060c.png',
    id: 7
  },
  {
    url: 'https://b.yzcdn.cn/public_files/0dfc4f43cdb32d14f1233673a112298a.jpeg',
    id: 8
  },
  {
    url: 'https://su.yzcdn.cn/public_files/30c5aeb6fd96e3c06f705936d8981e7f.png',
    id: 9
  },
  {
    url: 'https://su.yzcdn.cn/public_files/e7bd800df957a043bc06ad7fcf2aa1ef.jpeg',
    id: 10
  },
  {
    url: 'https://su.yzcdn.cn/public_files/e31bb6573c019a80160c6fab799ab7ee.jpeg',
    id: 11
  },
  {
    url: 'https://su.yzcdn.cn/public_files/0dfc4f43cdb32d14f1233673a112298a.jpeg',
    id: 12
  },
  {
    url: 'https://su.yzcdn.cn/public_files/74a1e0d97ce01e59dfbfa48c665fb550.jpeg',
    id: 13
  },
  {
    url: 'https://su.yzcdn.cn/public_files/6486b02fac5a59999c75629e5db4ff7d.jpeg',
    id: 14
  },
  {
    url: 'https://su.yzcdn.cn/public_files/fb01ba017d337f2e4814713122f54d92.jpeg',
    id: 15
  },
]

Page({
  data: {
    allList,
    list: new Array(7),
    imgListLeft: [],
    imgListRight: [],
    leftHeight: 0,
    rightHeight: 0,
    realWidth: 1,
  },

  onLoad() {
    wx.getSystemInfo({
      success: (result) => {
        const { screenWidth } = result;
        const realWidth = 320 * screenWidth / 750;
        this.setData({
          realWidth
        })
      },
    })
  },

  handleLoad(event) {
    let indexStr = event.currentTarget.id.match(/index(\d+)/)[1] || '';
    const index = Number(indexStr);

    const { height, width } = event.detail;
    const { leftHeight, rightHeight, imgListLeft, imgListRight, allList, realWidth } = this.data;
    if (leftHeight <= rightHeight) {
      this.setData({
        leftHeight: leftHeight + height * (realWidth / width),
        imgListLeft: [...imgListLeft, { ...allList[index] }]
      })
    } else {
      this.setData({
        rightHeight: rightHeight + height * (realWidth / width),
        imgListRight: [...imgListRight,{ ...allList[index] }]
      })
    }
    console.log(leftHeight, rightHeight)
  }
})