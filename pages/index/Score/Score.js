// pages/index/Score/Score.js
const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: [],
    isLoad: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection("score").where({
      student: app.globalData.userInfo.name
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          score: res.data,
          isLoad: false
        })
      },
      fail: e => {
        console.log(e)
      }
    })
  },
})