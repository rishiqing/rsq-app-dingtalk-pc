import dateUtil from 'ut/dateUtil'
import store from '@/store'

export default {
  defaultTodo () {
    var state = store.state
    var userId = state.loginUser ? state.loginUser.rsqUser.id : 0

    var strDate = dateUtil.dateNum2Text(dateUtil.dateText2Num(state.schedule.strCurrentDate), '/')

    return {
      pTitle: '',
      pDisplayOrder: 0,
      pUserId: userId,
      pNote: '',
      pContainer: 'IE',
      pIsDone: false,
      pFinishedTime: null,
      pPlanedTime: '',
      startDate: strDate,
      endDate: strDate,
      dates: null,
      senderId: null,
      receiverIds: null,
      hasAvatar: null,
      systemAvatar: null,
      isDeleted: false,
      kanbanItem: null,
      todoDeployId: null,
      noteFile: [],
      allDoneSubTodosCount: 0,
      allSubTodosCount: 0,
      clock: {},
      receiverUser: [],
      KSLList: [],
      TSLList: [],
      allKList: [],
      allTList: [],
      subTodos: [],
      comments: [],
      noteFiles: []
    }
  },
  allDefaultTodo () {
    var obj = this.defaultTodo()
    obj['alwaysRepeat'] = true
    obj['isCloseRepeat'] = true
    obj['isLastDate'] = false
    obj['repeatType'] = null
    obj['repeatBaseTime'] = null
    obj['repeatOverDate'] = ''
    return obj
  }
}
