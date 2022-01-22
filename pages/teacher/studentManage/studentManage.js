// pages/teacher/studentManage/studentManage.js
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
  getStudentInfo(){
    db.collection('user').where({
      identity: 'student'
    }).get({
      success: res=>{
        // console.log(res)
        app.globalData.student=res.data
      }
    })
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
          if (res.data[i].teacher == app.globalData.userInfo.name) {
            course_info.push(res.data[i])
          }
        }
        app.globalData.course_info=course_info
        that.getStudentInfo()
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
  click: e=>{
    app.globalData.index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: './mark/mark',
    })
  }
})