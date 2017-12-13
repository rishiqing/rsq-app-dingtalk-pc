<template>
  <div class="edit-date" @click="stop($event)">
    <div class="date-picker">
      <div class="dp-sel-type">
        <div class="dp-btn"
                 @click="tapChangeType($event, 'single')"
                 :class="{'is-active': dateType=='single'}">单日</div>
        <div class="dp-v-line">
          <div class="dp-v-sep v-h-center"></div>
        </div>
        <div class="dp-btn"
                 @click="tapChangeType($event, 'discrete')"
                 :class="{'is-active': dateType=='discrete'}">多日</div>
        <div class="dp-v-line"><div class="dp-v-sep v-h-center"></div></div>
        <div class="dp-btn"
                 @click="tapChangeType($event, 'range')"
                 :class="{'is-active': dateType=='range'}">起止</div>
        <div class="dp-v-line"><div class="dp-v-sep v-h-center"></div></div>
        <div class="dp-btn"
             @click="tapChangeType($event, 'repeat')"
             :class="{'is-active': dateType=='repeat'}">重复</div>
      </div>
      <div class="repeat-wrap" v-show="this.repeatState">
        <div class="wrap-repeat-style">
          <span class="repeat-style" >重复方式</span>
          <div @click="changeRepeatOption($event)" class="repeat-border">
            <span class="repeat-style">{{repeatKind}}</span>
            <i class="icon2-arrow-down2 arrow"></i>
          </div>
          <ul style="margin: 0" v-show="this.repeatOption" class="repeat-option">
            <li  class="repeat-style-wrap" v-for="item in this.repeatStyle" @click="changeRepeat(item)">
              <span class="repeat-style">{{item.title}}</span>
            </li>
          </ul>
        </div>
        <img src="https://res-front-cdn.timetask.cn/beta/images/repeatBg.62b428d0ff.png" alt="" v-show="this.everyDay" class="every-day">
        <img src="https://res-front-cdn.timetask.cn/beta/images/repeatBg.62b428d0ff.png" alt="" v-show="this.everyYear" class="every-day">
        <r-repeat-week
          v-show="this.everyWeek"
          :weekDate="this.repeatWeek"
        >
        </r-repeat-week>
        <table class="dp-table" v-show="this.everyMonth">
          <tr v-for="weekArray in repeatNewMonth">
            <td v-for="day in weekArray" :key="day.date.getTime()"
                @click="tapDay($event, day)">
              <div class="dp-day"
                   :class="{'dp-grey': !day.isInMonth, 'dp-selected': day.isSelected,'is-today':isToday(day), lastwidth: showdate(day) === '最后一天'}">
                {{ showdate(day)}}
              </div>
            </td>
          </tr>
          <div @click="tapDay($event, obj)" class="lastdate"
               :class="{'dp-grey': !obj.isInMonth, 'dp-selected': obj.isSelected,'is-today':isToday(obj)}">{{obj.text}}</div>
        </table>
      </div>
      <div v-show="this.repeatState" class="repeat-state">
        <span class="repeat-deadline-text">截止重复直到</span>
        <div class="repeat-border" @click="selectDeadLine($event)">
          <span class="repeat-deadline">{{deadLineKind}}</span>
          <i class="icon2-arrow-down2 arrow"></i>
        </div>
        <ul style="margin: 0" v-show="this.deadLine" class="repeat-style-wrap-deadline">
          <li class="repeat-style-wrap-item"  @click="repeatAlways">
            <span>永久</span>
            <i class="icon2-selected finish-deadline" v-show="always"></i>
          </li>
          <li class="repeat-style-wrap-item" @click="showDeadLine">
            <span>按日期截止</span>
            <i class="icon2-selected finish-deadline" v-show="!always"></i>
          </li>
        </ul>
      </div>
      <r-deadline
       :days="days"
       v-show="this.deadLineDate"
       @selectedDate="getDeadLine"
      >
      </r-deadline>
      <div class="select-date" v-show="this.selectDateState">
        <div class="dp-title">
          <!--<div class="dp-title-tag u-pull-left" @click="tapEmpty($event)">空</div>-->
          <!--<div class="dp-title-tag u-pull-right" @click="tapBackToday($event)">今</div>-->
          <div tag="i" class="icon icon-keyboard_arrow_left"
                   @click="tapChangeMonth($event, -1)"></div>
          <div class="dp-title-text-date">
            {{focusDate.getFullYear()}}年{{focusDate.getMonth() + 1}}月
          </div>
          <div tag="i" class="icon icon-keyboard_arrow_right"
                   @click="tapChangeMonth($event, 1)"></div>
        </div>
        <div class="dp-content">
          <table class="dp-table">
            <thead>
            <tr>
              <td  class="week-ri">日</td>
              <td  class="week">一</td>
              <td  class="week">二</td>
              <td  class="week">三</td>
              <td  class="week">四</td>
              <td  class="week">五</td>
              <td  class="week-six">六</td>
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
            <button class="clear-date" @click="backToToday">清除</button>
          </div>
        </div>
      </div>
      <!--<button @click="changeDate">确定</button>-->
    </div>
    <!--<div class="date-repeat" @click="gotoRepeat">-->
      <!--<span class="list-key u-pull-left">重复</span>-->
      <!--<i class="icon2-arrow-right arrow u-pull-right light-color"></i>-->
      <!--<span class="list-value u-pull-right light-color">{{repeatText}}</span>-->
    <!--</div>-->
    <!--<div tag="p" class="date-clear" @click="tapEmpty">清除日期放入收纳箱</div>-->
  </div>
</template>
<style lang="scss" scoped>
  .finish-deadline{
    font-size: 13px;
    color: #1BA4FF;
    margin-right: 10px;
  }
  .lastdate{
    margin:0 auto;
    position: absolute;
    top: 138px;
    left:105px;
    width:60px;
    height:30px;
    line-height:30px;
    text-align: center;
    border-radius: 2px;
    /*border-radius: 50%;*/
    font-family: AppleSystemUIFont;
    font-size: 12px;
    color: #666666;
    cursor: pointer;
  }
  /*.dp-table div.lastwidth{*/
    /*width: 100px;*/
  /*}*/
  .dp-table tr:first-child{
    margin-top: 15px;
  }
  .repeat-style-wrap-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 5px;
    height: 25px;
    font-family: AppleSystemUIFont;
    font-size: 13px;
    color: #666666;
  }
  .repeat-style-wrap-item:hover{
    background: rgba(0,0,0,0.04);
  }
  .repeat-wrap{
    padding-bottom: 10px;
    border-bottom: 1px solid  #E1E1E1;
    height: 230px;
  }
  .repeat-border{
    cursor: pointer;
    border: 1px solid #D5D5D5;
    padding-left: 5px;
    /*padding: 4px;*/
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    min-width: 66px;
    height: 24px;
  }
  .wrap-repeat-style{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  .wrap-button-date{
    display: flex;
    align-items: center;
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
  .repeat-style-wrap-deadline{
    width: 130px;
    /*height: 40px;*/
    list-style: none;
    padding-left: 10px;
    padding-top: 7px;
    padding-bottom: 7px;
    position: absolute;
    background-color: white;
    z-index: 120;
    top: -75px;
    left:70px;
    box-shadow: 0 1px 5px 0 rgba(114,175,225,0.45);
    /*box-shadow: 3px 5px 24px #888888;*/
  }
  .repeat-state{
    display: flex;
    margin-left: 15px;
    align-items: center;
    position: relative;
    /*margin-top: 10px;*/
    height: 40px;
  }
  .every-day{
    margin: 20px 28px;
    width: 180px;
    height: 120px;
  }
  .repeat-option{
    position: absolute;
    z-index:300;
    /*height: 100px;*/
    width: 100px;
    left:50px;
    padding: 0;
    background-color: white;
    top:90px;
    box-shadow: 0 4px 20px 0 rgba(90,152,212,.32);
  }
  .repeat-style-wrap-show{
    width: 20px;
    font-size: 14px;
    list-style: none;
  }
  .repeat-style-wrap{
    /*position: absolute;*/
    top:-40px;
    left:50px;
    background-color: white;
    padding: 10px;
    z-index: 10007;
    /*padding: 0;*/
    /*margin: 0;*/
    list-style: none;
    font-size: 14px;
    cursor: pointer;
  }
  .repeat-style-wrap:hover{
    background-color:  rgba(0,0,0,0.04);
    z-index: 2000;
  }
  .repeat-deadline{
    font-family: AppleSystemUIFont;
    font-size: 12px;
    color: #666666;
  }
  .repeat-deadline-text{
    font-family: AppleSystemUIFont;
    font-size: 12px;
    color: #8C8C8C;
  }
  .repeat-style{
    font-family: AppleSystemUIFont;
    font-size: 12px;
    color: #666666;
  }
  .date-picker .dp-sel-type .is-active{
    color: #3D3D3D;
    font-size: 14px;
  }
  .dp-content .dp-table .is-today{
    color:#67B2FE
  }
  .dp-content{
    padding-bottom: 20px;
  }
  .edit-date {
    position: fixed;
    top: 200px;
    left:10px;
    z-index: 1000;
    background-color: white;
    /*box-shadow: 3px 5px 24px #888888;*/
    box-shadow: 0 1px 5px 0 rgba(114,175,225,0.45);
    width: 240px;
    height: 344px;
  }
  .edit-date {
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
      justify-content: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .dp-title-text-date {
      text-align: center;
      /*font-family: PingFangSC-Regular;*/
      width: 50%;
      font-family: AppleSystemUIFont;
      font-size: 14px;
      color: #666666;
      /*color: #3D3D3D;*/
    }
    .dp-title .icon {
      font-size:14px;
      color: #8C8C8C;
      cursor: pointer;
    }
    /*.dp-title .dp-title-tag {font-size: 0.4rem;line-height:1;margin-top:12px;padding:5px;border: solid 1px #e8e8e8;border-radius: 50%;}*/
    .dp-table {
      width:100%;
      /*height:8rem;*/
      text-align: center;
      position: relative;
      /*display:flex;*/
    }
    .dp-grey {color: #a8a8a8;}
    .dp-table tbody {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .dp-table .dp-selected {
      background: #55A8FD;
      color:white;}
    .dp-sel-type {position: relative;border-bottom: solid 1px #e4e4e4;overflow: hidden;
      height: 40px;line-height: 40px;}
    .dp-btn {
      font-family: AppleSystemUIFont;
      font-size: 12px;
      color: #8C8C8C;
      cursor: pointer;
      float: left;
      width: 24.2%;
      text-align: center;
      line-height: 40px;}
    .dp-v-line {
      /*float: left;*/
      /*position: relative;*/
      /*!*width: 2%;*!*/
      /*border: 1px solid #F0F0F0;*/
      /*text-align: center;*/
      /*height: 100%;*/
      /*font-size: 2.8rem;}*/
    }
    .dp-v-sep {
      /*width: 1px;*/
      height: 60%;
      /*background: #979797;*/
      border: 1px solid #F0F0F0;
      margin-top: 7px;
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
      cursor: pointer;
    }
    .dp-day-last{
      margin:0 auto;
      width:30px;
      height:30px;
      line-height:30px;
      text-align: center;
      /*border-radius: 50%;*/
      font-family: AppleSystemUIFont;
      font-size: 12px;
      color: #666666;
      cursor: pointer;
    }
    .dp-day:hover {
      background: #F4F4F4;
    }
    .week-six{
      font-family: AppleSystemUIFont;
      font-size: 13px;
      color: #8C8C8C;
    }
    .week-ri{
      font-family: AppleSystemUIFont;
      font-size: 13px;
      color: #8C8C8C;
    }
    .arrow{
      font-size:17px;
      color: #999999;
      margin-left: 5px;
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
  import repeatWeekCom from 'com/pub/repeatWeekCom'
  import DeadLine from 'com/pub/DeadLine'
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
        obj: {
          date: new Date(2060),
          isFocused: false,
          isSelected: false,
          isInMonth: true,
          showWeek: false,
          text: '最后一天'
        },
        lastDate: false,
        firstCycle: [],
        secondCycle: [],
        thirdCycle: [],
        fourthCycle: [],
        fiveCycle: [],
        repeatNewMonth: [],
        repeatMonthDays: [],
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        focusDate: new Date(),  //  表示当前显示的月份，决定了当前显示哪个月份的日历
        days: [],
        //  重复功能相关
        dateType: '',  //  single单日期, range起止日期, discrete, 离散间隔日期，repeat:使用重复，none表示dateType被清空
        selectNumDate: null,  //  表示重复当前选中的日期
        selectDateState: true,
        repeatOption: false,
        everyWeek: false,
        everyMonth: false,
        everyDay: false,
        everyYear: false,
        selectRepeatDate: [],
        repeatWeek: [],
        repeatWeekState: [],
        repeatStyle: [
          {title: '每天', selected: false},
          {title: '每周', selected: false},
          {title: '每月', selected: false},
          {title: '每年', selected: false}
        ],
        repeatOverDate: '',
        deadLineRepeat: '',
        repeatState: false,
        deadLine: false,
        deadLineDate: false
      }
    },
    components: {
      'r-repeat-week': repeatWeekCom,
      'r-deadline': DeadLine
    },
    computed: {
      always () {
        return this.deadLineKind === '永久'
      },
      deadLineKind () {
        return this.deadLineRepeat || '永久'
      },
      repeatKind () {
        var flag = 1
        for (var i = 0; i < this.repeatStyle.length; i++) {
          if (this.repeatStyle[i].selected) {
            flag = 0
            return this.repeatStyle[i].title
          }
        }
        if (flag === 1) {
          return '每周'
        }
      },
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
    props: {
      ifshow: Boolean
    },
    methods: {
      showdate (day) {
        if (day.text) {
          return day.text
        } else {
          return day.date.getTime() === this.numToday ? '今' : day.date.getDate()
        }
      },
      stop (e) {
        this.deadLine = false
        this.repeatOption = false
        e.stopPropagation()
      },
      clearDate () {
//        console.log('j')
      },
      backToToday () {
        this.focusDate = new Date()
        this.dateType = 'single'
        this.selectNumDate = [dateUtil.getZeroTime(new Date()).getTime()]
        this.resetType()
      },
      getDeadLine (obj) {
        if (obj.date === '永久') {
          this.repeatOverDate = ''
          this.deadLineRepeat = ''
        } else {
          var year = obj.date.getFullYear()
          var month = obj.date.getMonth() + 1
          var date = obj.date.getDate()
          this.deadLineRepeat = month + '月' + date + '日'
          month = month < 10 ? ('0' + month) : month
          date = date < 10 ? ('0' + date) : date
          this.repeatOverDate = year + '-' + month + '-' + date + ' ' + '00:00:00'
        }
        this.deadLineDate = false
      },
      selectDeadLine (e) {
        this.deadLine = !this.deadLine
        e.stopPropagation()
      },
      repeatAlways () {
        this.deadLine = false
        this.deadLineRepeat = ''
      },
      showDeadLine () {
        this.deadLine = false
        this.deadLineDate = true
      },
      changeRepeatOption (e) {
        this.repeatOption = !this.repeatOption
        e.stopPropagation()
      },
      changeRepeat (item) {
        if (item.title === '每天') {
          item.selected = true
          for (var i = 0; i < this.repeatStyle.length; i++) {
            if (this.repeatStyle[i].title !== '每天') {
              this.repeatStyle[i].selected = false
            }
          }
          this.repeatOption = false
          this.everyDay = true
          this.everyWeek = false
          this.everyMonth = false
          this.everyYear = false
//          if (this.currentTodo.startDate) {
//            this.selectNumDate = [this.currentTodo.startDate]
//          } else {
//            this.selectNumDate = [this.currentTodo.dates[0]]
//          }
        } else if (item.title === '每周') {
          item.selected = true
          for (i = 0; i < this.repeatStyle.length; i++) {
            if (this.repeatStyle[i].title !== '每周') {
              this.repeatStyle[i].selected = false
            }
          }
          this.repeatOption = false
          this.everyDay = false
          this.everyWeek = true
          this.everyMonth = false
          this.everyYear = false
        } else if (item.title === '每月') {
          item.selected = true
          for (i = 0; i < this.repeatStyle.length; i++) {
            if (this.repeatStyle[i].title !== '每月') {
              this.repeatStyle[i].selected = false
            }
          }
          if (this.selectRepeatDate.length === 0) {
            this.selectRepeatDate.push(dateUtil.getStandardTime(new Date()))
          }
          this.repeatOption = false
          this.everyDay = false
          this.everyWeek = false
          this.everyMonth = true
          this.everyYear = false
        } else {
          item.selected = true
          for (i = 0; i < this.repeatStyle.length; i++) {
            if (this.repeatStyle[i].title !== '每年') {
              this.repeatStyle[i].selected = false
            }
          }
          this.repeatOption = false
          this.everyDay = false
          this.everyWeek = false
          this.everyMonth = false
          this.everyYear = true
        }
      },
      isToday (day) {
        if (!day.text) {
          return day.date.getTime() === this.numToday
        }
      },
      initData () {
//        debugger
        console.log('this.currentTodoDate是' + JSON.stringify(this.currentTodoDate))
        var dateStruct = dateUtil.backend2frontend(this.currentTodoDate)
        console.log('后端转化成前端dateStruct是' + JSON.stringify(dateStruct))
        this.dateType = dateStruct.dateType || 'single'
        this.selectNumDate = dateStruct.dateResult || []
        this.focusDate = dateStruct.dateResult ? new Date(dateStruct.dateResult[0]) : new Date()
        this.resetType()
//        console.log('进到resetType后')
        if (this.dateType === 'repeat') {
          this.selectDateState = false
          this.repeatState = true
          if (dateStruct.repeatType === 'everyDay') {
            this.everyDay = true
            this.everyMonth = false
            this.everyWeek = false
            this.everyYear = false
            for (var i = 0; i < this.repeatStyle.length; i++) {
              if (this.repeatStyle[i].title !== '每天') {
                this.repeatStyle[i].selected = false
              } else {
                this.repeatStyle[i].selected = true
              }
            }
          } else if (dateStruct.repeatType === 'everyWeek') {
//            console.log('this.repeatWeek' + this.repeatWeek.length + 'this.selectNumDate' + JSON.stringify(this.selectNumDate))
            for (var p = 0; p < this.selectNumDate.length; p++) {
              this.repeatWeek.push(this.selectNumDate[p].toString())
            }
//            this.repeatWeek = this.selectNumDate
            for (var k = 0; k < this.repeatStyle.length; k++) {
              if (this.repeatStyle[k].title !== '每周') {
                this.repeatStyle[k].selected = false
              } else {
                this.repeatStyle[k].selected = true
              }
            }
            this.everyDay = false
            this.everyMonth = false
            this.everyWeek = true
            this.everyYear = false
          } else if (dateStruct.repeatType === 'everyMonth') {
            this.everyDay = false
            this.everyMonth = true
            this.everyWeek = false
            this.everyYear = false
            for (var j = 0; j < this.selectNumDate.length; j++) {
              var obj = new Date(this.selectNumDate[j])
              var day = obj.getDate() < 10 ? '0' + obj.getDate() : obj.getDate()
              var date = '' + obj.getFullYear() + (obj.getMonth() + 1) + day
              this.selectRepeatDate.push(date)
            }
            for (var m = 0; m < this.repeatStyle.length; m++) {
              if (this.repeatStyle[m].title !== '每月') {
                this.repeatStyle[m].selected = false
              } else {
                this.repeatStyle[m].selected = true
              }
            }
          } else {
            for (var n = 0; n < this.repeatStyle.length; n++) {
              if (this.repeatStyle[n].title !== '每年') {
                this.repeatStyle[n].selected = false
              } else {
                this.repeatStyle[n].selected = true
              }
            }
            this.everyYear = true
            this.everyDay = false
            this.everyMonth = false
            this.everyWeek = false
          }
        }
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
        if (type === 'repeat') {
//          console.log('进来repesat了' + this.everyDay + this.everyWeek + this.everyMonth + this.everyYear)
          this.dateType = type
          this.selectDateState = false
          this.repeatState = true
          if (!(this.everyDay || this.everyWeek || this.everyMonth || this.everyYear)) {
//            console.log('捡来repwatweek了')
            this.everyWeek = true
          }
          this.resetType()
          if (e) e.preventDefault()
        } else {
          this.dateType = type
          this.selectDateState = true
          this.repeatState = false
          this.resetType()
          if (e) e.preventDefault()
        }
      },
      tapChangeMonth (e, offset) {
        this.resetMonth(offset)
        e.preventDefault()
      },
      tapDay (e, obj) {
        //  如果是在repeat状态下点击日期，那么清除重复，进入single状态
        if (this.dateType === 'repeat') {
          obj.isSelected = !obj.isSelected
          if (obj.isSelected) {
            if (!obj.text) {
              var day = obj.date.getDate() < 10 ? '0' + obj.date.getDate() : obj.date.getDate()
              var date = '' + obj.date.getFullYear() + (obj.date.getMonth() + 1) + day
              this.selectRepeatDate.push(date)
            } else {
              this.lastDate = true
            }
//            console.log('this.selectRepeatDate' + this.selectRepeatDate.length)
          } else {
            if (!obj.text) {
              day = obj.date.getDate() < 10 ? '0' + obj.date.getDate() : obj.date.getDate()
              date = '' + obj.date.getFullYear() + (obj.date.getMonth() + 1) + day
              var index = this.selectRepeatDate.indexOf(date)
              if (index > -1) {
                this.selectRepeatDate.splice(index, 1)
              }
            } else {
              this.lastDate = false
            }
          }
        } else {
          this.toggleSelect(obj)
          e.preventDefault()
        }
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
//        console.log('this.days' + JSON.stringify(this.days))
//        this.repeatNewMonth.push({
//          date: new Date(2070),
//          isFocused: false,
//          siSelected: false,
//          isInMonth: true,
//          showWeek: false,
//          text: '最后一天'
//        })
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
//        console.log('this.selectNumDate是' + this.selectNumDate)
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
//        console.log('this.selectNumDate是' + this.selectNumDate)
        if (this.selectNumDate.length === 0) {
          return
        }
        var self = this
        if (this.dateType === 'repeat') {
          this.days.forEach(function (array) {
            array.forEach(function (obj) {
              obj.isSelected = self.isInSelect('discrete', obj.date, self.selectNumDate)
            })
          })
        } else {
          this.days.forEach(function (array) {
            array.forEach(function (obj) {
              obj.isSelected = self.isInSelect(self.dateType, obj.date, self.selectNumDate)
            })
          })
        }
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
//      gotoRepeat () {
//        this.$router.push('/todoEdit/repeat')
//      },
      saveTodoDateState () {
        var sorted = this.selectNumDate.sort((a, b) => { return a > b ? 1 : -1 })
//        console.log('this.selectNumDate' + JSON.stringify(this.selectNumDate))
//        console.log('saveTodoDateState的sorted是' + JSON.stringify(sorted))
        var resObj = dateUtil.frontend2backend({dateType: this.dateType, dateResult: sorted, sep: '/'})
//        console.log('saveTodoDateState的resobj是' + JSON.stringify(resObj))
        //  如果不是repeat类型，那么清除
        if (this.dateType !== 'repeat') {
          resObj['repeatType'] = null
          resObj['repeatBaseTime'] = null
          resObj['_selected'] = null
          resObj['_uRepeatType'] = null
          resObj['_uIsLastDate'] = false
          resObj['_uRepeatStrTimeArray'] = null
        } else {
          if (this.everyDay) {
            resObj['repeatType'] = 'everyDay'
            resObj['repeatBaseTime'] = dateUtil.getStandardTime(new Date(this.selectNumDate[0]))
            resObj['repeatOverDate'] = this.repeatOverDate
          } else if (this.everyWeek) {
//            console.log('每周进来了')
            resObj['repeatType'] = 'everyWeek'
            // 首先拿到开始日期，因为根据开始日期计算星期数组中每个星期对应的日期
            if (this.selectNumDate.length > 0) {
              var startWeek = new Date(this.selectNumDate[0]).getDay()
              var startDate = new Date(this.selectNumDate[0]).getDate()
              var year = new Date(this.selectNumDate[0]).getFullYear()
              var month = new Date(this.selectNumDate[0]).getMonth() + 1
              var weekArray = this.weekDate
              console.log('拿到this.weekdsatele ' + JSON.stringify(weekArray))
              for (var i = 0; i < weekArray.length; i++) {
                if (weekArray[i] >= startWeek) {
                  var day = startDate + weekArray[i] - startWeek
                  day = day < 10 ? ('0' + day) : day
                  this.repeatWeekState.push('' + year + month + day)
//                  console.log('this.repeatWeek是' + JSON.stringify(this.repeatWeekState))
                } else {
                  var bigday = startDate + weekArray[i] + 7 - startWeek
                  bigday = bigday < 10 ? ('0' + bigday) : bigday
                  this.repeatWeekState.push('' + year + month + bigday)
                }
              }
            } else {
//              console.log('进来this.selectNumDate.length=0')
            }
//            console.log('每周内容是' + JSON.stringify(this.repeatWeekState))
            resObj['repeatBaseTime'] = this.repeatWeekState.toString()
            resObj['repeatOverDate'] = this.repeatOverDate
          } else if (this.everyMonth) {
            resObj['repeatType'] = 'everyMonth'
//            console.log('this.selectRepeatDate 是' + JSON.stringify(this.selectRepeatDate))
            resObj['repeatBaseTime'] = this.selectRepeatDate.toString()
            resObj['repeatOverDate'] = this.repeatOverDate
            if (this.lastDate) {
              resObj['isLastDate'] = true
            } else {
              resObj['isLastDate'] = false
            }
          } else {
            resObj['repeatType'] = 'everyYear'
//            console.log('-----' + JSON.stringify(this.selectNumDate))
//            console.log('this.selectRepeatDate 是' + JSON.stringify(this.selectRepeatDate))
            resObj['repeatBaseTime'] = dateUtil.getStandardTime(new Date(this.selectNumDate[0]))
            resObj['repeatOverDate'] = this.repeatOverDate
          }
          resObj['isCloseRepeat'] = false
        }

        this.$store.commit('PUB_TODO_DATE_UPDATE', {data: resObj})
      },
      getSubmitResult () { // 上面直接用resobj不行吗，为什么先保存到state里面，然后又从state里面拿？
        var c = this.currentTodoDate
        var o = {
          startDate: c.startDate,
          endDate: c.endDate,
          dates: c.dates
        }
        //  如果重复相关属性存在，那么处理重复相关的其他属性
        if (c.repeatType) {
          o.repeatType = c.repeatType
          o.repeatBaseTime = c.repeatBaseTime
          o.alwaysRepeat = c.alwaysRepeat
          o.isCloseRepeat = false
          o.isLastDate = c.isLastDate
          o.repeatOverDate = c.repeatOverDate
        } else {
          o.isCloseRepeat = true
        }
        var actParamse = JSON.parse(JSON.stringify(o))
        o.createActive = {
          name: 'saveDate',
          params: actParamse
        }
        return o
      },
      submitTodo () {
        var editItem = this.getSubmitResult()
        console.log('submitTodo的editItem是' + JSON.stringify(editItem))
        //  如果日期均为空，则容器为收纳箱
        if (!editItem.startDate && !editItem.endDate && !editItem.dates) {
          editItem['pContainer'] = 'inbox'
        } else {
          editItem['pContainer'] = 'IE'
        }
        return this.$store.dispatch('updateTodoDate', {editItem: editItem})
          .then(() => {
            this.$store.commit('PUB_TODO_DATE_DELETE') // 提交之后就删除了？？？
//            this.selectRepeatDate = []
            this.repeatWeekState = []
            this.$store.commit('PUB_WEEK_DATE_DELETE')
          })
      },
      changeDate () {
        this.saveTodoDateState()
        this.submitTodo()
        this.$emit('close-edit-date')
        this.deadLineDate = false
      },
      showLastDate () {
        for (var i = 0; i <= 4; i++) {
          if (i === 0) {
            for (var j = 2; j <= 6; j++) {
              this.repeatMonthDays.push(this.days[0][j])
            }
          } else if (i === 4) {
            for (var k = 0; k <= 4; k++) {
              this.repeatMonthDays.push(this.days[4][k])
            }
          } else {
            for (var m = 0; m <= 6; m++) {
              this.repeatMonthDays.push(this.days[i][m])
            }
          }
        }
        for (i = 0; i <= 6; i++) {
          this.firstCycle.push(this.repeatMonthDays[i])
        }
        for (i = 7; i <= 13; i++) {
          this.secondCycle.push(this.repeatMonthDays[i])
        }
        for (i = 14; i <= 20; i++) {
          this.thirdCycle.push(this.repeatMonthDays[i])
        }
        for (i = 21; i <= 27; i++) {
          this.fourthCycle.push(this.repeatMonthDays[i])
        }
        for (i = 28; i <= 30; i++) {
          this.fiveCycle.push(this.repeatMonthDays[i])
        }
//        this.fiveCycle.push({
//          date: new Date(2060),
//          isFocused: false,
//          isSelected: false,
//          isInMonth: false,
//          showWeek: false,
//          text: '最后一天'
//        })
        this.repeatNewMonth.push(this.firstCycle)
        this.repeatNewMonth.push(this.secondCycle)
        this.repeatNewMonth.push(this.thirdCycle)
        this.repeatNewMonth.push(this.fourthCycle)
        this.repeatNewMonth.push(this.fiveCycle)
//        this.repeatNewMonth.push({
//          date: new Date(2060),
//          isFocused: false,
//          isSelected: false,
//          isInMonth: false,
//          showWeek: false,
//          text: '最后一天'
//        })
//        console.log('this.repeatNewMonth' + JSON.stringify(this.repeatNewMonth))
      }
    },
    created () {
      this.initData()
      this.showLastDate()
    },
    mounted () {
      Bus.$on('senddate', () => {
//        console.log('要发送日期了')
        this.changeDate()
        this.repeatOption = false
        this.deadLineDate = false
        this.repeatState = false
        this.selectDateState = false
      })
    }
//    beforeRouteLeave (to, from, next) {
//      //  做pub区缓存
//      this.saveTodoDateState()
//      if (to.name !== 'todoNew' && to.name !== 'todoEdit' && to.name !== 'demo') {
//        return next()
//      }
//      next()
//      this.submitTodo(next)
//    }
  }
</script>
