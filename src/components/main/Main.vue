<template>
  <div class="main" @click="hideSelectDate">
    <div class="header-me">
      <div class="wrap-head-img">
        <img class="link-to-rsq" src="../../assets/c.png" alt="" @click="openLink">
        <img src="../../assets/a.png" alt="" class="head-pic">
      </div>
      <!--<avatar v-for="item in selectedLocalList"-->
              <!--:key="item.rsqUserId"-->
              <!--:src="item.avatar"-->
              <!--:username="item.name"></avatar>-->
      <avatar :key="this.loginUser.authUser.rsqUserId"
              :src="this.loginUser.authUser.avatar"
              :username="this.loginUser.authUser.name"></avatar>
    </div>
    <div class="calendar">
      <div  class="wrap-date" @click="showSelectDate($event)">
        <div class="wrap-month">
          <div class="month">{{selectMonth||dateSelect.getMonth()+1}}</div>
          <div class="year">{{selectYear||dateSelect.getFullYear()}}</div>
        </div>
        <i class="icon2-arrow-down-triangle arrow-down-date"></i>
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
      <div class="right-side">
        <span class="return-to-today" @click="returnToday">返回今天</span>
        <span class="divide">|</span>
        <div class="wrap-inbox-icon">
          <i class="icon2-filed inbox-icon"></i>
          <span class="inbox" @click="showInboxState($event)">收纳箱</span>
        </div>
      </div>
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
  import util from 'ut/jsUtil'
  import Avatar from 'com/pub/TextAvatar'
  export default {
    name: 'app',
    components: {
      'r-section': Section,
      'r-detail': Detail,
      'r-calendar': Calendar,
      'r-selectDate': selectDate,
      'r-inbox': Inbox,
      'avatar': Avatar
    },
    data () {
      return {
        selectedLocalList: [],
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
      loginUser () {
        return this.$store.getters.loginUser || {}
      },
      userId () {
        return this.loginUser.authUser.userId
      },
      corpId () {
        return this.loginUser.authUser.corpId
      },
      titleArray () {
        return this.$store.state.schedule.titleArray
      },
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
      hideSelectDate () {
        this.selectDate = false
        this.showInbox = false
      },
      openLink () {
        window.rsqadmg.execute('openLink', {
          'corpID': this.corpId,
          'userID': this.userId,
          success () {
          }
        })
      },
      returnToday () {
        Bus.$emit('returnToday', new Date())
        this.$store.commit('PUB_SCHE_DATE_UPDATE', {month: new Date().getMonth() + 1, year: new Date().getFullYear()})
      },
      fetchDatesHasTodo (p) {
        var weekArray = p.daysArray[1]
        var firstDate = p.daysArray[0][0].date
        var secondDate = weekArray[1].date
//        console.log('拿到的日期' + (secondDate.getMonth() + 1) + ':' + secondDate.getDate())
//        console.log('目前日期' + this.dateSelect.getMonth())
//        if (secondDate.getMonth() + 1 !== this.dateSelect.getMonth()) {
        this.$store.commit('PUB_SCHE_DATE_UPDATE', {month: secondDate.getMonth() + 1, year: secondDate.getFullYear()})
//        }
        var lastDate = p.daysArray[2][6].date
//        var titleDate = weekArray[3].date
//        window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(titleDate)})
        this.$store.dispatch('getDatesHasTodo', {
          startDate: firstDate,
          endDate: lastDate
        }).then(res => {
          p.daysArray.forEach((days) => {
            days.forEach((day) => {
              if (res.indexOf(String(day.date.getTime())) !== -1) {
                this.$set(day, 'showTag', true)
              }
            })
          })
        })
      },
      fetchItems (strDate) {
//        console.log('去拿数据了')
//        window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(strDate)})
        this.$store.dispatch('fetchScheduleItems', { strDate })
          .then(() => {
//            this.updateScroll()
          })
      },
      showInboxState (e) {
        this.showInbox = !this.showInbox
        e.stopPropagation()
      },
      changeMonth (month, year) {
//        console.log('穿过俩的month和year是' + month + year)
        this.selectDate = false
//        this.selectMonth = month.toString()
//        this.selectYear = year.toString()
//        console.log('穿过俩的month和year是' + month + year)
//        this.dateSelect = new Date(this.selectYear, this.Month, 1)
      },
      showSelectDate (e) {
        this.selectDate = !this.selectDate
        e.stopPropagation()
      },
      showDetail (item, itemTitle) {
//        console.log('进来了')
        this.item = item
        this.itemTitle = itemTitle
//        this.$store.dispatch('setCurrentTodo', item)
        this.IsShow = true
//        console.log('进来了showDetail')
      },
      closeDetail () {
        this.IsShow = false
      },
      getAllTodoTitleList () {
        this.$store.dispatch('getAllTodoTitleList')
      },
      getInboxTodos () {
        this.$store.dispatch('fetchInboxItems')
      },
      fetchUserIds (targetListName) {
        var corpId = this.loginUser.authUser.corpId
        //  暂时去掉loader
//        window.rsqadmg.exec('showLoader')
//        console.log('this.userId' + this.userId)
        return this.$store.dispatch('fetchUseridFromRsqid', {corpId: corpId, idArray: ['2468']})
          .then(idMap => {
//            console.log('idmap' + JSON.stringify(idMap))
            this[targetListName] = util.getMapValuePropArray(idMap)
//            console.log('this.loginUser: %o', this.loginUser.authUser.avatar)
//            window.rsqadmg.exec('hideLoader')
          })
      }
    },
    created () {
      this.getAllTodoTitleList()
      this.getInboxTodos()
      this.fetchUserIds('selectedLocalList')
//      this.openLink()
//      console.log(this.titleArray.length)
    },
    mounted () {
    }
  }
</script>

<style>
  .head-pic{
    margin-left: 10px;
  }
  #box {
    width: 150px;
    height: 30px;
    font-size: 13px;
    /*border: 1px solid red;*/
    background: #3D95EB;
    position: relative;
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
  }
  #box:before{
    content: "";
    width: 21px;
    height: 21px;
    /*border:1px solid blue;*/
    transform: rotate(45deg);
    position:absolute;
    left:-11px;
    top:4px;
    border-left:none;
    border-bottom:none;
    background: #3D95EB
  }
  /*@media (min-width: 1201px) {*/
    /*.right-side{*/
      /*width:20%;*/
    /*}*/
  /*}*/
 /*@media (min-width: 1100px) and (max-width: 1200px) {*/
   /*.right-side{*/
     /*width: 18%;*/
     /*margin-left: -3%;*/
   /*}*/
    /*.return-to-today{*/
      /*!*margin-left: -30px;*!*/
   /*}*/
   /*.inbox-icon{*/
     /*!*margin-left: 15px;*!*/
   /*}*/
  /*}*/
 /*@media (max-width: 1100px) and (min-width: 1001px) {*/
   /*.right-side{*/
     /*width: 16%;*/
   /*}*/
   /*.return-to-today{*/
     /*!*margin-left: -25px;*!*/
   /*}*/
   /*.inbox-icon{*/
     /*!*margin-left: 20px;*!*/
   /*}*/
 /*}*/
 /*@media (max-width: 1000px) and (min-width: 901px) {*/
   /*.right-side{*/
     /*width: 20%;*/
   /*}*/
   /*.return-to-today{*/
     /*!*margin-left: -20px;*!*/
   /*}*/
   /*.inbox-icon{*/
     /*!*margin-left: 15px;*!*/
   /*}*/
 /*}*/
 /*@media (max-width: 900px) and (min-width: 801px){*/
   /*.right-side{*/
     /*width: 19%;*/
   /*}*/
   /*.return-to-today{*/
     /*!*margin-left: -15px;*!*/
   /*}*/
   /*.inbox-icon{*/
     /*!*margin-left:1% ;*!*/
   /*}*/
 /*}*/
 /*@media (max-width: 800px) {*/
   /*.right-side{*/
     /*width: 22%;*/
   /*}*/
   /*.inbox-icon{*/
     /*!*margin-left: 13px;*!*/
   /*}*/
   /*.return-to-today{*/
     /*!*margin-left: -10px;*!*/
   /*}*/
 /*}*/
 .wrap-head-img{
   position: relative;
   display: flex;
   align-items: center;
   width: 95%;
   padding-left: 12px;
 }
 .wrap-inbox-icon{
   flex:3;
   display: flex;
   align-items: center;
   margin-right: 10px;

 }
 .right-side{
   display: flex;
   align-items: center;
   /*margin-left: -1%;*/
   width: 150px;
   position: absolute;
   top:15px;
   right:12px
 }
 .link-wrap-img{
   width: 96%;
 }
 .header-me{
   display: flex;
   align-items: center;
   background-color: white;
   height: 50px;
 }
 .link-to-rsq{
   /*width: 96%;*/
   cursor: pointer;
   height: 24px;
 }
 .inbox-icon{
   font-size: 14px;
   color:#5EADFD
   /*margin-left: 15px;*/
 }
 .divide{
   /*margin-left: 15px;*/
   flex: 1;
 }
 .main{
   width: 100%;
   height: 100%;
   overflow: hidden;
 }
 .month{
   display: flex;
   justify-content: flex-end;
 }
 .arrow-down-date{
   font-size: 12px;
   color:#4A90E2
 }
 .return-to-today{
   /*margin-left: -30px;*/
   flex:3;
   font-family: PingFangSC-Regular;
   font-size: 12px;
   color: #8C8C8C;
   cursor: pointer;
   z-index: 100;
  }
  .wrap-month{

  }
  .calendar{
    /*border: 1px solid red;*/
    border-top: 1px solid #D6D4D4;
    border-bottom: 1px solid #D6D4D4;
    background-color: white;
    position: relative;
    display: flex;
    align-items: center;
  }
  .inbox{
    /*top: 35%;*/
    font-size: 12px;
    margin-left: 5px;
    /*margin-left: 70px;*/
    /*position: absolute;*/
    /*right: 1.5%;*/
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5EADFD;
  }
  .year{
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #3D3D3D;
    letter-spacing: -0.29px;
  }
  .month{
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #3D3D3D;
    letter-spacing: -0.43px;
  }
  .wrap-date{
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-left: 1%;
  }
  #sche-wrap{
    overflow: hidden;
    width: 100%;
    height: 83%;
    background-color: #F0F0F0;
    padding-bottom: 8%;
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*position: absolute;*/
  }
  #sche-wrap:after{
    content: '';
    display: block;
    clear: both;
  }
</style>
