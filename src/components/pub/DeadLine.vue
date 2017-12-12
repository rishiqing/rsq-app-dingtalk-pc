<template>
  <div class="select-date-deadline">
    <div class="dp-title-deadline">
      <!--<div class="dp-title-tag u-pull-left" @click="tapEmpty($event)">空</div>-->
      <!--<div class="dp-title-tag u-pull-right" @click="tapBackToday($event)">今</div>-->
      <div tag="i" class="icon icon-keyboard_arrow_left"
           @click="tapChangeMonth($event, -1)"></div>
      <div class="dp-title-text-deadline">
        {{focusDate.getFullYear()}}年{{focusDate.getMonth() + 1}}月
      </div>
      <div tag="i" class="icon icon-keyboard_arrow_right"
           @click="tapChangeMonth($event, 1)"></div>
    </div>
    <div class="dp-content">
      <table class="dp-table">
        <thead>
        <tr>
          <td  class="week">日</td>
          <td  class="week">一</td>
          <td  class="week">二</td>
          <td  class="week">三</td>
          <td  class="week">四</td>
          <td  class="week">五</td>
          <td  class="week">六</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="weekArray in days">
          <td v-for="day in weekArray" :key="day.date.getTime()"
              @click="tapDay($event, day)">
            <div class="dp-day"
                 :class="{'dp-grey': !day.isInMonth, 'dp-selected': day.isSelected,'is-today':isToday(day)}">
              {{day.date.getTime() === numToday ? '今' : day.date.getDate()}}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="wrap-button-date">
        <button class="today" @click="backToToday">今天</button>
        <button class="clear-date" @click="clear">清除</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .dp-day:hover{
    cursor: pointer;
  }
  .wrap-button-date{
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .clear-date,.today{
    display: inline-block;
    width: 94px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D5D5D5;
    border-radius: 2px;
    margin-left: 20px;
    background-color: white;
    cursor: pointer;
    font-family: AppleSystemUIFont;
    font-size: 12px;
    color: #666666;
  }
  .select-date-deadline .dp-content tbody{
    margin-top: 20px;
  }
  .select-date-deadline thead{
    margin-bottom: 10px;
  }
  .select-date-deadline{
    position: absolute;
    top: 0px;
    background-color: white;
    z-index: 103;
    height: 290px;
  }
  .repeat-style-wrap-show{
    width: 20px;
    font-size: 14px;
    list-style: none;
  }
  .repeat-style-wrap{
    /*padding: 0;*/
    /*margin: 0;*/
    list-style: none;
    font-size: 14px;
  }
  .repeat-deadline{
    font-size: 14px;
  }
  .repeat-style{
    font-size: 14px;
  }
  .dp-sel-type .is-active{
    color: #3D3D3D;
    font-size: 14px;
  }
  .dp-content .dp-table .is-today{
    color:#67B2FE
  }
  /*.edit-date {*/
    /*position: absolute;*/
    /*top: 40px;*/
    /*z-index: 10;*/
    /*background-color: white;*/
  /*}*/
  .edit-date {
  .light-color {color: #999999;}
  .date-picker {
    /*box-sizing: border-box;margin-top: 0.25rem;background: #fff;*/
    /*border-top: 1px solid #E0E0E0;*/
    /*border-bottom:1px solid #E0E0E0 ;*/
    /*padding-bottom: 0.4rem;*/
  }
  .dp-title-deadline {
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 5px;
  }
  .dp-title-text-deadline {
    /*text-align: center;*/
    /*font-family: PingFangSC-Regular;*/
    width: 90%;
    font-family: AppleSystemUIFont;
    font-size: 14px;
    color: #666666;
    text-align: center;
    /*color: #3D3D3D;*/
  }
  .dp-title .icon {
    font-size:14px;
    color: #333333;
    cursor: pointer;
  }
  /*.dp-title .dp-title-tag {font-size: 0.4rem;line-height:1;margin-top:12px;padding:5px;border: solid 1px #e8e8e8;border-radius: 50%;}*/
  .dp-table {width:100%;text-align: center;}
  .dp-grey {color: #a8a8a8;}
  .dp-table .dp-selected {
    background: #55A8FD;
    color:white;}
  .dp-sel-type {position: relative;border-bottom: solid 1px #e4e4e4;overflow: hidden;
    height: 40px;line-height: 40px;}
  .dp-btn {
    cursor: pointer;
    float: left;
    width: 23%;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    /*color: #666666;*/
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
    font-family: AppleSystemUIFont;
    font-size: 13px;
    color: #8C8C8C;
  }
  .dp-day {
    margin:0 auto;
    width:30px;
    height:30px;
    line-height:30px;
    text-align: center;
    border-radius: 50%;
    font-family: AppleSystemUIFont;
    font-size: 12px;
    color: #666666;
  }
  .week-six{
    /*font-family: PingFangSC-Regular;*/
    /*font-size: 11px;*/
    /*color: #FF7A7A;*/
  }
  .week-ri{
    /*font-family: PingFangSC-Regular;*/
    /*font-size: 11px;*/
    /*color: #FF7A7A;*/
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
  export default {
    data () {
      return {
        compId: 'SYSTEM_SELECT_DATE',
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        focusDate: new Date(),  //  表示当前显示的月份，决定了当前显示哪个月份的日历
        days: [],
        selectNumDate: null,
        dateType: ''
      }
    },
    props: {
    },
    componnets: {
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
      weekDate () {
        return this.$store.state.weekDate
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
      clear () {
        this.$emit('selectedDate', {date: '永久'})
      },
      backToToday () {
        this.focusDate = new Date()
        this.dateType = 'single'
        this.selectNumDate = [dateUtil.getZeroTime(new Date()).getTime()]
        this.resetType()
        this.$emit('selectedDate', {date: new Date()})
      },
      isToday (day) {
        return day.date.getTime() === this.numToday
      },
      initData () {
        var dateStruct = dateUtil.backend2frontend(this.currentTodoDate)
        console.log('处理过后的dateStruct是' + JSON.stringify(dateStruct))
        this.selectNumDate = dateStruct.dateResult || []
        this.focusDate = dateStruct.dateResult ? new Date(dateStruct.dateResult[0]) : new Date()
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
      tapChangeMonth (e, offset) {
        this.resetMonth(offset)
        e.preventDefault()
      },
      tapDay (e, obj) {
        //  如果是在repeat状态下点击日期，那么清除重复，进入single状态
        this.$emit('selectedDate', obj)
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
      selectDays () { // 略复杂
        var self = this
        this.days.forEach(function (array) {
          array.forEach(function (obj) {
            obj.isSelected = self.isInSelect('single', obj.date, self.selectNumDate)
          })
        })
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
      }
    },
    created () {
      this.initData()
    }
  }
</script>
