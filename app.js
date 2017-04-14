//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log("登录接口 code：" + res.code)
          //调用request请求api转换登录凭证  
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.globalData.appid + '&secret=' + that.globalData.secret + '&grant_type=authorization_code&js_code=' + res.code,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
                 that.globalData.openid=res.data.openid,
                 that.globalData.session_key=res.data.session_key
                 console.log("登录接口转换登录凭证：" + that.globalData.openid+'  '+that.globalData.session_key)
               
            },
            fail: function () {
              // fail
              console.log("登录接口转换登录凭证：fail")
            },
            complete: function () {
              // complete
              console.log("登录接口转换登录凭证：complete")
            }
          })
          //获取用户信息
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo

              console.log("登录接口 ：" + res.userInfo)
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    appid: 'wx8e7f7621a22ce888',
    secret: 'd9f2f0c58acb70f1e1ace43799f07c5b',
    template_id:'8IrDcZwC4QWxUwywOm_gMqb2YwqpiobNYPo_gqA3Y-s',
    openid:'',
    session_key:'',
    user:{},
    url:'https://s.bolink.club/web'
    // url:'http://yxiudongyeahnet.vicp.cc:50803/cms-web'
  } 
})