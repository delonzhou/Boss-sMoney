// pages/bankaccountadd/bankaccontadd.js
var app = getApp();
var utils = require('../../utils/util.js');
Page({
  data: {
    cardName: '',
    cardNum: '',
    userName: '',

    addVisible: 'display:block',
    editVisible: 'display:none'
  },
  clickadd: function (e) {
    console.log('点击了add ' + e.detail.value)
  },
  clickedit: function (e) {
    console.log('点击了edit ' + e.detail.value)
  },
  submitform: function (e) {
    let that = this;
    that.setData({
      cardName: e.detail.value.cardName,
      cardNum: e.detail.value.cardNum,
      userName: e.detail.value.userName
    })
    console.log('表单提交了 ' + e.detail.value)
    sendModelMSG(e.detail.formId,that.data.userName,that.data.cardName,that.data.cardNum)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    if (typeof (options.id) != 'undefined') {
      console.log(options.id)
    }
    if (typeof (options.cardName) != 'undefined' && typeof (options.cardNum) != 'undefined' && typeof (options.userName) != 'undefined') {
      console.log(options.cardName);
      console.log(options.cardNum);
      console.log(options.userName);
      that.setData({
        cardName: options.cardName,
        cardNum: options.cardNum,
        userName: options.userName,
        editVisible: 'display:block',
        addVisible: 'display:none',
      })
    }

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

function sendModelMSG(formId, name, cardName, cardNum) {
  let access_token;
  wx.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + app.globalData.appid + '&secret=' + app.globalData.secret,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      access_token = res.data.access_token
      console.log('access_token赋值后：', access_token);
      //发送模板消息
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
        data: {
          touser: app.globalData.openid,
          template_id: app.globalData.template_id,
          form_id: formId,
          data: {
            keyword1: {
              value: name,
              color: '#173177'
            },
            keyword2: {
              // value:utils.formatTime(Date.now()),
              value: utils.formatTime(new Date),
              color: '#173177'
            },
            keyword3: {
              value: cardNum,
              color: '#173177'
            },
            keyword4: {
              value: cardName,
              color: '#173177'
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
}