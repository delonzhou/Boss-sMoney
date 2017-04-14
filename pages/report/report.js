//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js');
Page({
  data: {
    scrollHeight: 0,
    scrollTop: 0,
    hidden: true,
    hiddenin: true,
    page: 1,
    size: 20,
    motto: 'Hello World1',
    userInfo: {},
    berths: [],
    info: [],
    result: null,
    orderNum: 0,
    orderTotal: 0,
    totalCount: 0,
    loadTime: 0,
    cashDetail: [
      {
        typeName: '自动提现',
        types: 2,
        yue: 0,
        date: '2017-4-1 12:45:22',
        cash: 2500
      },
      {
        typeName: '每日结算',
        types: 1,
        yue: 2500,
        date: '2017-4-1 00:00:22',
        cash: 500
      }
    ]
  },
  //下拉刷新
  onPullDownRefresh: function () {

  },
  //滚动触发
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  //滑动到顶部刷新
  scrolltop: function (e) {
    var that = this;
    that.setData({
      page: 1,
      info: [],
      hidden: false
    })
    loadData(this.data.size, this.data.page, this);
    console.log("滑到到顶部了" + that.data.page);
  },
  //滑动到底部触发加载更多
  scrollbottom: function (e) {
    var that = this;
    if (utils.oneSecondClick(that.data.loadTime)) {
      if ((that.data.totalCount == that.data.info.length) && that.data.totalCount > 0) {
        wx.showToast({
          title: '已经是最后一条了',
          icon: 'success',
          duration: 2000
        })
      } else {
        var that = this;
        that.setData({
          page: that.data.page + 1,
          hiddenin: false
        })

        loadData(this.data.size, this.data.page, this);
      }
    } else {
      console.log("多余的加载" + that.data.page)
      that.setData({
        loadTime: Date.now()
      })
    }
    console.log("滑到到底部了" + that.data.page)
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        // success
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
    loadData(this.data.size, this.data.page, this);
  }

})

function loadData(size, page, that) {
  let token;
  let parkid;
  wx.getStorage({
    key: 'token',
    success: function (res) {
      // success
      token = res.data;
      // success
      parkid = res.data;
      wx.request({
        url: app.globalData.url + '/trade/moneyrecord',
        data: {
          page: page,
          rp: size,
          token: token,
          dtype: 3,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function (res) {
          // success
          if (res.statusCode == 200) {
            that.setData({
              hidden: true,
              hiddenin: true,

            })
            if (res.data.validate == 1) {
              console.log("token is invalid validate==1")
              wx.redirectTo({
                url: '../login/login',
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
            } else {
              // wx.stopPullDownRefresh();
              // return res.data.info;
              // that.data.totalCount = res.data.count;
              // if (that.data.totalCount > that.data.info.length) {
              // console.log("数组长度" + that.data.info.length + "  总长度" + that.data.totalCount);
             
              // }
              if (res.data.rows.length == 0 && that.data.totalCount > 0) {
                wx.showToast({
                  title: '已经是最后一条记录',
                  icon: 'success',
                  duration: 2000
                })
              }else{
 let arrs = res.data.rows;
              for (let item of arrs) {
                item.ctime = utils.formatTime(new Date(item.ctime * 1000))
              }
              that.setData({
                // berths: res.data.data
                orderNum: res.data.count,
                orderTotal: res.data.money,
                info: that.data.info.concat(arrs),
                loadTime: Date.now()
              });
              }
            }
          } else {
            utils.alertDialog('请求错误' + res.statusCode)
          }


        },
        fail: function () {
          // fail
         utils.reLogin();
        },
        complete: function () {
          // complete
        }
      })

    },
    fail: function () {
      // fail
      utils.reLogin();
    },
    complete: function () {
      // complete
    }
  })
}
