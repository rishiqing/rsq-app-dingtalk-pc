import Vue from 'vue'

import BasePreviewer from './BasePreviewer.vue'

//  用户自定义重复频率
var RsqPreviewer = Vue.extend(BasePreviewer)

var rsqPreviewer = null
/**
 * selectUserRepeat单例模式
 * @returns {ActionSheet}
 */
function getSelectDateModal (options) {
  if (!rsqPreviewer) {
    rsqPreviewer = new RsqPreviewer()
    rsqPreviewer.$on('self-close', close)
  }
  return rsqPreviewer
}

function isImage (type) {
  var typeArray = ['PNG', 'JPG', 'JPEG']
  return typeArray.indexOf(type.toUpperCase()) !== -1
}
function isFileCanPreview (type) {
  var fileType = ['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'WPS']
  return fileType.indexOf(type.toUpperCase()) !== -1
}

function show (options) {
  options = options || {}
  var vm = getSelectDateModal(options)
  var f = options.file
  if (isImage(f.contentType)) {
    vm.previewImage = f
  } else if (isFileCanPreview(f.contentType)) {
    vm.previewFile = f
  } else {
    window.rsqadmg.exec('alert', {message: '文件格式不支持预览'})
    return
  }

  //  append to body
  Vue.nextTick(function () {
    vm.$mount()
    document.body.appendChild(vm.$el)
  })
}

function close () {
  var vm = getSelectDateModal()
  if (vm.$el) {
    vm.$el.remove()
  }
}

export default {
  show,
  close
}
