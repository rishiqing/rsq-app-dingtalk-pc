<template>
  <div class="cal-bar" >
    <table class="cal-table">
      <tr>
        <td class="cal-weekday"
            v-for="day in days"
            :key="day.date.getTime()"
            >
          <div>
            <div class="cal-day" :class="{'has-tag': !(day.showTag&&!isHighLight(day.date))}" @click="calDayClick(day.date)"
                     >
              <div class="wrap-show-week">
                <span class="showDate" :class="{'cal-day--focus': isHighLight(day.date)}">{{dateText(day)}}</span>
                <span class="showWeek">{{week[day.date.getDay()]}}</span>
              </div>
            </div>
            <div class="cal-day-tag" :class="{'tag-active': day.showTag&&!isHighLight(day.date)}"></div>
          </div>
        </td>
        <!--<td><i class="icon2-arrow-right-small arrow"></i></td>-->
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showWeek: false,
        weekday: '',
        week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      }
    }, // 为社么只显示一周的数据  不是三周的数据吗
    props: {
      days: Array,
      barIndex: Number,
      highlightDay: Date,
      todayValue: Number
    },
    watch: {
      highlightDay (date) {
        if (date.getDate() === new Date().getDate()) {
//          console.log('highlightDay变化了')
          this.calDayClick(date)
        }
      }
    },
    computed: {
      barOffsetStyle () {
        return (this.barIndex * 100) + '%'
      }
    },
    components: {},
    methods: {
      dateText (day) {
        if (day.month) {
//          console.log('进来了月份')
          return day.month
        } else {
          return this.todayValue === day.date.getTime() ? '今' : day.date.getDate()
        }
      },
      isHighLight (date) {
//        if (!day.month) {
        return this.highlightDay != null && date.getTime() === this.highlightDay.getTime()
      },
      calDayClick (date) {
//        console.log('进来calDayClick')
        this.$store.commit('SAVE_FOCUS_DATE', date)
//        if (date.getTime() !== this.highlightDay.getTime()) {
        this.$emit('click-cal-bar-day', date)
//        }
      }
    },
    mounted () {
//      console.log('传过来的days是' + JSON.stringify(this.days) + 'index是' + this.barIndex) // 这个循环执行了3次
    }
  }
</script>
<style lang="scss" scope>
  @media (max-width: 800px) {
    .cal-day {
      width: 30px;
    }
  }
  @media (max-width: 900px) and (min-width: 801px){
    .cal-day {
      width: 30px;
    }
  }
  @media (max-width: 1000px) and (min-width: 901px) {
    .cal-day {
      width: 30px;
    }
  }
  @media (max-width: 1100px) and (min-width: 1001px) {
    .cal-day {
      width: 30px;
    }
  }
  @media (min-width: 1101px) and (max-width: 1200px) {
    .cal-day {
      width: 30px;
    }
  }
  @media (min-width: 1201px){
    .cal-day {
      width: 30px;
    }
  }
  .has-tag{
    margin-bottom: 3px;
  }
  .cal-day:hover {
    background-color: #EBEEF1 ;
    border-radius: 50%;
  }
  .wrap-show-week:hover .showDate{
    display: none;
  }
  .showDate{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4A4A4A;
    letter-spacing: -0.29px;
  }
  .wrap-show-week:hover .showWeek{
    display: inline-block;
  }
  .wrap-show-week{
    /*width: 10%;*/
    /*width: 40px;*/
    cursor: pointer;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .showWeek{
    display: none;
  }
  .IfShowWeek{
    display: none;
  }
  .arrow{
    font-size: 12px;
  }
  .cal-bar {
    /*width: 278px;*/
    /*width: 47%;*/
    height: 100%;
    display: inline-block;
    /*:style="{'left': barOffsetStyle}"*/
  }
  .cal-bar:last-child{
    /*margin-left: 10%;*/
  }
  .cal-bar:first-child .cal-table{
    // margin-left: -55%;
    // margin-right: 30px;
  }
  .cal-bar:first-child{
     margin-left: 10px;
  }
  .cal-bar:nth-child(2){
    // margin-left: 11%;
  }
  .cal-table {
    border-collapse: collapse;
    margin: 0;
    text-align: center;
    border-spacing: 0;
    /*table-layout: fixed;*/
    width: 100%;
    height: 100%;
  }
  .cal-weekday {
    position:relative;
    font-family: PingFangSC-Medium;
    font-size: 11px;
    color: #FFFFFF;
    line-height: 12px;
    text-align: center;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  .cal-day-tag {
    /*margin: 0 auto;*/
    margin-left: 13px;
    border-radius:50%;
  }
  .tag-active {width:4px;height:4px;background:#4A90E2;}
  .cal-day {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #3D3D3D;
    letter-spacing: -0.29px;
    /*width: 30px;*/
    /*margin:0 auto;*/
    /*width:30px;*/
    /*height:30px;*/
    /*line-height:30px;*/
    /*font-family: PingFangSC-Medium;*/
    /*font-size: 15px;*/
    /*color: #FFFFFF;*/
  }
  .cal-day--focus {
    /*text-align: center;*/
    display: flex;
    align-items: center;
    justify-content: center;
    background:#4A90E2;
    color:white;
    border-radius: 50%;
    font-size: 15px;
    width: 30px;
    height: 30px;
  }
</style>
