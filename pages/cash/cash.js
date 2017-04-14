var app = getApp();
var utils = require('../../utils/util.js');
Page({
  data: {
    buttontext: '确认提现',
    account: 0,
    items: [
      { name: 'auto', value: '自动划转', checked: 'true' },
      { name: 'hand', value: '手工提现' },

    ],
    // array: ['卡一', '卡二', '卡三', '卡四'],
    array: [],
    objectArray: [
      {
        "id": '0',
        "name": '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    accoutList: [],
    radioType: 'auto',
    bankAccount: {},
    inputMoney: 0,
    accounttxt: ''
  },
  cashinput: function (e) {
    console.log('input 值 ' + e.detail.value);
    let that = this;
    that.setData({
      inputMoney: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio 选择的项 ' + e.detail.value)
    let that = this;
    let typetxt;
    if (e.detail.value.indexOf('auto') != -1) {
      typetxt = '确认提现'
    } else if (e.detail.value.indexOf('hand') != -1) {
      typetxt = '手续费3元，确认提现'
    }
    that.setData({
      radioType: e.detail.value,
      buttontext: typetxt
    })
  },
  bindPickerChange: function (e) {
    console.log("picker 选择的项：" + e.detail.value)
    let that = this;
    that.setData({
      index: e.detail.value,
      bankAccount: that.data.accoutList[e.detail.value]
    })
    // let account = that.data.accoutList[e.detail.value]
  },
  clickCash: function (e) {
    //点击提现
    let that = this;
    if (that.data.inputMoney < 100) {
      utils.alertDialog('提现金额必须大于100元')
    } else {
      let token;

      wx.getStorage({
        key: 'token',
        success: function (res) {
          // success
          token = res.data;
          wx.request({
            url: app.globalData.url + '/wx/withdrawal',
            data: {
              money: that.data.inputMoney,
              cadid: that.data.bankAccount.card_number,
              token: token
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header

            success: function (res) {
              // success
              if (res.statusCode == 200) {
                utils.alertDialog(res.data.msg)
                if (res.data.state) {
                  that.setData({
                    accounttxt: ''
                  })
                }

              } else {
                utils.alertDialog('请求错误' + res.statusCode)
              }
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


    }
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
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
            token: token,
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header

          success: function (res) {
            // success
            let arr=[];
            let arrs=arr.concat(res.data.rows);
            let arrfor = [];
            for (var i=0;i<arrs.length;i++) {
              let item = arrs[i];
              arrfor.push(item.name + '  ' + item.bank_name)
              console.log(item.name + '  ' + item.bank_name)
            }
            that.setData({
              accoutList: res.data.rows,
              bankAccount: res.data.rows[0],
              array: arrfor
            })

          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
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
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})