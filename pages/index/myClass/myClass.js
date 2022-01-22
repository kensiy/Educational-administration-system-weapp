// pages/index/myClass/myClass.js
const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course_info: [],
    isLoad: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection("course_info").get({
      success: function (res) {
        console.log(res)
        var course_info=[]
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].student.indexOf(app.globalData.userInfo.name) != -1) {
            course_info.push(res.data[i])
          }
        }
        that.setData({
          course_info: course_info,
          isLoad: false
        })
      },
      fail: e => {
        console.log(e)
      }
    })
  },
})