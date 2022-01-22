// pages/index/Select/Select.js
const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course_info: [],
    isLoad: true,
    Selected: null,
    loadProgress:0,
    state: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    db.collection("course_info").get({
      success: function (res) {
        console.log(res)
        var Selected = new Array(res.data.length).fill(false)
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].student.indexOf(app.globalData.userInfo.name) != -1) {
            Selected[i] = true
          }
        }
        that.setData({
          course_info: res.data,
          isLoad: false,
          Selected: Selected
        })
      },
      fail: e => {
        console.log(e)
      }
    })
  },

  loadProgress(){
    this.setData({
      loadProgress: this.data.loadProgress+10
    })
    if (this.data.state==false && this.data.loadProgress<100){
      setTimeout(() => {
        this.loadProgress();
      }, 100)
    } else if(this.data.state){
      this.setData({
        loadProgress: 0,
        state: false
      })
    }
  },

  click: function (e) {
    if(app.globalData.userInfo.name==null){
      wx.showToast({
        title: '操作失败',
      })
      return;
    }
    this.loadProgress()
    var that = this
    var index = e.currentTarget.dataset.index
    var Selected = that.data.Selected
    var student = this.data.course_info[index].student
    if (Selected[index]) {
      student.splice(student.indexOf(app.globalData.userInfo.name), 1)
    } else {
      student.push(app.globalData.userInfo.name)
    }
    // 写入数据库
    db.collection('course_info').doc(that.data.course_info[index]._id).update({
      data: {
        student: student
      },
      success: function () {
        wx.showToast({
          title: Selected[index] ? '退选成功' : '选课成功',
        })
        Selected[index] = !Selected[index]
        that.setData({
          Selected: Selected,
          student: student,
          state: true
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})