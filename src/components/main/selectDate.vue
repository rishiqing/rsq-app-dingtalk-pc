<template>
  <div class="edit-date-month">
    <div class="date-picker">
      <div class="dp-title">
        <!--<div class="dp-title-tag u-pull-left" @click="tapEmpty($event)">空</div>-->
        <!--<div class="dp-title-tag u-pull-right" @click="tapBackToday($event)">今</div>-->
        <div tag="i" class="icon icon-keyboard_arrow_left"
             @click="tapChangeMonth(-1)"></div>
        <div class="dp-title-text">
          {{selectYear}}年
        </div>
        <div tag="i" class="icon icon-keyboard_arrow_right"
             @click="tapChangeMonth(1)"></div>
      </div>
      <div class="dp-content">
        <table class="dp-table">
          <tbody>
            <tr v-for="month in months">
              <td v-for="monthday in month">
                  <div @click="changeMonth(monthday)" class="dp-day" :class="{'isBlue':thisMonth(monthday)}">
                    {{monthday}}
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .isBlue{
    color: blue
  }
  .dp-content .dp-table .is-today{
    color:#67B2FE
  }
  .edit-date-month {
    position: absolute;
    top: 55px;
    left: 0px;
    background-color: white;
    z-index: 200;
  }
  .edit-date-month {
    .light-color {color: #999999;}
    .date-picker {
      /*box-sizing: border-box;margin-top: 0.25rem;background: #fff;*/
      /*border-top: 1px solid #E0E0E0;*/
      /*border-bottom:1px solid #E0E0E0 ;*/
      /*padding-bottom: 0.4rem;*/
    }
    .dp-title {
      height: 30px;
      display: flex;
      align-items: center;
    }
    .dp-title-text {
      text-align: center;
      /*font-family: PingFangSC-Regular;*/
      width: 90%;
      font-size: 14px;
      /*color: #3D3D3D;*/
    }
    .dp-title .icon {
      font-size:14px;
      color: #333333;
      cursor: pointer;
    }
    /*.dp-title .dp-title-tag {font-size: 0.4rem;line-height:1;margin-top:12px;padding:5px;border: solid 1px #e8e8e8;border-radius: 50%;}*/
    .dp-table {width:100%;height:8rem;text-align: center;}
    .dp-grey {color: #a8a8a8;}
    .dp-table .dp-selected {
      background: #55A8FD;
      color:white;}
    .dp-sel-type {position: relative;border-bottom: solid 1px #e4e4e4;overflow: hidden;
      height: 40px;line-height: 40px;}
    .dp-btn {
      float: left;
      width: 32%;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #666666;
      line-height: 40px;}
    .dp-v-line {
      float: left;
      position: relative;
      width: 2%;
      color: #979797;
      text-align: center;
      height: 100%;
      /*font-size: 2.8rem;}*/
    }
    .dp-v-sep {
      width: 1px; height: 90%;background: #979797;
    }
    .week{
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #666666;
    }
    .dp-day {
      margin:0 auto;
      width:40px;
      height:30px;
      line-height:30px;
      text-align: center;
      border-radius: 50%;
      font-family: PingFangSC-Medium;
      font-size: 17px;
      cursor: pointer;
      /*color: #666666;*/
    }
    .edit-date div{

    }
    .week-six{
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FF7A7A;
    }
    .week-ri{
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FF7A7A;
    }
    .arrow{
      font-size:17px;
      color: #999999;
    }
    .date-repeat{
      position: relative;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      margin-top: 0.25rem;
      padding: 0 0.4rem;
      background-color: white;
      align-items: center;
      border-top: 1px solid #E0E0E0;
      border-bottom:1px solid #E0E0E0;
      font-family: PingFangSC-Regular;
      font-size: 17px;
    }
    span.list-value {margin-right:0.2rem;
      max-width:7rem;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;
    }
    .date-repeat > * {
      line-height: 1.2rem;
    }
    .date-clear {
      color: #A3B2C2;
      text-align: center;
      line-height: 1.8rem;
      font-size: 0.4rem;
    }
  }
</style>
<script>
  import dateUtil from 'ut/dateUtil'
  import Bus from 'com/bus'
  /**
   * 主model：state.pub.currentTodoDate，带下划线的是用于不同页面数据共享的属性，不会存储在后台
   * {
   * //  一级（date）页面的数据
   *   dates: null,
   *   startDate: null,
   *   endDate: null,
   *   repeatType: null,
   *   repeatBaseTime: null,
   *   //  二级（repeat）页面需要使用的数据以"_"作为前缀，二级页面
   *   _selected: null,  //  TodoEditRepeat页面中用户的选择
   *   _uRepeatType: null,  //  TodoEditRepeat页面中用户自定义的重复规则
   *   _uRepeatStrTimeArray: null  //TodoEditRepeat页面中用户自定义的重复规则的baseTime数组
   * }
   */
  export default {
    data () {
      return {
        compId: 'SYSTEM_SELECT_DATE',
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: [['1月', '2月', '3月', '4月'], ['5月', '6月', '7月', '8月'], ['9月', '10月', '11月', '12月']],
        focusDate: new Date(),  //  表示当前显示的月份，决定了当前显示哪个月份的日历
        days: [],
        //  重复功能相关
        dateType: '',  //  single单日期, range起止日期, discrete, 离散间隔日期，repeat:使用重复，none表示dateType被清空
        selectNumDate: null,  //  表示重复当前选中的日期
        selectYear: new Date().getFullYear()
      }
    },
    computed: {
      numToday () {
        return dateUtil.clearTime(new Date()).getTime()
      },
      currentTodo () {
        return this.$store.state.todo.currentTodo
      },
      isEdit () {
        return !!this.currentTodo.id
      },
      currentTodoDate () {
        return this.$store.state.pub.currentTodoDate
      },
      repeatText () {
        var text
        var c = this.currentTodoDate
        if (this.dateType === 'repeat' && c.repeatType) {
          var arr = this.currentTodoDate.repeatBaseTime.split(',')
          text = dateUtil.repeatDayText(c.repeatType, arr)
          if (c.isLastDate) {
            text += '、最后一天'
          }
        }
        return (text || '不') + '重复'
      }
    },
    methods: {
      changeMonth (month) {
        month = month.substring(0, month.length - 1)
        this.$store.commit('PUB_SCHE_DATE_UPDATE', {month: month, year: this.selectYear})
        this.$emit('changeMonth')
//        console.log('进来changeMonth')
        Bus.$emit('changeCalendar', month, this.selectYear)
      },
      thisMonth (month) {
        return ((this.focusDate.getMonth() + 1) + '月') === month
      },
      isToday (day) {
        return day.date.getTime() === this.numToday
      },
      initData () {
        var dateStruct = dateUtil.backend2frontend(this.currentTodoDate)
//        console.log('this.currentTodoDate是' + JSON.stringify(this.currentTodoDate))
//        console.log('处理过后的dateStruct是' + JSON.stringify(dateStruct))
        this.dateType = dateStruct.dateType || 'single'
        this.selectNumDate = dateStruct.dateResult || []
        this.focusDate = dateStruct.dateResult ? new Date(dateStruct.dateResult[0]) : new Date()
//        console.log('this.focusDate是' + this.focusDate)
        this.resetType()
      },
      clearType () {
        this.dateType = 'none'
      },
      tapEmpty (e) {
        this.selectNumDate = []
        this.clearType()
        this.clearSelected()
        if (e) e.preventDefault()
      },
      tapBackToday (e) {
        if (this.dateType === 'repeat') {
          this.dateType = 'single'
          this.tapBackToday(e)
        }
        var nowDate = dateUtil.clearTime(new Date())
        this.focusDate = nowDate
        this.dateType = 'single'
        this.selectNumDate = [nowDate.getTime()]
        this.resetMonth()
        if (e) e.preventDefault()
      },
      tapChangeType (e, type) {
        this.dateType = type
        this.resetType()
        if (e) e.preventDefault()
      },
      tapChangeMonth (offset) {
        this.selectYear += offset
      },
      tapDay (e, day) {
        //  如果是在repeat状态下点击日期，那么清除重复，进入single状态
        if (this.dateType === 'repeat') {
          this.dateType = 'single'
          this.tapDay(e, day)
        }
        this.toggleSelect(day)
        e.preventDefault()
      },
      resetType () {
        this.resetMonth() // 这是干吗用的
      },
      resetMonth (offset) {
        if (offset) {
//          console.log('开始this.focusdate是' + this.focusDate)
          this.focusDate = dateUtil.firstDayOfMonth(this.focusDate, offset)
//          console.log('之后this.focusdate是' + this.focusDate)
        }
        this.days = dateUtil.getMonthDays(this.focusDate) //  this.days数据结构很有意思
//        console.log('this.days是' + JSON.stringify(this.days))
        this.selectDays()
      },
      toggleSelect (day) {
        switch (this.dateType) {
          case 'single':
            this.selectSingle(day)
            break
          case 'range':
            this.selectRange(day)
            break
          case 'discrete':
            this.selectDiscrete(day)
            break
          default:
            break
        }
      },
      selectSingle (obj) {
        this.clearSelected()
        obj.isSelected = !obj.isSelected
        if (obj.isSelected) {
          this.selectNumDate = [obj.date.getTime()]
        } else {
          this.selectNumDate.pop()
        }
      },
      selectRange (obj) {
        var val = obj.date.getTime()
        //  如果之前选择过range，则重置选择
//        console.log(this.selectNumDate.length)
        if (this.selectNumDate.length >= 2) {
          this.selectNumDate = []
          this.clearSelected()
        }
        if (this.selectNumDate.length === 0) { // 什么时候为0呢
          this.selectNumDate = [val]
          obj.isSelected = true
        } else {
          //  length 为1
          var fun = val > this.selectNumDate[0] ? 'push' : 'unshift'
          this.selectNumDate[fun](val)
          this.selectDays()
        }
      },
      selectDiscrete (obj) {
        obj.isSelected = !obj.isSelected
        if (obj.isSelected) {
          this.selectNumDate.push(obj.date.getTime())
        } else {
          var index = this.selectNumDate.indexOf(obj.date.getTime())
          if (index > -1) {
            this.selectNumDate.splice(index, 1)
          }
        }
      },
      clearSelected () {
        this.days.forEach(function (array) {
          array.forEach(function (obj) {
            obj.isSelected = false
          })
        })
      },
      selectDays () { // 略复杂
        if (this.selectNumDate.length === 0) {
          return
        }
        var self = this
        this.days.forEach(function (array) {
          array.forEach(function (obj) {
            obj.isSelected = self.isInSelect(self.dateType, obj.date, self.selectNumDate)
          })
        })
//        console.log('selectDays中的this.days是' + JSON.stringify(this.days))
      },
      isInSelect (type, date, selectNumDate) { // 不懂
        var numDate = date.getTime()
        switch (type) {
          case 'single':
          case 'discrete':
            return selectNumDate.indexOf(numDate) !== -1
          case 'range':
            var start = selectNumDate[0]
            var end = selectNumDate[1]
            if (start && end) {
              return numDate >= start && numDate <= end
            } else {
              return start === numDate || end === numDate
            }
          default:
            return false
        }
      },
//      isModified () {
//        //  TODO  判断是否更新过
//        var oldObj = this.currentTodo
//        var newObj = this.currentTodoDate
//        return newObj.startDate !== oldObj.startDate ||
//          newObj.endDate !== oldObj.endDate ||
//          newObj.dates !== oldObj.dates ||
//          newObj.repeatType !== oldObj.repeatType ||
//          newObj.repeatBaseTime !== oldObj.repeatBaseTime ||
//          newObj.isLastDate !== oldObj.isLastDate
//      },
      gotoRepeat () {
        this.$router.push('/todoEdit/repeat')
      },
      saveTodoDateState () {
        var sorted = this.selectNumDate.sort((a, b) => { return a > b ? 1 : -1 })
        console.log('saveTodoDateState的sorted是' + sorted)
        var resObj = dateUtil.frontend2backend({dateType: this.dateType, dateResult: sorted, sep: '/'})
        console.log('saveTodoDateState的resobj是' + resObj)
        //  如果不是repeat类型，那么清除
        if (this.dateType !== 'repeat') {
          resObj['repeatType'] = null
          resObj['repeatBaseTime'] = null
          resObj['_selected'] = null
          resObj['_uRepeatType'] = null
          resObj['_uIsLastDate'] = false
          resObj['_uRepeatStrTimeArray'] = null
        }

        this.$store.commit('PUB_TODO_DATE_UPDATE', {data: resObj})
      }
    },
    created () {
      this.initData()
    },
    beforeRouteLeave (to, from, next) {
      //  做pub区缓存
      this.saveTodoDateState()
      if (to.name !== 'todoNew' && to.name !== 'todoEdit' && to.name !== 'demo') {
        return next()
      }
//      next()
      this.submitTodo(next)
    }
  }
</script>
