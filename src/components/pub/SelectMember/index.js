import Vue from 'vue'

import BaseSelectMember from './BaseSelectMember.vue'

var SelectMember = Vue.extend(BaseSelectMember)

var selectMember = null
/**
 * selectMember单例模式
 * @returns {ActionSheet}
 */
function getSelectMemberModal () {
  if (!selectMember) {
    selectMember = new SelectMember()
  }
  return selectMember
}

function show (options) {
  options = options || {}
  var vm = getSelectMemberModal()

  // vm.title = options.title || '选择成员'
  vm.btnText = options.btnText || '确定'
  vm.maximum = options.maximum || 5
  vm.memberList = options.memberList || []
  vm.selectedList = options.selectedList || []
  vm.disabledIdList = options.disabledIdList || []
  vm.success = options.success || function () {}
  vm.cancel = options.cancel || function () {}
  vm.$on('self-close', close)

  //  append to body
  Vue.nextTick(function () {
    vm.$mount()
    document.body.appendChild(vm.$el)
  })
}

function close () {
  var vm = getSelectMemberModal()
  vm.$el.remove()
}

function confirmSelect () {
  var vm = getSelectMemberModal()
  vm.confirmSelect()
}

export default {
  show,
  close,
  confirmSelect
}
