var util = require('../../utils/md5.js');
// 获取全局应用程序实例对象
var app = getApp();

function pwdVertify(account, password) {
  //  var password=value.password;  
  if (account === "" || account === null) {
    alert("账号不能为空");
    return "";
  }
  if (password === "" || password === null) {
    alert("密码不能为空");
    return "";
  } else {
    console.log("加密前的pwd:" + password);
    var pwd = util.hexMD5(util.hexMD5(password) + "zldtingchebao201410092009");
    console.log("加密后的pwd:" + pwd);
    return pwd;
  }
}

function alert(message) {
  wx.showModal({
    title: '提示',
    content: message,
    confirmColor: '#118EDE',
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        //console.log('用户点击确定')    
      }
    }
  });
}
// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    loading: false,
    account: "",
    pwd: "",
    md5pwd: "",
    user: {}
  },
  loginbtn: function (e) {
    var that = this;
    that.setData({
      loading: !that.data.loading
    })
    var result = pwdVertify(that.data.account, that.data.pwd);
    that.setData({
      loading: false,
    })
    if (result != "") {
      that.setData({
        loading: false,
        md5pwd: result
      })
      wx.request({
        // url: 'https://s.bolink.club/zld/collectorlogin.do?username=' + this.data.account + '&password=' + this.data.md5pwd + '&version=1410&devicecode=null&out=json',
        url: app.globalData.url + '/user/dologin',
        data: {
          username: that.data.account,
          password: that.data.pwd
          //  username: '10001',
          // password: '123'

        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function (res) {
          // success
          let state = res.data.state;
          if (state) {
            //登录成功
            if (res.data.user.roleid == 4) {
              //角色是4才能登录
              let token = res.data.token;
              // let parkid = res.data.user.parkid;
              let user = res.data.user;
              app.globalData.user = res.data.user;
              that.setData({
                loading: false,
                user: res.data.user
              })
              wx.setStorage({
                key: 'token',
                data: token,
                success: function (res) {
                  // success
                  console.log("token储存成功")
                  wx.setStorage({
                    key: 'user',
                    data: user,
                    success: function (res) {
                      // success
                      wx.switchTab({
                        url: '../index/index',
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
                    fail: function (res) {
                      // fail
                    },
                    complete: function (res) {
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
            } else {
              alert('角色没有权限！');
            }

          } else {
            //登录失败
            alert(res.data.msg);
          }
        },
        fail: function (e) {
          // fail
          console.log("登录失败")
          wx.navigateTo({
            url: '../index/index',
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
        complete: function () {
          // complete
          console.log("登录完成")
        }
      })
    }

  },
  accountconfirm: function (e) {
    console.log("accountconfirm  " + e.detail.value);
    this.setData({
      account: e.detail.value
    })
  },
  accountinput: function (e) {
    console.log("accountinput  " + e.detail.value);
    this.setData({
      account: e.detail.value
    })
  },
  pwdconfirm: function (e) {
    console.log("pwdconfirm  " + e.detail.value);
    this.setData({
      pwd: e.detail.value
    })
    pwdVertify(this.data.account, this.data.pwd)
  },
  pwdinput: function (e) {
    console.log("pwdinput  " + e.detail.value);
    this.setData({
      pwd: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 注册coolsite360交互模块
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 执行coolsite360交互组件展示
    this.setData({
      account: "",
      pwd: ""
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件


})

