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
    loadTime: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
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
    wx.setNavigationBarTitle({
      title: '收银台',
      success: function (res) {
        // success
      }
    })
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

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
  // if ((that.data.totalCount == that.data.info.length) && that.data.totalCount > 0) {
  //             that.setData({
  //           hidden: true,
  //           hiddenin: true,

  //         })
  //   return;
  // }
  let token;
  let parkid;
  wx.getStorage({
    key: 'token',
    success: function (res) {
      // success
      token = res.data;
      wx.request({
        // url: 'https://s.bolink.club/zld/collectorrequest.do?action=getberths&out=josn&token=' + token + '&berthid=1561&devicecode=869323004253387',
        // url: 'https://s.bolink.club/zld/collectorrequest.do?action=orderhistory&token=' + token + '&page=' + page + '&size=' + size + '&uid=454361&day=today&ptype=&version=2&out=json',
        url: app.globalData.url + '/trade/order',
        data: {
          page: page,
          rp: size,
          token: token,
          // park_id:app.globalData.user.parkid,
          // park_id: parkid,
          // role_id: 4
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function (res) {
          // success
           console.log('请求成功');
          console.log(res.data);
          that.setData({
            hidden: true,
            hiddenin: true,

          })
          // var result = res.data;
          // var types = typeof result;
          // if ((types === 'string' && result.indexOf("token is invalid") != -1) || (types === 'object' && result.info.indexOf("token is invalid") != -1)) {
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
            that.data.totalCount = res.data.count;
            if (that.data.totalCount > that.data.info.length) {
              console.log("数组长度" + that.data.info.length + "  总长度" + that.data.totalCount);
              that.setData({
                // berths: res.data.data
                orderNum: res.data.count,
                orderTotal: res.data.money,
                info: that.data.info.concat(res.data.rows),
                loadTime: Date.now()
              });
            }
            if (res.data.rows.length == 0 && that.data.totalCount > 0) {
              wx.showToast({
                title: '已经是最后一条记录',
                icon: 'success',
                duration: 2000
              })
            }
            // if (res.data.info === '没有记录') {
            //   wx.showToast({
            //     title: '已经是最后一条记录',
            //     icon: 'success',
            //     duration: 2000
            //   })
            // }
          }
        },
        fail: function () {
          // fail
           console.log('请求失败');
           utils.reLogin();
        },
        complete: function () {
          // complete
           console.log('请求完成');
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
