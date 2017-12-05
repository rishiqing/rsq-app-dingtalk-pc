<template>
  <div class="edit-time" :tabindex="2" @blur="blurEvent" @click="stopTime($event)">
    <div class="timeContainer" @click="setStartTime($event)">{{startTimeShow}}</div>
    <div class="timeContainer" @click="setEndTime($event)">{{endTimeShow}}</div>
    <TimePicker
      :getScrollTime="getScrollTime"
      :startFlag = "startFlag"
      @changeTime="changeTime"
      v-show="this.showTimePicker">
    </TimePicker>
    <ul class="alert-list">
      <div tag="li" @click="selectAlert(alertContent)" v-for="(alertContent, index) in displayedRuleList" :key="index">
        <span class="remind-option">{{parseCode(alertContent.schedule)}}</span>
        <i class="icon2-selected finish" v-show="alertContent.selected"></i>
      </div>
      <!--<li v-for="userDefine in userDefineList">-->
        <!--<span class="userDefineStr">{{userDefine}}</span>-->
      <!--</li>-->
      <li @click="showUserDefine()" class="user-define">自定义</li>
    </ul>
    <div v-show="this.userDefine" class="userDefine">
      <p class="remind">自定义提醒</p>
      <div>
        <select name="" id="selectTask">
          <option value="任务开始前">任务开始前</option>
          <option value="任务开始后">任务开始后</option>
          <option value="任务结束前">任务结束前</option>
          <option value="任务结束后">任务结束后</option>
        </select>
        <select name="" id="selectTime" @focus="mySelect">
        </select>
        <select name="" id="selectKind">
          <option value="">分钟</option>
          <option value="">小时</option>
        </select>
      </div>
      <button class="save-user-define" @click="saveUserDefine">确定</button>
    </div>
    <div class="clear-time" @click="clearTime">清除时间</div>
    <button style="font-size: 14px" @click="sendTime">确定</button>
  </div>
</template>
<style lang="scss">
  .save-user-define{
    background: #5EADFD;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.18);
    border-radius: 2px;
    margin-top: 20px;
    border: none;
    width: 250px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #selectTask{
    width: 120px;
  }
  #selectTime{
    width: 50px;
  }
  .clear-time{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .alert-list >div{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  .remind-option{
    font-family: AppleSystemUIFont;
    font-size: 13px;
    color: #3D3D3D;
  }
  .timeContainer{
    display: inline-block;
    margin-left: 23px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 2px;
    padding: 5px 10px;
    width: 65px;
    text-align: center;
  }
  .userDefine{
    z-index:200;
    position: absolute;
    top: 50px;
    left: -30px;
    width: 270px;
    padding-left: 30px;
    height: 150px;
    background-color: white;
    box-shadow: 3px 5px 24px #888888
  }
  .user-define,.remind,.userDefineStr{
    font-size: 14px;
  }
  .user-define{
    margin-top: 15px;
    list-style: none;
  }
  .finish{
    font-size: 14px;
    margin-left: 50px;
    color:#55A8FD;
    margin-right: 10px;
  }
  .alert-list{
    border-top: 1px solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
    margin: 0;
    margin-top: 15px;
    padding: 10px 0 20px 20px;
    position: relative;
    height: 220px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .edit-time{
    /*position: absolute;*/
    position: fixed;
    top:225px;
    left:20px;
    width: 250px;
    padding-top: 20px;
    background-color: white;
    z-index: 3;
    box-shadow: 3px 5px 24px #888888
  }
  .edit-time {
    .switch-wrapper {
      position: absolute;
      top:0.15rem;
      right:0.25rem;
    }
    input.mui-switch {
      display: block;
      width: 50px;
      height: 31px;
      border: 1px solid #dfdfdf;
      background-color: #fdfdfd;
      box-shadow: #dfdfdf 0 0 0 0 inset;
      border-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background-clip: content-box;
      -webkit-appearance: none;
      user-select: none;
      outline: none; }
    input.mui-switch:before {
      content: '';
      width: 29px;
      height: 30px;
      position: absolute;
      top: 0px;
      left: 0;
      border-radius: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); }
    input.mui-switch:checked {
      border-color: #67B2FE;
      box-shadow: #67B2FE 0 0 0 16px inset;
      background-color: #67B2FE; }
    input.mui-switch:checked:before {
      left: 21px; }

    .is-text-disabled span {color: #DDDDDD;}
    .is-text-disabled .arrow {color:#E0E0E0;}
    .arrow{
      position: absolute;
      right:0.11rem;
      top:0.31rem;
      font-size:22px;
    }
    ul{
      background-color: white;
      border-bottom:0.5px solid #DADADA;
      border-top:0.5px solid #DADADA;
    }
    .edit-time-all-day{
      margin-top: 0.231rem;
      border-bottom:0.5px solid #DADADA;
      border-top:0.5px solid #DADADA;
    }
    .edit-time-all-day>li{
      padding-left: 3%;
    }
    .last>li{
      padding-left: 3%;
    }
    li{
      position: relative;
      line-height:1.2rem ;
      height: 1.2rem;
      box-sizing: border-box;
    }
    .sec{
      margin-top:0.231rem ;
      padding-left:3%;
    }
    .last{
      margin-top:0.391rem ;
    }
    .sec>li:last-child{
      border: none;
    }
    span{
      /*display: block;*/
      font-family: PingFangSC-Regular;
      font-size: 17px;
      letter-spacing: 0;
    }
    span.list-key {float:left;}
    span.list-value {float:right;margin-right:0.7rem;
      max-width:7rem;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;}
    .sec span{}
    .last span{}
  }

</style>
<script>
  import moment from 'moment'
  import jsUtil from 'ut/jsUtil'
  import TimePicker from './TimePicker'
  import Bus from 'com/bus'
//  document.getElementsByClassName('edit-time')[0].onblur = function () {
//    console.log('触发了')
//  }
  export default {
    data () {
      return {
        scrollTime: '',
        startFlag: false,
        getStartTime: '',
        getEndTime: '',
        showTimePicker: false,
        userDefine: false,
        autoStart: true,
        autoEnd: true,
        isChecked: true,
        isAllDay: true,
        clock: {
          alert: [],
          startTime: '',
          endTime: '',
          alwaysAlert: true
        },
        displayedRuleList: [
          {schedule: 'begin_0_hour', selected: false},
          {schedule: 'begin_-5_min', selected: false},
          {schedule: 'begin_-15_min', selected: false},
          {schedule: 'begin_-30_min', selected: false},
          {schedule: 'begin_-1_hour', selected: false}
//          {schedule: 'end_-1_hour', selected: false}
        ],
        userDefineList: [
        ]
      }
    },
    components: {
      TimePicker: TimePicker
    },
    computed: {
      getScrollTime () {
        var minute = new Date().getMinutes() < 10 ? '00' : (parseInt(new Date().getMinutes() / 10) + '0')
        var initTime = new Date().getHours() + ':' + minute
        return this.scrollTime ? this.scrollTime : initTime
      },
      currentTodo () {
        return this.$store.state.todo.currentTodo
      },
      startTimeShow () {
        return this.getStartTime ? this.getStartTime : '开始时间'
      },
      endTimeShow () {
        return this.getEndTime ? this.getEndTime : '结束时间'
      },
      isEdit () {
        return !!this.currentTodo.id
      },
      todoTime () {
        return this.$store.state.pub.currentTodoTime
      },
      clockData () {
        if (this.isAllDay) return {}
        return this.clock
      },
      alertText () {
        var arr = this.clock.alert || []
        if (arr.length > 0) {
          return arr.map(a => {
            var str
            if (!a.isUserDefined) {
              str = jsUtil.alertCode2Text(a.schedule)
            } else {
              str = jsUtil.alertCode2Text(a.schedule)
            }
            return str
          }).join(',')
        } else {
          return '不提醒'
        }
      }
    },
    methods: {
      stopTime (e) {
        e.stopPropagation()
      },
      blurEvent () {
        this.$nextTick(() => {
          console.log('触发了模糊')
        })
      },
      clearTime () {
        this.getStartTime = null
        this.getEndTime = null
        this.clock.endTime = ''
        this.clock.startTime = ''
        this.$store.dispatch('clearTime', {clock: {}})
      },
      changeTime (time, flag, e) {
        if (flag) {
          console.log('this.getEndTime是' + this.getEndTime)
          if (this.getEndTime && time > this.getEndTime) {
            window.rsqadmg.execute('alert', {message: '开始时间不能晚于结束时间'})
          } else {
            this.getStartTime = time
//            console.log('结束时间' + this.clock.endTime)
            if (this.clock.endTime === '') {
//              console.log('进来了结束时间为空')
              this.clock.endTime = this.getStartTime + 5 // (延后5分钟)
              this.getEndTime = this.getStartTime + 5
            }
            this.showTimePicker = false
            this.clock.startTime = time
          }
        } else {
          console.log('开始时间' + this.getStartTime)
          if (time > this.getStartTime) {
            this.getEndTime = time
            if (this.clock.startTime === '') {
              this.clock.startTime = this.getEndTime - 5 // (延后5分钟)
              this.getStartTime = this.getEndTime - 5
            }
            this.showTimePicker = false
            this.clock.endTime = time
          } else {
            window.rsqadmg.execute('alert', {message: '结束时间不能早于开始时间'})
          }
        }
        e.stopPropagation()
      },
      sendTime () {
        console.log('this.clock是' + JSON.stringify(this.clock))
        if ((this.clock.startTime === '') && (this.clock.alert.length > 0)) {
          window.rsqadmg.execute('alert', {'message': '请先设置时间'})
        } else {
          var clockObject = JSON.parse(JSON.stringify(this.clock || {}))
          return this.$store.dispatch('updateTodoTime', {clock: this.clock})
              .then(item => {
                this.$emit('close-time')
                jsUtil.extendObject(item.clock, clockObject)
//                return this.$store.dispatch('handleRemind', {item})
              })
        }
      },
      saveUserDefine () {
        var selectTask = document.getElementById('selectTask')
        var selectTaskIndex = selectTask.selectedIndex
//        var selectTaskLongStr = selectTask.value
        if ((selectTaskIndex === 0) || (selectTaskIndex === 1)) {
          var selectTaskStr = 'begin'
        } else {
          selectTaskStr = 'end'
        }
        var selectTime = document.getElementById('selectTime')
        selectTime = selectTime.options[selectTime.selectedIndex].value
//        console.log('时间是' + selectTime)
        if ((selectTaskIndex === 0) || (selectTaskIndex === 2)) {
          var selectTimeStr = '-' + selectTime
        } else {
          selectTimeStr = selectTime
        }
        var selectKind = document.getElementById('selectKind')
        selectKind = selectKind.options[selectKind.selectedIndex].innerText
        if (selectKind === '分钟') {
          var selectKindStr = 'min'
        } else {
          selectKindStr = 'hour'
        }
        this.clock.alert.push({
          id: null,
          schedule: selectTaskStr + '_' + selectTimeStr + '_' + selectKindStr,
          isUserDefined: true
        })
        this.userDefine = false
//        this.userDefineList.push(selectTaskLongStr + selectTime + selectKind)
        this.displayedRuleList.push({
          schedule: selectTaskStr + '_' + selectTimeStr + '_' + selectKindStr,
          selected: true
        })
      },
      mySelect () {
        for (var i = 0; i < 100; i++) {
          document.getElementById('selectTime').options[i] = new Option(i)
        }
      },
      showUserDefine () {
        this.userDefine = true
      },
      selectAlert (a) {
        a.selected = !a.selected
        if (a.selected) {
          this.clock.alert.push(
            {
              id: null,
              schedule: a.schedule,
              isUserDefined: false
            }
          )
          this.noAlert = false
        } else {
          for (var k = 0; k < this.clock.alert.length; k++) {
            if (a.schedule === this.clock.alert[k].schedule) {
              this.clock.alert.splice(k, 1)
            }
          }
        }
      },
      /**
       * 初始化数据
       */
      parseCode (schedule) {
//        console.log('进来的schedule是' + schedule)
//        console.log('出去的schedule是' + jsUtil.alertCode2Text(schedule.split('_')))
        return jsUtil.alertCode2Text(schedule.split('_'))
      },
      initData () {
        //  检查pub区是否有缓存，有缓存则读缓存，否则从currentTodo上读取
        jsUtil.extendObject(this.clock, this.todoTime.clock)
        this.isAllDay = !this.clock.startTime
        this.isChecked = this.isAllDay

        //  todoTime.startTime存在，说明之前设置过提醒，不再自动设置
        if (!this.isAllDay) {
          this.autoStart = false
          this.autoEnd = false
        }
        //  自动调整时间
//        this.autoChangeTime()
      },
      /**
       * 在用户修改具体时间前自动调整起止时间间隔1小时
       */
      autoChangeTime () {
        var base
        //  开始时间和结束时间都是自动调整，那么就设置为当前时间
        if (this.autoStart && this.autoEnd) {
          //  设置为延后2分钟
          base = moment(new Date().getTime() + 2 * 60 * 1000)
          this.clock.startTime = base.format('HH:mm')
          this.clock.endTime = base.add(1, 'h').format('HH:mm')
        } else {
          //  如果是自动调整开始时间，那么将开始时间调整至结束时间前1小时
          if (this.autoStart) {
            base = moment(this.clock.endTime, 'HH:mm')
            this.clock.startTime = base.subtract(1, 'h').format('HH:mm')
          }
          //  如果是自动调整结束时间，那么将结束时间调整至开始时间后1小时
          if (this.autoEnd) {
            base = moment(this.clock.startTime, 'HH:mm')
            this.clock.endTime = base.add(1, 'h').format('HH:mm')
          }
        }
//        console.log('autoChangeTime的clock是' + JSON.stringify(this.clock))
      },
      empty () {},
      toggleAllDay (e) {
//        console.log('toggleAllDay是' + JSON.stringify(this.clock))
        this.isAllDay = !this.isAllDay
        this.isChecked = this.isAllDay
      },
      /**
       * 设置开始时间
       */
      setStartTime (e) {
        this.showTimePicker = true
        this.startFlag = true
        this.scrollTime = this.getStartTime
        e.preventDefault()
        e.stopPropagation()
//        this.clock.startTime = '12:00'
        if (this.clock.endTime === '') {
          this.clock.endTime = this.clock.startTime + 5 // (延后5分钟)
        }
//        if (this.isAllDay) return
//        var that = this
//        window.rsqadmg.exec('timePicker', {
//          strInit: that.clock.startTime,
//          success (result) {
//            if (result.value > that.clock.endTime) {
//              alert('开始时间不能晚于结束时间')
//            } else {
//              that.clock.startTime = result.value
//              that.autoStart = false
//              that.autoChangeTime()
//            }
//          }
//        })
      },
      /**
       * 设置结束时间
       */
      setEndTime () {
        this.showTimePicker = true
        this.startFlag = false
        this.scrollTime = this.getEndTime
//        this.clock.endTime = '12:45'
//        if (this.isAllDay) return
//        var that = this
//        window.rsqadmg.exec('timePicker', {
//          strInit: that.clock.endTime,
//          success (result) {
//            if (result.value < that.clock.startTime) {
//              alert('结束时间不能早于开始时间')
//            } else {
//              that.clock.endTime = result.value
//              that.autoEnd = false
//              that.autoChangeTime()
//            }
//          }
//        })
      },
      /**
       * 保存当前todoTime的数据并跳转到提醒页面
       */
      gotoAlert () {
        if (this.isAllDay) return
        this.saveTodoTimeState()
        this.$router.push('/todoEdit/alert')
      },
      /**
       * 检查是提醒时间是否早于当前时间
       */
      checkWarn () {
        if (!this.isAllDay &&
          this.clockData.alert &&
          this.clockData.alert.length > 0 &&
          moment().isAfter(moment(this.clock.startTime, 'HH:mm'))) {
          return '提醒时间早于当前时间，可能不会收到提醒!'
        }
      },
      /**
       * 检查用户是否更新过，
       * currentTodo.id不存在（新建）：isAllDay为false即为modified
       * currentTodo.id存在（更新）：比对localTodoTime和todoTime的每一项是否都一样
       */
      isModified () {
        return !jsUtil.objectEqual(this.clockData, (this.currentTodo.clock || {}))
      },
      /**
       * 保存todoTime的状态到state中
       */
      saveTodoTimeState () {
        this.$store.commit('PUB_TODO_TIME_SET', {data: {clock: this.clockData}})
      },
      beforeSubmitTodo (next) {
        if (this.isModified()) {
          //  提交
          var that = this
          var warn = this.checkWarn()
          if (warn) {
            window.rsqadmg.exec('confirm', {
              message: warn,
              success () {
                that.submitTodo(next)
              },
              cancel () {
                next(false)
              }
            })
          } else {
            that.submitTodo(next)
          }
        } else {
          next()
        }
      },
      /**
       * 提交todoTime的更新
       * @param next
       * @returns {Promise<U>|Promise.<TResult>|*|Thenable<U>}
       */
      submitTodo (next) {
        if (this.isEdit) {
          window.rsqadmg.exec('showLoader', {text: '保存中'})
        }
        //  在有提醒的情况下返回值中居然不包括clock.alert的数据，需要前端组合传入
        var clockObject = JSON.parse(JSON.stringify(this.clockData || {}))

        return this.$store.dispatch('updateTodoTime', {clock: this.clockData})
          .then(item => {
            jsUtil.extendObject(item.clock, clockObject)
            return this.$store.dispatch('handleRemind', {item})
          })
          .then(() => {
            this.$store.commit('PUB_TODO_TIME_DELETE')
            if (this.isEdit) {
              window.rsqadmg.exec('hideLoader')
              window.rsqadmg.execute('toast', {message: '保存成功'})
            }
            next()
          })
      }
    },
    created () {
//      this.initData()
//      window.rsqadmg.exec('setTitle', {title: '设置时间'})
//      window.rsqadmg.exec('setOptionButtons', {hide: true})
//      this.$store.dispatch('setNav', {isShow: false})
    },
    mounted () {
//      console.log('拿到的currentTodo是' + JSON.stringify(this.currentTodo))
      if (this.currentTodo.clock != null && this.currentTodo.clock.alert != null) {
//        console.log('进来了mounted')
        this.getStartTime = this.currentTodo.clock.startTime
        this.getEndTime = this.currentTodo.clock.endTime
        var alert = this.currentTodo.clock.alert
        for (var i = 0; i < alert.length; i++) {
          if (alert[i].isUserDefined) {
            this.displayedRuleList.push({schedule: alert[i].schedule, selected: true})
            this.clock.alert.push(alert[i])
          } else {
            for (var j = 0; j < this.displayedRuleList.length; j++) {
              if (alert[i].schedule === this.displayedRuleList[j].schedule) {
                this.displayedRuleList[j].selected = true
              }
            }
            this.clock.alert.push(alert[i])
          }
        }
      } else if (this.currentTodo.clock != null) {
        this.getStartTime = this.currentTodo.clock.startTime
        this.getEndTime = this.currentTodo.clock.startTime
        this.clock.startTime = this.currentTodo.clock.startTime
        this.clock.endTime = this.currentTodo.clock.startTime
      }
      Bus.$on('sendTime', () => {
//        if ()
//        console.log('要想后台发送时间了')
//        this.sendTime()
      })
    }
    /**
     * vue-router hook
     * @param to
     * @param from
     * @param next
     * @returns {*}
     */
//    beforeRouteLeave (to, from, next) {
//      //  做pub区缓存
//      this.saveTodoTimeState()
//      if (to.name !== 'todoNew' && to.name !== 'todoEdit' && to.name !== 'demo') {
//        return next()
//      }
//      this.beforeSubmitTodo(next)
//    }
  }
</script>
