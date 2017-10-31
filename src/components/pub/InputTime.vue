<template>
  <div class="wrap-edit-time">
    <div class="wrap-time" @click="changeEditTime">
      <i class="icon2-alarm time-icon"></i>
      <span class="time">时间</span>
    </div>
    <r-todo-edit-time v-show="this.editTime">
    </r-todo-edit-time>
  </div>
</template>
<style lang="" scoped>
  .wrap-edit-time{
    position: relative;
  }
  .time-icon{
    font-size: 14px;
  }
  .time{
    font-size: 12px;
  }
  .wrap-time{
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:1px solid gray ;
  }
</style>
<script>
  import TodoEditTime from 'com/pub/TodoEditTime'
  export default {
    data () {
      return {
        editTime: false
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
    components: {
      'r-todo-edit-time': TodoEditTime
    },
    props: {
//      item: Object,
//      editTime: Boolean,
//      disabled: Boolean,
//      newItem: Boolean
    },
    methods: {
      changeEditTime () {
        console.log('进来了')
        this.editTime = !this.editTime
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
