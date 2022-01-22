// pages/administrator/student/student.js
const db = wx.cloud.database();
const app = getApp()
Page({
  data: {
    isLoad: true,
  },
  onLoad() {
    var that = this
    db.collection('user').where({
      identity: 'student'
    }).get({
      success: res => {
        console.log(res)
        that.setData({
          student: res.data,
          isLoad: false
        })
      }
    })
  },
  hideModal(){
    this.setData({
      modalName:null
    })
  },
  click(e){
    this.setData({
      modalName: e.currentTarget.dataset.target,
      object: e.currentTarget.dataset.index,
      studentNum: this.data.student[e.currentTarget.dataset.index].account,
      studentName: this.data.student[e.currentTarget.dataset.index].name,
      studentPassword: this.data.student[e.currentTarget.dataset.index].password
    })
  },
  inpu(e) {
    this.setData({
      studentName: e.detail.value
    })
  },
  inpu2(e) {
    this.setData({
      studentNum: e.detail.value
    })
  },
  inpu3(e) {
    this.setData({
      studentPassword: e.detail.value
    })
  },
  insert(){
    if(isNaN(this.data.studentName) || isNaN(this.data.studentNum) || isNaN(this.data.studentPassword)){
      wx.showToast({
        title: '输入错误',
      })
      return;
    }
    wx.showLoading({
      title: '添加中'
    })
    var that=this
    db.collection('user').add({
      data:{
        account: that.data.studentNum,
        name: that.data.studentNum,
        password: that.data.studentPassword,
        identity: 'student'
      },
      success(res){
        console.log(res)
        wx.hideLoading()
        var student=that.data.student
        student.push({
          _id: res._id,
          account: that.data.studentNum,
          identity: 'student',
          name: that.data.studentName,
          password: that.data.studentPassword
        })
        that.setData({
          modalName: null,
          student: student
        })
        wx.showToast({
          title: '添加成功',
        })
      }
    })
  },
  update(){
    var that=this
    var student=this.data.student
    const _ = db.command
    db.collection('user').doc(student[that.data.object]._id).update({
      data:{
        account: _.set(that.data.studentNum),
        name: _.set(that.data.studentName),
        password: _.set(that.data.studentPassword)
      },
      success(){
        student[that.data.object].account=that.data.studentNum
        student[that.data.object].name=that.data.studentName
        student[that.data.object].password=that.data.studentPassword
        that.setData({
          student:student
        })
        that.hideModal()
        wx.showToast({
          title: '修改成功',
        })
      },
      fail:e=>{
        console.log(e)
      }
    })
  },
  delete(){
    console.log(11)
    var student=this.data.student
    var that=this
    db.collection('user').doc(student[that.data.object]._id).remove({
      success(){
        student.splice(that.data.object,1)
        that.setData({
          student: student,
          modalName: null
        })
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  }
})