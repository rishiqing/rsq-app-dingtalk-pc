<template>
  <div class="edit-time">
    <input type="text" @focus="setStartTime($event)" placeholder="开始时间">
    <input type="text" @focus="setEndTime($event)" placeholder="结束时间">
    <ul class="alert-list">
      <div tag="li" @click="selectAlert(alert)" v-for="(alert, index) in displayedRuleList" :key="index">
        <span>{{parseCode(alert.schedule)}}</span>
        <i class="icon2-selected finish" v-show="alert.selected"></i>
      </div>
    </ul>
  </div>
</template>
<style lang="scss">
  .finish{
    font-size: 12px;
  }
  .alert-list{
    margin: 0;
  }
  .edit-time{
    position: absolute;
    top:35px;
    background-color: white;
    z-index: 3;
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
      border-bottom:0.5px solid #DADADA;
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

  export default {
    data () {
      return {
        autoStart: true,
        autoEnd: true,
        isChecked: true,
        isAllDay: true,
        clock: {
          startTime: '',
          endTime: ''
        },
        displayedRuleList: [
          {schedule: 'begin_0_hour', selected: false},
          {schedule: 'begin_-5_min', selected: false},
          {schedule: 'begin_-15_min', selected: false},
          {schedule: 'begin_-30_min', selected: false},
          {schedule: 'begin_-1_hour', selected: false},
          {schedule: 'end_-1_hour', selected: false}
        ]
      }
    },
    computed: {
      currentTodo () {
        return this.$store.state.todo.currentTodo
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
      selectAlert (a) {
        a.selected = !a.selected
        if (a.selected) {
          this.noAlert = false
        }
      },
      /**
       * 初始化数据
       */
      parseCode (schedule) {
        return jsUtil.alertCode2Text(schedule.split('_'))
      },
      initData () {
        //  检查pub区是否有缓存，有缓存则读缓存，否则从currentTodo上读取
        console.log('进来一次')
        jsUtil.extendObject(this.clock, this.todoTime.clock)
        this.isAllDay = !this.clock.startTime
        this.isChecked = this.isAllDay

        //  todoTime.startTime存在，说明之前设置过提醒，不再自动设置
        if (!this.isAllDay) {
          this.autoStart = false
          this.autoEnd = false
        }
        //  自动调整时间
        this.autoChangeTime()
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
        console.log('autoChangeTime的clock是' + JSON.stringify(this.clock))
      },
      empty () {},
      toggleAllDay (e) {
        console.log('toggleAllDay是' + JSON.stringify(this.clock))
        this.isAllDay = !this.isAllDay
        this.isChecked = this.isAllDay
      },
      /**
       * 设置开始时间
       */
      setStartTime (e) {
        e.preventDefault()
        e.stopPropagation()
//        if (this.isAllDay) return
        var that = this
        window.rsqadmg.exec('timePicker', {
          strInit: that.clock.startTime,
          success (result) {
            if (result.value > that.clock.endTime) {
              alert('开始时间不能晚于结束时间')
            } else {
              that.clock.startTime = result.value
              that.autoStart = false
              that.autoChangeTime()
            }
          }
        })
      },
      /**
       * 设置结束时间
       */
      setEndTime () {
//        if (this.isAllDay) return
        var that = this
        window.rsqadmg.exec('timePicker', {
          strInit: that.clock.endTime,
          success (result) {
            if (result.value < that.clock.startTime) {
              alert('结束时间不能早于开始时间')
            } else {
              that.clock.endTime = result.value
              that.autoEnd = false
              that.autoChangeTime()
            }
          }
        })
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
      this.initData()
      window.rsqadmg.exec('setTitle', {title: '设置时间'})
      window.rsqadmg.exec('setOptionButtons', {hide: true})
      this.$store.dispatch('setNav', {isShow: false})
    },
    mounted () {},
    /**
     * vue-router hook
     * @param to
     * @param from
     * @param next
     * @returns {*}
     */
    beforeRouteLeave (to, from, next) {
      //  做pub区缓存
      this.saveTodoTimeState()
      if (to.name !== 'todoNew' && to.name !== 'todoEdit' && to.name !== 'demo') {
        return next()
      }
      this.beforeSubmitTodo(next)
    }
  }
</script>
