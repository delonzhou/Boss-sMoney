Page({
  data: {
    buttontext:'确认提现',
    account:0,
    items: [
      { name: 'auto', value: '自动划转' , checked: 'true'},
      { name: 'hand', value: '手工提现' },

    ],
    array: ['卡一', '卡二', '卡三', '卡四'],
    objectArray: [
      {
        "id": '0',
        "name": '美国'
      }
      // ,
      // {
      //   id: 1,
      //   name: '中国'
      // },
      // {
      //   id: 2,
      //   name: '巴西'
      // },
      // {
      //   id: 3,
      //   name: '日本'
      // }
    ],
    index: 0,
  },
  radioChange:function(e){
    console.log('radio 选择的项 '+e.detail.value)
  },
  bindPickerChange:function(e){
    console.log("picker 选择的项："+e.detail.value)
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    // String2
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    // String3
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    // String4
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    // String5
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    // String6
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    // String7
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    // String8
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})