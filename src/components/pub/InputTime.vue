<template>
  <div class="wrap-edit-time" @click="changeEditTime($event)">
    <div class="wrap-time" @click="changeEditTime($event)">
      <i class="icon2-alarm time-icon"></i>
      <span class="time margin-detail">时间</span>
      <span class="showTime font-style">{{timeValue}}</span>
    </div>
    <r-todo-edit-time
      v-show="this.editTime && this.showEditTime"
      :ifshow="ifshow"
      :editTime="editTime"
      @close-time="hideEditTime"
    >
    </r-todo-edit-time>
  </div>
</template>
<style lang="" scoped>
  .wrap-edit-time{
    position: relative;
    cursor: pointer;
  }
  .time-icon{
    font-size: 14px;
  }
  .time{
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: #B1B1B1;
  }
  .showTime {
    margin-left: 10px;
  }
  .wrap-time{
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:0.5px solid #EAEAEA ;
  }
</style>
<script>
  import TodoEditTime from 'com/pub/TodoEditTime'
  import Bus from 'com/bus'
  export default {
    data () {
      return {
        editTime: false,
        showEditTime: ''
      }
    },
    computed: {
      itemClock () {
        return this.currentTodo.clock || {}
      },
      isAllDay () {
        return !this.itemClock.startTime
      },
      timeValue () {
        return this.isAllDay ? '全天' : this.itemClock.startTime + '-' + this.itemClock.endTime
      }
    },
    components: {
      'r-todo-edit-time': TodoEditTime
    },
    props: {
      currentTodo: Object,
//      showTime: Boolean,
      ifshow: Boolean
//      editTime: Boolean,
//      disabled: Boolean,
//      newItem: Boolean
    },
    watch: {
      ifshow () {
//        console.log('inputtime监听到变化了')
        this.showEditTime = this.ifshow
        if (this.editTime) {
          this.editTime = false
          Bus.$emit('sendtime')
        }
      }
    },
    methods: {
      hideEditTime () {
//        this.editTime = !this.editTime
      },
      changeEditTime (e) {
//        console.log('进来了')
        this.editTime = !this.editTime
        if (!this.showEditTime) {
          this.showEditTime = !this.showEditTime
        }
        Bus.$emit('closedate')
        Bus.$emit('close-priority')
        e.stopPropagation()
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
      },
      init () {
        this.showEditTime = this.ifshow
      }
    },
    created () {
      this.init()
    },
    mounted () {
      Bus.$on('closetime', () => {
        if (this.editTime) {
          this.editTime = false
        }
      })
      Bus.$on('close-time', () => {
        if (this.editTime) {
          this.editTime = false
        }
      })
    }
  }
</script>
