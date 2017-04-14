var app = getApp()
var utils = require('../../utils/util.js');
Page({
  data: {
    // String1
    formId: "",
    input0: "",
    input1: "",
    access_token: "",

    yue: 0,

    motto: 'Hello World3',
    userInfo: {},
    name: 'wechat',
    ischange: false,
    nickName: ''
  },
  clicktixian: function (e) {
    console.log("点击了提现")
    wx.navigateTo({
      url: '../cash/cash',
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
  clickdetail: function (e) {
    console.log("点击了提现明细")
    wx.navigateTo({
      url: '../cashdetail/cashdetail',
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
  clickbank: function (e) {
    console.log("点击了银行账户")
    wx.navigateTo({
      url: '../bankaccount/bankaccount',
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
  clickus: function (e) {
    console.log("点击了关于我们")
    wx.navigateTo({
      url: '../aboutus/aboutus',
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
  clicklogout: function (e) {
    console.log("点击了退出登录")
    // wx.redirectTo({
    //   url: '../login/login',
    //   success: function (res) {
    //     // success
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
    utils.reLogin();
  },
  formSubmit: function (e) {
    var that = this;
    // console.log('form发生了submit事件，携带数据为：', e.detail);
    that.setData({
      formId: e.detail.formId,
      input0: e.detail.value.input,
      input1: e.detail.value.input11
    })
    console.log('赋值后formId：', that.data.formId);
    // console.log('赋值后：', that.data.input0);
    // console.log('赋值后：', that.data.input1);
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + app.globalData.appid + '&secret=' + app.globalData.secret,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          access_token: res.data.access_token
        });
        console.log('赋值后：', that.data.access_token);
        //发送模板消息
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data.access_token,
          data: {
            touser: app.globalData.openid,
            template_id: app.globalData.template_id,
            form_id: that.data.formId,
            data: {
              keyword1: {
                value: '小小',
                color: '#173177'
              },
              keyword2: {
                // value:utils.formatTime(Date.now()),
                value: utils.formatTime(new Date),
                color: '#62b900'
              },
              keyword3: {
                value: '122222222',
                color: '#000000'
              },
              keyword4: {
                value: 'ADC',
                color: '#ff0000'
              }
            }
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            // success
            console.log(res.data.errmsg)
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    // String2
    //调用应用实例的方法获取全局数据
    let that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        // success
        that.setData({
          nickName: res.data.nickname
        });
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
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
      title: '泊链科技', // 分享标题
      desc: '深圳泊链科技有限公司', // 分享描述
      path: '/pages/me/me' // 分享路径
      
    }
  }
})