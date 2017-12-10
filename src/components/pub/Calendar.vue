<template>
  <div class="wrap-calendar">
    <i class="icon2-arrow-left arrow-left-head" @click="onMoveLeft"></i>
    <div class="cal-inner" id="hMoveBar"
         :style="{'transform': translateX}"
         :class="{'animate': easeTrans }">
      <r-cal-bar
        v-for="(days, index) in daysArray"
        :key="index"
        :days="days"
        :bar-index="index"
        :highlight-day="selectDate"
        :today-value="todayValue"
        @click-cal-bar-day="triggerSelectDate"
      ></r-cal-bar>
    </div>
    <i class="icon2-arrow-right arrow-right-head" @click="onMoveRight"></i>
  </div>
</template>
<script>
  import CalendarBar from 'com/pub/CalendarBar'
  import dateUtil from 'ut/dateUtil'
  import Bus from 'com/bus'
  export default {
    name: 'Calendar',
    data () {
      return {
        daysArray: [], //  有当前月份（周）、前一个月份（周）、后一个月份（周）三个数组组成
        focusDate: null,  //  每一个当前显示的月份（周）都需要有一个focusDate
        selectDate: null,  //  当前选中（高亮显示）的日期
        easeTrans: false,
        count: 0,
        translateX: 'translateX(-700px)',
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
      }
    },
    props: {
      defaultSelectDate: Date,
      showHasTodoTag: {
        type: Boolean,
        default: true
      }
//      selectMonth: String,
//      selectYear: String
    },
    computed: {
      isToday () {
        if (!this.selectDate) {
          return false
        }
        return this.selectDate.getTime() === this.todayValue
      },
      todayValue () {
        return this.clearTime(new Date()).getTime()
      },
      selectYear () {
        return this.$store.state.pub.year
      },
      selectMonth () {
        return this.$store.state.pub.month
      }
    },
    components: {
      'r-cal-bar': CalendarBar
    },
    methods: {
      triggerSelectDate (date) {
//        console.log('triggerSelectDate进来了传过来的date是' + date)
        this.selectDate = date// 为什么要有这一步呢，以后会用到selectdate吗,下一步不是直接发出去了吗
        this.$emit('click-cal-day', date)
      },
      backToToday () { //  //这个函数的数据流程重要
//        console.log('backToToday进来了')
        var today = this.clearTime(new Date())
        this.focusDate = today
        this.resetBar()// 这个应该是更新页面的
        this.triggerSelectDate(today)// 每次一触发这个都要去后台拿数据
      },
      resetDays (focusDate) { // 为什么要拿到连续三周的数据呢
//        console.log('resetDays的focusDate是' + focusDate)
        return [
          this.getWeekDays(this.firstDayOfWeek(focusDate, -1)),
          this.getWeekDays(this.firstDayOfWeek(focusDate, 0)),
          this.getWeekDays(this.firstDayOfWeek(focusDate, 1))
        ]
      }, // 这个是靠getWeekDays和firstDayOfWeek一起完成的
      clearTime (date) {
//        console.log('date是' + date)
        return new Date(date.setHours(0, 0, 0, 0))
      },
      getWeekDays (focusDate) {
//        console.log('getWeekDays的focusDate是' + focusDate)
        return dateUtil.getWeekDays(focusDate)
      },
      firstDayOfWeek (date, offset) {
//        console.log('firstDayOfWeek的focusDate是' + date)
//        console.log(dateUtil.firstDayOfWeek(date, offset))
        return dateUtil.firstDayOfWeek(date, offset)
      },
      onMoveLeft () {
        if (this.easeTrans) {
          return
        }
//        console.log('jinlai左边')
//        if (this.count === 800) {
//          this.count = 0
//        } else {
//          this.count += 800
//        }
//        this.translateX = 'translateX(' + this.count + 'px)'
        this.focusDate = this.firstDayOfWeek(this.focusDate, -1)
//        console.log('this.focusDate是' + this.focusDate)
        this.resetBar()
      },
      onMoveRight () {
        if (this.easeTrans) {
          return
        }
//        if (this.count === -800) {
//          this.count = 0
//        } else {
//          this.count -= 800
//        }
//        var delta = ev.deltaX
//        console.log('onPanMove的delta是' + delta)
//        this.translateX = 'translateX(' + (this.count) + 'px)'
        this.focusDate = this.firstDayOfWeek(this.focusDate, 1)
//        console.log('this.focusDate是' + this.focusDate)
        this.resetBar()
      },
      onPanEnd (ev) {
        if (this.easeTrans) {
          return
        }
        this.easeTrans = true

        var delta = ev.deltaX
        var direction

        if (Math.abs(delta) > 20 && ev.type === 'panend') {
          direction = delta > 0 ? 1 : -1
          this.translateX = 'translateX(' + (direction * 100) + '%)'
        } else {
          direction = 0
          this.translateX = 'translateX(-550px)'
        }

        this.focusDate = this.firstDayOfWeek(this.focusDate, -direction)// 这个是根据方向改变focusdate
      },
      resetBar () { // 其实就是改变了下daysArray,更新了下界面
//        console.log('resetBar的daysArray是' + JSON.stringify(this.daysArray))
        this.daysArray = this.resetDays(this.focusDate)
//        console.log('改变后的daysArray是' + JSON.stringify(this.daysArray)) // 正好是三周的数据
        this.easeTrans = false
        this.translateX = 'translateX(0px)' // 这个是控制左右滑动的位移吗
        this.$emit('after-cal-swipe', {daysArray: this.daysArray})
      }
    },
    mounted () {
      //  初始化工作
      Bus.$on('changeCalendar', (month, year) => {
//        console.log('进来changeCalendar')
//        console.log(month + year)
        var newDate = new Date(year, month - 1, 1)
        var secondDate = new Date(year, month - 1, 8)
        var thirdDate = new Date(year, month - 1, 15)
        this.daysArray = [
          dateUtil.getMonthSevenDays(newDate),
          dateUtil.getMonthSevenDays(secondDate),
          dateUtil.getMonthSevenDays(thirdDate)
        ]
        this.focusDate = new Date(year, month - 1, 10)
        this.$emit('after-cal-swipe', {daysArray: this.daysArray})
      })
      Bus.$on('returnToday', (date) => {
        this.focusDate = date
        this.selectDate = date
        this.resetBar()
      })
//      console.log('calendar界面传进来的' + this.selectYear + this.selectMonth)
//      if (this.selectMonth || this.selectYear) {
//        var newDate = new Date(this.selectYear, this.Month, 1)
//      }
      this.focusDate = this.defaultSelectDate
      this.resetBar()
//      console.log('resetBar走完了')
      this.triggerSelectDate(this.defaultSelectDate) // 去拿后台数据去了
//      var ele = document.getElementById('hMoveBar')
//      ele.addEventListener('transitionend', this.resetBar)
//      ele.addEventListener('webkitTransitionEnd', this.resetBar)
    }
  }
</script>
<style lang="scss" scope>
  .arrow-left-head{
    /*position: absolute;*/
    font-size: 14px;
    color: #CFCFCF;
    /*margin-top: 8px;*/
    /*top: 15px;*/
    /*left:2.5%;*/
  }
  .arrow-right-head {
    /*position: absolute;*/
    font-size: 14px;
    color: #CFCFCF;
    /*margin-top: 8px;*/
    /*top: 15px;*/
    /*right:30px*/
  }
  @media (max-width: 800px) {
    .wrap-calendar{
      width: 71%;
      margin-left: 5px;
    }
    .arrow-right-head{
      margin-left: 3px;
    }
  }
  @media (max-width: 900px) and (min-width: 801px){
    .wrap-calendar{
      width: 72.5%;
    }
  }
  @media (max-width: 1000px) and (min-width: 901px) {
    .wrap-calendar{
      width: 77%;
    }
  }
  @media (max-width: 1100px) and (min-width: 1001px) {
    .wrap-calendar{
      width: 80%;
    }
  }
  @media (min-width: 1101px) and (max-width: 1200px) {
    .wrap-calendar{
      width: 82%;
    }
  }
  @media (min-width: 1201px) {
    .wrap-calendar{
      width: 83%;
    }
  }
  .wrap-calendar{
    /*padding-left: 50px;*/
    justify-content: center;
    /*margin: 0 auto;*/
    display: flex;
    align-items: center;
    /*width: 75%;*/
    height: 50px;
    position: relative;
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*margin-left: 10px;*/
    padding: 0;
  }
  .arrow-right, .arrow-left{
    font-size: 14px;
    color: #CFCFCF;
  }
  .arrow-left{
    /*margin-right: 30px;*/
    cursor: pointer;
  }
  .arrow-right{
    cursor: pointer;
    /*margin-left: 20px;*/
  }
  .c-cal-main {
    position: fixed;color:white;font-size: 15px;
    top:0;left:0;right:0;height: 81px;background: #458CDA;
    border-bottom: 0.5px solid #E4E4E4;z-index:99;
    -webkit-transform: translate3d(0px,0px,0px);
  }
  .cal-title {
    position: absolute;top: 0;left: 0;right: 0;
    text-align: center;height: 53px;line-height: 52px;
    margin-bottom: -1px;
  }
  .cal-title-today {position:absolute;top:0;height:100%;left:50%;margin-left:65px;
    font-size: 15px;font-weight: bold;}
  .cal-week-title {
    position: fixed;top: 0px;left: 0;right: 0;width: 100%;
    padding: 0;height: 31px;line-height: 30px;
    margin-bottom: -1px;color:white;background: #458CDA;font-size:15px;
    -webkit-transform: translate3d(0px,0px,0px);
  }
  .c-cal-main table {
    text-align: center;table-layout: fixed;
    width: 100%;height: 100%;margin: 0;
  }
  .c-cal-main td {}
  .cal-weekday {
    margin-right: 30px;
    width:50px;
    font-size: 15px;
    font-family: PingFangSC-Medium;
  }
  .cal-content {
    position: fixed; top: 30px;left: 0;right: 0;padding:0;
    width: 100%;height:40px;overflow: hidden;background: #458CDA;
    -webkit-transform: translate3d(0px,0px,0px);
  }
  .cal-outer {position:relative;width:100%;height:100%;overflow:hidden;}
  .cal-inner {
   width:90%;
    overflow: hidden;
    /*height: 30px;*/
    white-space: nowrap;
    /*margin-top: 5px;*/
    display: flex;
    justify-content: center;
  }
  .animate {
    transition: transform 0.3s ease;
  }
</style>
