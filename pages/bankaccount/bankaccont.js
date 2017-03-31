// pages/bankaccount/bankaccont.js
Page({
  data: {
    accoutList: [
      {
        id: 1001,
        cardName: '招商银行',
        cardNum: '1000000****1'
      },
      {
        id: 1002,
        cardName: '华夏银行',
        cardNum: '1000000****2'
      },
      {
        id: 1003,
        cardName: '中信银行',
        cardNum: '1000000****3'
      },
      {
        id: 1004,
        cardName: 'VISA银行',
        cardNum: '1000000****4'
      }
    ]
  },
  clickadd: function (e) {
    wx.navigateTo({
      url: '../bankaccountadd/bankaccontadd',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  clicklist: function (e) {
    console.log(e.currentTarget.id);
    var that = this;
    for (let item of that.data.accoutList) {
      if (item.id == e.currentTarget.id) {
        wx.navigateTo({
          url: '../bankaccountadd/bankaccontadd?id=' + item.id + '&cardName=' + item.cardName + '&cardNum=' + item.cardNum,
          success: function (res) {
            // success
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    }

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})