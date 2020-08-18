const keyWordList = [
  { id: '64254630ba4317f270c56484f004b34f', key: '水果' },
  { id: '4418ea8dd0bb57c3676656d45ad05332', key: '水杯' },
  { id: '944febfc72bb303ea8bc7f6d7c1cb29f', key: '水滴严选' },
  { id: '657beb5758493bca724bb1eae7bd0de7', key: '水果新鲜' },
  { id: '95d4d2eb18bd0543685a486c2f82540d', key: '水蜜桃' },
  { id: '2f156ed9f1049d94c8d22360d745922a', key: '水杯玻璃' },
  { id: '482eb8314508e8fae8d59e3afcceea08', key: '水龙头' },
  { id: '230b62b61a2812228cd1c5e93273fe00', key: '水乳' },
  { id: 'b6b70110aa37074ed4ad3deff8af0f8f', key: '水貂绒毛衣' },
  { id: 'b10fc53554d425eb784fa53323e87b19', key: '水漾粉底液' }
];
const searchHistory = 'search-history';

Component({
  properties: {
    // 获取关键字列表的接口
    keyWordApi: String
  },
  data: {
    keyWord: '', //搜索关键字
    keywordsList: [], // 关键字列表
    historyWords: [], // 历史搜索记录

    showCancel: false,
    showKeyWordList: false,
    showHistory: false
  },
  lifetimes: {
    attached() {
      this.setData({
        historyWords: this.getHistoryStorage()
      });
    }
  },
  methods: {
    handleKeyWordFocus(e) {
      const {
        currentTarget: {
          dataset: { show }
        }
      } = e;
      // 获取焦点时，判断keyWord是否有值
      // 为空则表示全新的一次搜索，展示历史关键词，隐藏关键词列表
      if (show) {
        this.onLoadKeyWordList();
        this.triggerEvent('focus', {});
      } else {
        // 取消搜索
        // 清空关键字, 隐藏历史记录和关键词列表
        this.triggerEvent('cancel', e.detail);
        this.setData({
          keyWord: '',
          showHistory: false,
          showKeyWordList: false
        });
      }
    },
    handleKeyWordChange(e) {
      const {
        detail: { value }
      } = e;
      this.setData(
        {
          keyWord: value
        },
        this.onLoadKeyWordList
      );
    },
    onLoadKeyWordList() {
      // after keyWordApi()后执行一下赋值
      this.setData({
        keywordsList: keyWordList.map(({ key }) => key),
        showHistory: !this.data.keyWord,
        showKeyWordList: !!this.data.keyWord
      });
    },
    handleClearKeyWord() {
      this.setData(
        {
          keyWord: ''
        },
        this.onLoadKeyWordList
      );
      this.triggerEvent('handleClearKeyWord', {});
    },
    handleKeyWordSearch(e) {
      /** 搜索值两种情况，一种是用户输入搜索，一种是点击标签搜索 */
      const {
        currentTarget: {
          dataset: { keyWord }
        },
        detail: { value: inputVal }
      } = e;
      const value = inputVal || keyWord;
      this.addSearchHistory(value);
      // 隐藏历史记录和关键词列表
      this.setData(
        {
          keyWord: value,
          showHistory: false,
          showKeyWordList: false,
          historyWords: this.getHistoryStorage()
        },
        this.submit
      );
    },
    // 发送搜索信号
    submit() {
      console.log('submit', this.data.keyWord);
      this.triggerEvent('submit', { keyWord: this.data.keyWord });
    },
    handleKeywordsListTap() {},
    // 清空历史搜索记录
    handleClearSearchHistory() {
      wx.showModal({
        content: '确定删除历史浏览记录?',
        success: res => {
          if (res.confirm) {
            wx.setStorageSync(searchHistory, []);
            this.setData({
              historyWords: []
            });
          }
        }
      });
    },
    // 从本地缓存获得历史搜索记录数据
    getHistoryStorage() {
      let historyWords = wx.getStorageSync(searchHistory);
      if (!historyWords || !Array.isArray(historyWords)) {
        historyWords = [];
      }
      return historyWords;
    },
    addSearchHistory(val) {
      if (!val) {
        return;
      }
      let history = this.getHistoryStorage();
      const index = history.indexOf(val);
      /** 去除重复项 */
      if (index !== -1) {
        history.splice(index, 1);
      }
      const len = history.length;
      if (len >= 10) {
        history.pop();
      }
      history.unshift(val);
      wx.setStorageSync(searchHistory, history);
    }
  },
  observers: {
    'showKeyWordList, showHistory': function(showKeyWordList, showHistory) {
      // 在 showKeyWordList, showHistory, keyWord 被设置时，执行这个函数
      const isDoingSearch = showKeyWordList || showHistory;
      const isFinishSearch = !showKeyWordList && !showHistory;
      console.log('isDoingSearch, isFinishSearch', isDoingSearch, isFinishSearch);
      const showCancel = isDoingSearch || !isFinishSearch;
      this.setData({
        showCancel
      });
    }
  }
});
