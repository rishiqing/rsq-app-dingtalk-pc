import dateUtil from 'ut/dateUtil'

export default {
  loginUser (state) {
    return state.loginUser
  },
  defaultNumTaskDate (state) {
    var strCurrent = state.schedule.strCurrentDate
    return strCurrent ? dateUtil.dateText2Num(strCurrent) : new Date().getTime()
  },
  defaultTaskDate (state) {
    var strCurrent = state.schedule.strCurrentDate
    var current = strCurrent ? dateUtil.dateText2Num(strCurrent) : new Date().getTime()
    return dateUtil.dateNum2Text(current)
  }
}
