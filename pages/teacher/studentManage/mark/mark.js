// pages/teacher/studentManage/mark/mark.js
const app = getApp()
const db = wx.cloud.database()
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
  onLoad: function () {
    const data = app.globalData
    var course_info = app.globalData.course_info
    var num = [] // 学号
    for (let i = 0; i < course_info[data.index].student.length; i++) {
      for (let j = 0; j < data.student.length; j++) {
        if (data.student[j].name == course_info[data.index].student[i]) {
          num.push(data.student[j].account)
          break
        }
      }
    }
    this.setData({
      student: course_info[data.index].student,
      num: num,
    })
    var newScore= new Array(course_info[data.index].student.length).fill(null)
    var that=this
    db.collection('score').where({
      course: course_info[data.index]._id,
      teacher: app.globalData.userInfo.name
    }).get({
      success:res=>{
        for(let i=0;i<res.data.length;i++){
          for (let j = 0; j < data.student.length; j++) {
            if (data.student[j].name == res.data[i].student) {
              newScore[j]=res.data[i].score
              break
            }
          }
        }
        that.setData({
          newScore:newScore
        })
      }
    })
    wx.setNavigationBarTitle({
      title: course_info[data.index]._id,
    })
  },
  click: function (e) {
    console.log(this.data.student[e.currentTarget.dataset.index])
    this.setData({
      modalName: e.currentTarget.dataset.target,
      studentName: this.data.student[e.currentTarget.dataset.index]
    })
  },
  hideModal() {
    this.setData({
      modalName: null
    })
  },
  inpu(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  getmark() {
    var value = Number(this.data.inputValue)
    if (isNaN(value) || value < 0 || value > 100) {
      wx.showToast({
        title: '输入错误',
        icon: 'error'
      })
      return;
    }
    this.hideModal()
    var that = this
    db.collection('score').where({
      student: that.data.studentName,
      course: app.globalData.course_info[app.globalData.index]._id
    }).get({
      success: res => {
        if (res.data.length > 0) {
          db.collection('score').doc(res.data[0]._id).remove({
            success() {
              db.collection('score').add({
                data: {
                  course: app.globalData.course_info[app.globalData.index]._id,
                  teacher: app.globalData.userInfo.name,
                  student: that.data.studentName,
                  score: value,
                  credit: app.globalData.course_info[app.globalData.index].credit,
                },
                success() {
                  wx.showToast({
                    title: '操作成功',
                  })
                  var newScore = that.data.newScore
                  newScore[app.globalData.index] = value
                  that.setData({
                    newScore: newScore
                  })
                }
              })
            }
          })
        } else {
          db.collection('score').add({
            data: {
              course: app.globalData.course_info[app.globalData.index]._id,
              teacher: app.globalData.userInfo.name,
              student: that.data.studentName,
              score: value,
              credit: app.globalData.course_info[app.globalData.index].credit,
            },
            success() {
              wx.showToast({
                title: '操作成功',
              })
            }
          })
        }
      }
    })
  }
})