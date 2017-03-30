//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    scrollHeight: 0,
    scrollTop: 0,
    hidden: true,
    hiddenin: true,
    page: 1,
    size: 5,
    motto: 'Hello World1',
    userInfo: {},
    berths: [],
    info: [],
    result: null,
    orderNum:405,
    orderTotal:533
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
    wx.showToast({
      title: '已经是最后一条了',
      icon: 'success',
      duration: '2000'
    })
    var that = this;
    that.setData({
      page: that.data.page + 1,
      hiddenin: false
    })

    loadData(this.data.size, this.data.page, this);

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
    loadData(this.data.size, this.data.page, this);
    wx.getSystemInfo({
      success: function (res) {
        // success
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })
  }

})

function loadData(size, page, that) {
  var token = "";
  wx.getStorage({
    key: 'token',
    success: function (res) {
      // success
      token = res.data;
      wx.request({
        // url: 'https://s.bolink.club/zld/collectorrequest.do?action=getberths&out=josn&token=' + token + '&berthid=1561&devicecode=869323004253387',
        url: 'https://s.bolink.club/zld/collectorrequest.do?action=orderhistory&token=' + token + '&page=' + page + '&size=' + size + '&uid=454361&day=last&ptype=&version=2&out=json',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          console.log(res.data);
          that.setData({
            hidden: true,
            hiddenin: true
          })
          var result = res.data;
          var types = typeof result;
          if ((types === 'string' && result.indexOf("token is invalid") != -1) || (types === 'object' && result.info.indexOf("token is invalid") != -1)) {
            console.log("token is invalid")
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
            var count = res.data.count;
            if (count > that.data.info.length) {
              console.log("数组长度" + that.data.info.length + "  总长度" + count);
              that.setData({
                // berths: res.data.data
                result: res.data,
                info: that.data.info.concat(res.data.info)
              });
            }
            if (res.data.info === '没有记录') {
              wx.showToast({
                title: '已经是最后一条记录',
                icon: 'success',
                duration: 2000
              })
            }
          }
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
