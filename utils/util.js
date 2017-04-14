//格式化时间 new Date(item.ctime*1000)
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//双击间隔
function oneSecondClick(times) {
  let nowtime = Date.now();
  // console.log('上次的时间是：'+times)
  // console.log('当前的时间是：'+nowtime)
  if (nowtime - times > 1000) {
    return true;
  } else {
    return false;
  }
}
//弹出提示框
function alertDialog(message) {
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
function reLogin() {
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
}
//导出方法
module.exports = {
  formatTime: formatTime,
  oneSecondClick: oneSecondClick,
  alertDialog: alertDialog,
  reLogin: reLogin
}
