<template>
  <div class="wrap-week">
    <div class="week-top">
      <div v-for="weekday in this.weekArrayforward" @click="clickWeek(weekday)" :class="{'selected': weekday.isSelected}">
        {{weekday.week}}
      </div>
      <!--<div @click="changeBackGround" :class="{'selected': isSelected}">周一</div>-->
      <!--<div @click="changeBackGround" :class="{'selected': isSelected}">周二</div>-->
      <!--<div @click="changeBackGround">周三</div>-->
      <!--<div @click="changeBackGround">周四</div>-->
    </div>
    <div class="week-bottom">
      <div v-for="weekday in this.weekArraybackward" @click="clickWeek(weekday)" :class="{'selected':weekday.isSelected}">
        {{weekday.week}}
      </div>
      <!--<div @click="changeBackGround">周五</div>-->
      <!--<div @click="changeBackGround">周六</div>-->
      <!--<div @click="changeBackGround">周日</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        weekArrayforward: [
          {week: '周一', isSelected: false},
          {week: '周二', isSelected: false},
          {week: '周三', isSelected: false},
          {week: '周四', isSelected: false}
        ],
        weekArraybackward: [
          {week: '周五', isSelected: false},
          {week: '周六', isSelected: false},
          {week: '周日', isSelected: false}
        ]
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
//      item: Object,
//      editTime: Boolean,
//      disabled: Boolean,
//      newItem: Boolean
    },
    methods: {
      clickWeek (obj) {
        if (obj.isSelected) {
          obj.isSelected = !obj.isSelected
        } else {
          obj.isSelected = true
        }
//        console.log('进来1次')
      }
    },
    created () {}
  }
</script>
<style>
  .selected{
    background-color: blue;
    color:white;
  }
  .week-bottom div:hover{
    color:green
  }
  .week-top div:hover{
    color:green
  }
  .week-top div{
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
    border:1px solid red;
  }
  .week-bottom div{
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
    border: 1px solid red;
  }

</style>
