<template>
  <div class="wrap-edit-date">
    <div class="wrap-date" @click="changeEditDate">
      <i class="icon2-schedule date-icon"></i>
      <span class="date">日期</span>
      <!--<span class="now" >{{timeValue}}</span>-->
    </div>
    <r-todo-edit-date
      v-show="this.editDate"
    >
    </r-todo-edit-date>
  </div>
</template>
<style>
  .wrap-edit-date{
    position: relative;
  }
  .date-icon{
    font-size: 14px;
  }
  .date{
    font-size: 12px;
  }
  .wrap-date{
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:1px solid gray ;
    cursor: pointer;
  }


</style>
<script>
  import TodoEditDate from 'com/pub/TodoEditDate'
  export default {
    data () {
      return {
        editDate: false
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
    components: {
      'r-todo-edit-date': TodoEditDate
    },
    methods: {
      changeEditDate () {
        this.editDate = !this.editDate
//        console.log('进来1次')
      },
      gotoTodoTime () {
//        console.log('进来了')
//        if (this.disabled) {
//          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
//          return
//        }
//        this.$emit('time-tap') // 谁来接收它呢
//        //  将需要用到的属性设置到currentTodoTime中
//        var timeObj = {
//          clock: JSON.parse(JSON.stringify(this.itemClock))
//        }
//        console.log(JSON.stringify(timeObj))
//        this.$store.commit('PUB_TODO_TIME_UPDATE', {data: timeObj})
//        this.$router.push('/todoEdit/time')
      }
    },
    created () {}
  }
</script>
