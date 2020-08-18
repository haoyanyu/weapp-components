import money from '../../utils/money';
import str from '../../utils/str';

const randomString = str.makeRandomString(8);
const SIZE = 10;
const goodsList = [
  {
    alias: '2oj1gtfwkshy7',
    commissionRate: 1000,
    copyToKsGoodsUrl: 'https://shop44743559.m.youzan.com/wscgoods/detail/2oj1gtfwkshy7',
    estimationCommission: 1422,
    goodsName: '水晶之绣玻尿酸水滴 爆水霜',
    goodsUrl: 'https://h5.youzan.com/v2/goods/2oj1gtfwkshy7',
    icClass1Id: 3388,
    icClass1Name: '美妆饰品',
    imageUrl: 'https://img.yzcdn.cn/upload_files/2020/07/15/FvHLrTixjGw508AKYIWVZj_HC5sh.jpg',
    isSaleUp: 0,
    kdtId: 44551391,
    price: 15800,
    promoteEndDate: 253370736000000,
    promoteStartDate: 1596894664768,
    promotionType: 1,
    shopCommissionRate: 1000,
    shopName: '甜蜜优选',
    totalSoldNum: 0
  },
  {
    activityPrice: 15720,
    alias: '2g2sg30w6v877',
    category: '美妆',
    commissionRate: 1500,
    copyToKsGoodsUrl: 'https://shop45923771.m.youzan.com/wscgoods/detail/2g2sg30w6v877',
    discountPrice: 15720,
    estimationCommission: 2122,
    goodsName: '水肌蔻水幂方沁润美肤水120ML 化妆水',
    goodsUrl: 'https://h5.youzan.com/v2/goods/2g2sg30w6v877',
    icClass1Id: 3388,
    icClass1Name: '美妆饰品',
    imageUrl: 'https://img.yzcdn.cn/upload_files/2020/03/06/FgPW5TZpk_MpvaWkbo0AzqiwvZMB.jpg',
    isSaleUp: 0,
    kdtId: 45731603,
    price: 19900,
    promoteEndDate: 253370736000000,
    promoteStartDate: 1585670400000,
    promotionType: 1,
    shopCommissionRate: 1000,
    shopName: '雅瑞化妆品商店连锁网上商城',
    totalSoldNum: 0
  },
  {
    alias: '277qreqjfcmbf',
    commissionRate: 10,
    copyToKsGoodsUrl: 'https://shop44667923.m.youzan.com/wscgoods/detail/277qreqjfcmbf',
    estimationCommission: 5,
    goodsName: '水密码水漾轻盈气垫cc霜水水兔',
    goodsUrl: 'https://h5.youzan.com/v2/goods/277qreqjfcmbf',
    icClass1Id: 3388,
    icClass1Name: '美妆饰品',
    imageUrl: 'https://img.yzcdn.cn/upload_files/2020/03/22/FgVb6gATMM4CQljQnGTCZtL-PaZQ.jpg',
    isSaleUp: 0,
    kdtId: 44475755,
    price: 5900,
    promoteEndDate: 253370736000000,
    promoteStartDate: 1596894664768,
    promotionType: 1,
    shopCommissionRate: 10,
    shopName: '融臻优选',
    totalSoldNum: 8
  },
  {
    alias: '1y5dsh82xht7s',
    commissionRate: 10,
    copyToKsGoodsUrl: 'https://shop45898016.m.youzan.com/wscgoods/detail/1y5dsh82xht7s',
    estimationCommission: 5,
    goodsName: '康雪鲜蔬菜水库补水洁面乳、 水润肌液、水嫩滑乳液',
    goodsUrl: 'https://h5.youzan.com/v2/goods/1y5dsh82xht7s',
    icClass1Id: 3388,
    icClass1Name: '美妆饰品',
    imageUrl: 'https://img.yzcdn.cn/upload_files/2020/03/11/FmFRLpGhLrNCejhAfaBt89cKclUw.jpg',
    isSaleUp: 0,
    kdtId: 45705848,
    price: 5800,
    promoteEndDate: 253370736000000,
    promoteStartDate: 1596894664768,
    promotionType: 1,
    shopCommissionRate: 10,
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
