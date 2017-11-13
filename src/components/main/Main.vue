<template>
  <div>
    <div class="calendar">
      <div  class="wrap-date" @click="showSelectDate">
        <div class="wrap-month">
          <div class="month">{{selectMonth||dateSelect.getMonth()+1}}</div>
          <div class="year">{{selectYear||dateSelect.getFullYear()}}</div>
        </div>
        <i></i>
      </div>
      <r-selectDate
        v-show="selectDate"
        @changeMonth="changeMonth"
      >
      </r-selectDate>
      <r-calendar
        :default-select-date="dateSelect"
        @click-cal-day="fetchItems"
        @after-cal-swipe="fetchDatesHasTodo"
      ></r-calendar>
      <span class="return-to-today" @click="returnToday">返回今天</span>
      <span class="inbox" @click="showInboxState">收纳箱</span>
      <r-inbox
        :showInbox="showInbox"
      ></r-inbox>
    </div>
    <div id="sche-wrap">
      <r-section v-for="item in this.titleArray"
        :itemTitle="item"
        :key="item.id"
        @todo-item-click="showDetail"
      ></r-section>
      <r-detail
        :item="this.item"
        :itemTitle="this.itemTitle"
        v-if="this.IsShow"
        @close-detail="closeDetail"
      ></r-detail>
    </div>
  </div>
</template>

<script>
  import Calendar from 'com/pub/Calendar'
  import Section from 'com/main/Section'
  import Detail from 'com/detail/Detail'
  import selectDate from 'com/main/selectDate'
  import moment from 'moment'
  import Inbox from 'com/inbox/Inbox'
  import Bus from 'com/bus'
  export default {
    name: 'app',
    components: {
      'r-section': Section,
      'r-detail': Detail,
      'r-calendar': Calendar,
      'r-selectDate': selectDate,
      'r-inbox': Inbox
    },
    data () {
      return {
//        section: [ '重要紧急', '重要不紧急', '不重要紧急', '不重要不紧急' ],
        currentDate: new Date(),
        item: '',
        IsShow: false,
        selectDate: false,
        showInbox: false,
        itemTitle: ''
//        selectMonth: '',
//        selectYear: ''
      }
    },
    computed: {
      titleArray () {
        return this.$store.state.schedule.titleArray
      },
//      showDate () {
//        if (this.selectMonth) {
//          return this.selectMonth
//        } else {
//          return this.dateSelect
//        }
//      },
      dateSelect () {
        var strDate = this.$store.state.schedule.strCurrentDate
        return strDate ? moment(strDate, 'YYYY-MM-DD').toDate() : new Date()
      },
      selectYear () {
        return this.$store.state.pub.year
      },
      selectMonth () {
        return this.$store.state.pub.month
      }
    },
    methods: {
      returnToday () {
        Bus.$emit('returnToday', new Date())
        this.$store.commit('PUB_SCHE_DATE_UPDATE', {month: new Date().getMonth() + 1, year: new Date().getFullYear()})
      },
      fetchDatesHasTodo (p) {
        var weekArray = p.daysArray[1]
        var firstDate = weekArray[0].date
        var lastDate = weekArray[weekArray.length - 1].date
//        var titleDate = weekArray[3].date
//        window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(titleDate)})
        this.$store.dispatch('getDatesHasTodo', {
          startDate: firstDate,
          endDate: lastDate
        }).then(res => {
          weekArray.forEach(day => {
            if (res.indexOf(String(day.date.getTime())) !== -1) {
              this.$set(day, 'showTag', true)
            }
          })
        })
      },
      fetchItems (strDate) {
//        window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(strDate)})
        this.$store.dispatch('fetchScheduleItems', { strDate })
          .then(() => {
//            this.updateScroll()
          })
      },
      showInboxState () {
        this.showInbox = !this.showInbox
      },
      changeMonth (month, year) {
//        console.log('穿过俩的month和year是' + month + year)
        this.selectDate = false
//        this.selectMonth = month.toString()
//        this.selectYear = year.toString()
//        console.log('穿过俩的month和year是' + month + year)
//        this.dateSelect = new Date(this.selectYear, this.Month, 1)
      },
      showSelectDate () {
        this.selectDate = !this.selectDate
      },
      showDetail (item, itemTitle) {
//        console.log('进来了')
        this.item = item
        this.itemTitle = itemTitle
//        this.$store.dispatch('setCurrentTodo', item)
        this.IsShow = true
      },
      closeDetail () {
        this.IsShow = false
      },
      getAllTodoTitleList () {
        this.$store.dispatch('getAllTodoTitleList')
      },
      getInboxTodos () {
        this.$store.dispatch('fetchInboxItems')
      }
    },
    mounted () {
      this.getAllTodoTitleList()
      this.getInboxTodos()
    }
  }
</script>

<style>
  .return-to-today{
    font-size: 15px;
    cursor: pointer;
  }
  .wrap-month{

  }
  .calendar{
    position: relative;
    display: flex;
    align-items: center;
  }
  .inbox{
    font-size: 14px;
    margin-left: 70px;
  }
  .year{
    font-size: 18px;
  }
  .month{
    font-size: 14px;
  }
  .wrap-date{
    cursor: pointer;
  }
  #sche-wrap{
    width: 100%;
    height: 100%;
  }
  #sche-wrap:after{
    content: '';
    display: block;
    clear: both;
  }
</style>
