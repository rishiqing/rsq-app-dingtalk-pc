import { Promise } from 'es6-promise'
import Vue from 'vue'
import mapping from './urlMapping'
import util from 'ut/jsUtil'
import dateutil from 'ut/dateUtil'
export default {
  /**
   * 获取收纳箱中的任务
   * @returns {*}
   */
  getInboxTodos () {
    return new Promise((resolve, reject) => {
      Vue.http.get(mapping.GET_INBOX_TODOS)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getFileFromAli (props) {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.GET_FILE_FROM_AlI, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  /**
   * 获取指定日程中的任务
   * @returns {*}
   */
  getScheduleTodos (params) {
    params.isFrom = 'web'
    params.isGetDelay = true
    let path = mapping.GET_SCHEDULE_TODOS + '?' + util.combineUrlParams(params)
    return new Promise((resolve, reject) => {
      Vue.http.get(path)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getTodo (params) {
    var path = util.replaceUrlParams(mapping.GET_TODO, params)
    path = path + '?' + util.combineUrlParams(params)
    return new Promise((resolve, reject) => {
      Vue.http.get(path)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          // console.log('没拿到数据') 留待测试
          // console.log('上面是跳转')
          reject(err.body)
        })
    })
  },
  postNewTodo (props) {
    console.log('props是' + JSON.stringify(props))
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.POST_NEW_TODO, props)
        .then(res => {
          console.log('返回来的resshi ' + (res))
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  postSubTodo (props) {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.POST_SUB_TODO, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  putTodoProps (props) {
    var path = util.replaceUrlParams(mapping.PUT_TODO_PROP, props)
    return new Promise((resolve, reject) => {
      Vue.http.put(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  putSubTodoProps (props) {
    var path = util.replaceUrlParams(mapping.POST_SUBTODO_PROP, props)
    return new Promise((resolve, reject) => {
      Vue.http.put(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  putSubTodoPropsCheck (props) {
    var path = util.replaceUrlParams(mapping.POST_SUBTODO_PROP, props)
    return new Promise((resolve, reject) => {
      Vue.http.put(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  deleteTodo (props) {
    var path = util.replaceUrlParams(mapping.DELETE_TODO, props)

    return new Promise((resolve, reject) => {
      Vue.http.delete(path)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  deleteRepeatTodo (props) {
    var path = mapping.DELETE_REPEAT_TODO + '?' + util.combineUrlParams(props)
    return new Promise((resolve, reject) => {
      Vue.http.delete(path)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  deleteCommentItem (props) {
    var path = util.replaceUrlParams(mapping.DELETE_COMMENT_TODO, props)
    console.log('删除评论路径是' + path)
    return new Promise((resolve, reject) => {
      Vue.http.delete(path)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  deleteSubTodo (props) {
    var path = util.replaceUrlParams(mapping.DELETE_SUB_TODO, props)
    return new Promise((resolve, reject) => {
      Vue.http.delete(path)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getDatesHasTodo (props) {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.POST_DATES_HAS_TODO, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  postComment (props) {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.POST_TODO_COMMENT, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  postdesp (props) {
    var path = util.replaceUrlParams(mapping.POST_DESP, props)
    return new Promise((resolve, reject) => {
      Vue.http.put(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  putRecordProps (props) {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.POST_RECORD_COMMENT, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  changeScheTitle (props) {
    var path = util.replaceUrlParams(mapping.CHANGE_SCHE_TITLE, props)
    // console.log('prps是' + JSON.stringify(props))
    return new Promise((resolve, reject) => {
      Vue.http.put(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  createScheTitle (props) {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.CREATE_SCHE_TITLE, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  changePriority (props) {
    var path = util.replaceUrlParams(mapping.POST_DESP, props)
    // console.log('prps是' + JSON.stringify(props))
    return new Promise((resolve, reject) => {
      Vue.http.put(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getAllTodoTitleList () {
    return new Promise((resolve, reject) => {
      Vue.http.get(mapping.GET_TODO_TITLE + '?_=' + new Date().getTime())
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getItem (item) {
    // console.log('id是' + item.id)
    var time = dateutil.getStandardTime(new Date())
    var path = util.replaceUrlParams(mapping.POST_DESP, item) + '?createTaskDate=' + time
    return new Promise((resolve, reject) => {
      Vue.http.get(path, item)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getPlans () {
    return new Promise((resolve, reject) => {
      Vue.http.get(mapping.GET_PLANS)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getSubPlans (item) {
    return new Promise((resolve, reject) => {
      var path = util.replaceUrlParams(mapping.GET_SUBPLAN, item.defaultItem) // 注意虽然要在最后加ID，可是传的仍然是整个item,有机会看下replaceUrlParams实现
      // console.log('路径是' + path)
      Vue.http.get(path, item.defaultItem)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getCard (item) {
    return new Promise((resolve, reject) => {
      var path = util.replaceUrlParams(mapping.GET_CARD, item)
      Vue.http.get(path, item)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  moveToPlan (props) {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.MOVE_TO_KANBAN, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  changeOrder (props) {
    var path = util.replaceUrlParams(mapping.PUT_TODO_PROP, props)
    // console.log('prps是' + JSON.stringify(props))
    return new Promise((resolve, reject) => {
      Vue.http.put(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  getRecord (props) {
    return new Promise((resolve, reject) => {
      var path = mapping.GET_RECORD + '?id=' + props.id
      Vue.http.get(path)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  },
  copy (props) {
    return new Promise((resolve, reject) => {
      var path = mapping.COPY
      Vue.http.post(path, props)
        .then(res => {
          resolve(res.json())
        }, err => {
          window.rsqadmg.log(JSON.stringify(err))
          reject(err)
        })
    })
  }
}
