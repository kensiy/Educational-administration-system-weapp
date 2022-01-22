// pages/login/login.js
const app = getApp();
// wx.cloud.init({
//   env: 'info-7grr62d65d20574d'
// });
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoUrl: 'https://upload.shejihz.com/2019/03/657d3f737fbdd9e77cf25bbc2b0c419e.jpg'
  },

  onShow(){
    wx.hideHomeButton()
    console.log(2)
  },

  loginForm: function (res) {
    wx.showLoading({
      title: '登录中',
    })
    // console.log(res.detail.value.accountIn)
    // console.log(res.detail.value.passwordIn)
    db.collection('user').where({
      account: res.detail.value.accountIn,
      password: res.detail.value.passwordIn
    }).get({
      success: res2 => {
        // console.log(res2)
        if (res2.data.length == 0) {
          wx.hideLoading()
          wx.showToast({
            title: '账号或密码错误',
            icon: 'error'
          })
        } else {
          console.log('信息输入正确')
          app.globalData.userInfo = res2.data[0]
          db.collection('logined').add({
            data: {
              account: res.detail.value.accountIn,
              name: res2.data[0].name,
              identity: res2.data[0].identity
            },
            success:function() {
              console.log('success')
              wx.hideLoading()
              wx.switchTab({
                url: '/pages/index/index',
              })
              wx.showToast({
                title: '登录成功',
              })
            },
            fail:function(e){
              console.log(e)
            }
          })
        }
      }
    })
    // console.log(res.detail.value)
  }
})