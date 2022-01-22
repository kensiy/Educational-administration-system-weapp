// pages/my/my.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  onLoad: function () {
    var tag = null
    if (app.globalData.userInfo.identity == 'student') {
      tag = {
        identity: '学生',
        color: 'green'
      }
    } else if (app.globalData.userInfo.identity == 'teacher') {
      tag = {
        identity: '教师',
        color: 'blue'
      }
    } else {
      tag = {
        identity: '管理员',
        color: 'red'
      }
    }
    this.setData({
      tag: tag
    })
  },

  scanCode: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },

  logOut: function () {
    wx.showLoading({
      title: '退出登录中',
    })
    console.log(app.globalData.userInfo)
    db.collection('logined').where({
      _openid: app.globalData.userOpenId
    }).remove({
      success: function () {
        wx.hideLoading()
        wx.redirectTo({
          url: '/pages/login/login',
        })
      },
      fail: e => {
        console.log(e)
      }
    })
  }
})