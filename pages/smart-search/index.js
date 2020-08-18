import money from '../../utils/money';
import str from '../../utils/str';

const randomString = str.makeRandomString(8);
const SIZE = 10;
const goodsList = [
  {
    goodsName: '水晶之绣玻尿酸水滴 爆水霜',
    shopName: '甜蜜优选',
    totalSoldNum: 0
  },
  {
    goodsName: '水肌蔻水幂方沁润美肤水120ML 化妆水',
    shopName: '雅瑞化妆品商店连锁网上商城',
    totalSoldNum: 0
  },
  {
    goodsName: '水密码水漾轻盈气垫cc霜水水兔',
    shopName: '融臻优选',
    totalSoldNum: 8
  },
  {
    goodsName: '康雪鲜蔬菜水库补水洁面乳、 水润肌液、水嫩滑乳液',
    shopName: 'RCJ严选共创店',
    totalSoldNum: 0
  }
];

Page({
  data: {
    goodsList: [],
    showList: false
  },
  onLoad() {
    this.setData({
      goodsList: goodsList.map((item, index) => this.parseGoodsItem(item, index))
    });
  },
  handleSearch(event) {
    console.log('handleSearch', event);
    this.setData({
      showList: false
    });
  },
  handleSubmit(event) {
    const {
      detail: { keyWord }
    } = event;
    this.setData({
      showList: true
    });
    console.log('handleSubmit', event, keyWord);
  },
  handleCancel(event) {
    console.log('handleCancel', event);
  },
  parseGoodsItem(goodsInfo, index) {
    const { umpTypeList = [] } = goodsInfo;
    const curIndex = (this.data.nextPage - 1) * SIZE + index;
    return {
      ...goodsInfo,
      banner_id: `${this.data.pt}~recommend_fixed~${curIndex + 1}~${randomString}`,
      price: money(goodsInfo.activityPrice || goodsInfo.price).toYuan(),
      discount: goodsInfo.discount / 10,
      isDiscount: umpTypeList.includes(0), //限时折扣
      isCoupon: umpTypeList.includes(1), // 优惠券
      isPack: umpTypeList.includes(2), //包邮
      isCheap: goodsInfo.activityPrice < goodsInfo.price // 最终价格是否比原价便宜
    };
  }
});
