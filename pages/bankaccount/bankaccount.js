// pages/bankaccount/bankaccont.js
var app = getApp();
Page({
  data: {
    // accoutList: [
    //   {
    //     id: 1001,
    //     cardName: '招商银行',
    //     cardNum: '1000000****1',
    //     userName: '*一'
    //   },
    //   {
    //     id: 1002,
    //     cardName: '华夏银行',
    //     cardNum: '1000000****2',
    //     userName: '*二'
    //   },
    //   {
    //     id: 1003,
    //     cardName: '中信银行',
    //     cardNum: '1000000****3',
    //     userName: '*三'
    //   },
    //   {
    //     id: 1004,
    //     cardName: 'VISA银行',
    //     cardNum: '1000000****4',
    //     userName: '*四'
    //   }
    // ]
    accoutList: []
  },
  clickadd: function (e) {
    wx.navigateTo({
      url: '../bankaccountadd/bankaccountadd',
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
          url: '../bankaccountadd/bankaccountadd?id=' + item.id + '&cardName=' + item.bank_name + '&cardNum=' + item.card_number + '&userName=' + item.name,
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
    // 页面显示 每次打开页面都会调用
    let that = this;
    let token;
 
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // success
        token = res.data;
       
            wx.request({
              url: app.globalData.url + '/account/querycard',
              data: {
                // name: e.detail.value.userName,
                // card_number: e.detail.value.cardNum,
                // bank_name: e.detail.value.cardName,
                token: token,
                // park_id: parkid,
                // role_id: 4
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              }, // 设置请求的 header
              success: function (res) {
                // success
                that.setData({
                  accoutList: res.data.rows
                })

              },
              fail: function (res) {
                // fail
                utils.reLogin();
              },
              complete: function (res) {
                // complete
              }
            })
          },
          fail: function (res) {
            // fail
            utils.reLogin();
          },
          complete: function (res) {
            // complete
          }
        })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})