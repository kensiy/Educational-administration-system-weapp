// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elements: [{
        title: '成绩查询',
        name: 'score',
        color: 'cyan',
        icon: 'newsfill',
        path: './Score/Score'
      },
      {
        title: '我的课程',
        name: 'class',
        color: 'blue',
        icon: 'likefill',
        path: './myClass/myClass'
      },
      {
        title: '自主选课',
        name: 'select',
        color: 'purple',
        icon: 'roundcheckfill',
        path: './Select/Select'
      },
    ],
    elements2: [{
        title: '学生管理',
        name: 'student',
        color: 'cyan',
        icon: 'newsfill',
        path: '/pages/teacher/studentManage/studentManage'
      },
      {
        title: '课程管理',
        name: 'class',
        color: 'blue',
        icon: 'roundcheckfill',
        path: '/pages/teacher/classManage/classManage'
      }
    ],
    elements3: [{
      title: '学生管理',
      name: 'student',
      color: 'cyan',
      icon: 'newsfill',
      path: '/pages/administrator/student/student'
    },
    {
      title: '教师管理',
      name: 'teacher',
      color: 'blue',
      icon: 'newsfill',
      path: '/pages/administrator/teacher/teacher'
    },
    {
      title: '课程管理',
      name: 'class',
      color: 'purple',
      icon: 'newsfill',
      path: '/pages/administrator/allClass/allClass'
    },
  ],
  },
  getIdentity: function () {
    if (app.globalData.userInfo == null) {
      setTimeout(() => {
        this.getIdentity();
      }, 200)
    } else {
      this.setData({
        identity: app.globalData.userInfo.identity
      })
    }
  },
  onShow: function () {
    this.getIdentity()
  }
})