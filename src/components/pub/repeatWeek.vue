<template>
  <div class="wrap-week">
    <div class="week-top">
      <div v-for="weekday in this.weekArrayforward" @click="clickWeek(weekday)" :class="{'selected': weekday.isSelected}">
        {{weekday.week}}
      </div>
    </div>
    <div class="week-bottom">
      <div v-for="weekday in this.weekArraybackward" @click="clickWeek(weekday)" :class="{'selected':weekday.isSelected}">
        {{weekday.week}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        weekArrayforward: [
          {week: '周一', isSelected: false, flag: 1},
          {week: '周二', isSelected: false, flag: 2},
          {week: '周三', isSelected: false, flag: 3},
          {week: '周四', isSelected: false, flag: 4}
        ],
        weekArraybackward: [
          {week: '周五', isSelected: false, flag: 5},
          {week: '周六', isSelected: false, flag: 6},
          {week: '周日', isSelected: false, flag: 7}
        ],
        selectWeekDate: this.weekDate
      }
    },
    computed: {
//      itemClock () {
//        return this.item.clock || {}
//      },
//      isAllDay () {
//        return !this.itemClock.startTime
//      },
//      timeValue () {
//        return this.isAllDay ? '全天' : this.itemClock.startTime + '-' + this.itemClock.endTime
//      }
    },
    props: {
      weekDate: Array
//      editTime: Boolean,
//      disabled: Boolean,
//      newItem: Boolean
    },
    methods: {
      clickWeek (obj) {
        if (obj.isSelected) {
          obj.isSelected = !obj.isSelected
          var index = this.selectWeekDate.indexOf(obj.flag)
          if (index > -1) {
            this.selectWeekDate.splice(index, 1)
          }
        } else {
          obj.isSelected = true
          this.selectWeekDate.push(obj.flag)
        }
        this.$store.commit('PUB_WEEK_DATE_UPDATE', {data: this.selectWeekDate})
      }
    },
    created () {
      if (this.weekDate.length > 0) {
        for (var i = 0; i < this.weekDate.length; i++) {
          var week = new Date(this.weekDate[i]).getDay()
          if (week > 4) {
            this.weekArraybackward[week - 5].isSelected = true
            this.selectWeekDate.push(week)
          } else {
            this.weekArrayforward[week - 1].isSelected = true
            this.selectWeekDate.push(week)
          }
        }
      }
    }
  }
</script>
<style>
  .wrap-week{
    width: 240px;
    height:164px;
    margin-top: 30px;
  }
  .selected{
    background-color: #5EADFD;
    color:white !important;
  }
  .week-bottom div:hover{
    border: 1px solid #5EADFD;
    color:#5EADFD
  }
  .week-top div:hover{
    border: 1px solid #5EADFD;
    color:#5EADFD
  }
  .week-top div{
    margin: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
    border:1px solid #D5D5D5;
  }
  .week-bottom div{
    border:1px solid #D5D5D5;
    margin:10px ;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
  }
  .week-bottom, .week-top{
    display: flex;
    align-items: center;
    justify-content: center;
    /*border: 1px solid red;*/
  }

</style>
