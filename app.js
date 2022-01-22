// app.js
wx.cloud.init({
  env: 'info-7grr62d65d20574d'
});
const db = wx.cloud.database();
App({
  globalData: {
    userInfo: null,
    userOpenId: 0
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // if (wx.cloud) {
    //   wx.cloud.init({
    //     traceUser: true
    //   })
    // }
    var that=this;

    // 登录
    wx.showLoading({
      title: '获取登录状态',
    })
    wx.login({
      success() {
        wx.cloud.callFunction({
          name: 'loginRequest',
          success: function (res) {
            console.log(res.result.userInfo.openId)
            that.globalData.userOpenId = res.result.userInfo.openId
            db.collection('logined').where({
              _openid: res.result.userInfo.openId
            }).get({
              success(res){
                console.log(res)
                if(res.data.length){
                  console.log('登录成功')
                  that.globalData.userInfo=res.data[0]
                }else{
                  console.log('数据库中没有信息')
                  // 跳转登录界面
                  wx.redirectTo({
                    url: '/pages/login/login',
                  })
                }
              }
            })
            wx.hideLoading()
          },
          fail: console.error
        })
      }
    })
  }
})