import { Promise } from 'es6-promise'
import Vue from 'vue'
import mapping from './urlMapping'

export default {
  checkAuth () {
    return new Promise((resolve, reject) => {
      Vue.http.post(mapping.CHECK_AUTH)
        .then((res) => {
          resolve(res.json())
        }, (res) => {
          window.rsqadmg.log('login error:' + JSON.stringify(res))
          reject(res)
        })
    })
  },
  login ({username, password}) {
    return new Promise((resolve, reject) => {
      var obj = {
        j_username: username, j_password: password, _spring_security_remember_me: true
      }
      Vue.http.post(mapping.POST_LOGIN, obj, {
        emulateJSON: true,
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then((res) => {
          resolve(res.json())
        }, (res) => {
          window.rsqadmg.log('login error:' + JSON.stringify(res))
          reject(res)
        })
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      Vue.http.get(mapping.GET_LOGOUT)
        .then((res) => {
          window.rsqadmg.log('response.status:' + res.status)
          resolve(res)
        }, (res) => {
          window.rsqadmg.log('login error:' + JSON.stringify(res))
          reject(res)
        })
    })
  },
  fetchTodoTitleList () {
    return new Promise((resolve, reject) => {
      Vue.http.get(mapping.GET_TODO_TITLE)
        .then((res) => {
          resolve(res.json())
        }, (res) => {
          window.rsqadmg.log('login error:' + JSON.stringify(res))
          reject(res)
        })
    })
  },
  fetchStaffList () {
    return new Promise((resolve, reject) => {
      Vue.http.get(mapping.GET_STAFF_LIST)
        .then((res) => {
          resolve(res.json())
        }, (res) => {
          window.rsqadmg.log('login error:' + JSON.stringify(res))
          reject(res)
        })
    })
  },
  /**
   * 上传到本地，已废弃
   * @deprecated
   * @param data
   * @returns {*}
   */
  upload (data) {
    return new Promise((resolve, reject) => {
      Vue.http.post('http://dd.rsq.etoutiao.cn/rsqddmdevapp/upload', data)
        .then((res) => {
          resolve(res.json())
        }, (res) => {
          window.rsqadmg.log('login error:' + JSON.stringify(res))
          reject(res)
        })
    })
  },
  getOSSClient (data) {
    var urllib = window.OSS.urllib
    var OSS = window.OSS.Wrapper
    var stsServer = window.rsqConfig.stsServer
    var region = window.rsqConfig.ossRegion
    var bucket = window.rsqConfig.ossBucket
    return urllib.request(stsServer + data.pathId, {
      method: 'GET'
    }).then(function (result) {
      var credential = JSON.parse(result.data)
      return new OSS({
        region: region,
        accessKeyId: credential.AccessKeyId,
        accessKeySecret: credential.AccessKeySecret,
        stsToken: credential.SecurityToken,
        bucket: bucket
      })
    })
  }
}
