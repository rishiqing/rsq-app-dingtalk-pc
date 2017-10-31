<template>
  <div>
    <div class="calendar">
      <div  class="wrap-date" @click="showSelectDate">
        <span class="year">{{selectYear||dateSelect.getFullYear()}}</span>
        <span class="month">{{selectMonth||dateSelect.getMonth()+1}}</span>
      </div>
      <r-selectDate
        v-show="selectDate"
        @changeMonth="changeMonth"
      >
      </r-selectDate>
      <r-calendar
        :default-select-date="dateSelect"
        @click-cal-day="fetchItems"
      ></r-calendar>
      <span class="inbox" @click="showInbox">收纳箱</span>
      <r-inbox
        v-show="this.showInbox"
      ></r-inbox>
    </div>
    <div id="sche-wrap">
      <r-section v-for="item in this.section"
        :sectionName="item"
        :key="item.id"
        @todo-item-click="showDetail"
      ></r-section>
      <r-detail
        :item=this.item
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
        section: [ '重要紧急', '重要不紧急', '不重要紧急', '不重要不紧急' ],
        currentDate: new Date(),
        item: null,
        IsShow: false,
        selectDate: false,
        showInbox: false
//        selectMonth: '',
//        selectYear: ''
      }
    },
    computed: {
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
      fetchItems (strDate) {
//        window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(strDate)})
        this.$store.dispatch('fetchScheduleItems', { strDate })
          .then(() => {
//            this.updateScroll()
          })
      },
      showInbox () {
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
      showDetail (item) {
        this.item = item
        this.$store.dispatch('setCurrentTodo', item)
        this.IsShow = true
      },
      closeDetail () {
        this.IsShow = false
      }
    }
  }
</script>

<style>
  .calendar{
    position: relative;
    display: flex;
    align-items: center;
  }
  .inbox{
    font-size: 14px;
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
