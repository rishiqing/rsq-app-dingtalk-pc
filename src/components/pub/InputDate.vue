<template>
  <div class="wrap-edit-date">
    <div class="wrap-date" @click="changeEditDate">
      <i class="icon2-schedule date-icon"></i>
      <span class="date">日期</span>
      <span class="now" >{{dateString}}</span>
    </div>
    <r-todo-edit-date
      v-show="this.editDate"
      @close-edit-date="closeEditDate"
    >
    </r-todo-edit-date>
  </div>
</template>
<style>
  .now{
    font-size: 15px;
  }
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
  import dateUtil from 'ut/dateUtil'
  export default {
    data () {
      return {
        editDate: false
      }
    },
    computed: {
      dateString () {
        if (this.currentTodo.pContainer === 'inbox') {
          return '添至日程'
        } else {
//          console.log('currentTodo是' + JSON.stringify(this.currentTodo))
          var result = dateUtil.repeatDate2Text(this.currentTodo)
//          console.log('result是' + JSON.stringify(result))
          if (result.length > 20) {
            result = result.substring(0, 21)
          }
          var time = new Date()
          var newTime = time.getMonth() + 1 + '月' + time.getDate() + '日'
          return newTime === result ? '今天' : result
        }
      }
    },
    props: {
      currentTodo: Object
    },
    components: {
      'r-todo-edit-date': TodoEditDate
    },
    methods: {
      changeEditDate () {
        this.editDate = !this.editDate
      },
      closeEditDate () {
        this.editDate = false
      }
    },
    created () {
      var c = this.currentTodo
      var obj = {
        startDate: c.startDate || null,
        endDate: c.endDate || null,
        dates: c.dates || null,
        repeatType: c.repeatType || null,
        repeatBaseTime: c.repeatBaseTime || null,
        isLastDate: c.isLastDate === undefined || false,
        isCloseRepeat: c.isCloseRepeat
      }
      this.$store.commit('PUB_TODO_DATE_UPDATE', {data: obj})
    }
  }
</script>
