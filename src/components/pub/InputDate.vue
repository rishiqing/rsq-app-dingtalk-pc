<template>
  <div class="wrap-edit-date">
    <div class="wrap-date-detail">
      <i class="icon2-schedule date-icon"></i>
      <span class="date margin-detail">日期</span>
      <span class="now margin-detail font-style" @click="changeEditDate($event)">{{dateString}}</span>
    </div>
    <r-todo-edit-date
      v-show="this.editDate && this.showEditDate"
      :ifshow="ifshow"
      @close-edit-date="closeEditDate"
    >
    </r-todo-edit-date>
  </div>
</template>
<style>
  .now{
    cursor: pointer;
    /*font-size: 15px;*/
  }
  .wrap-edit-date{
    margin-top: 10px;
    position: relative;
  }
  .date-icon{
    font-size: 14px;
  }
  .date{
    font-size: 13px;
    font-family: PingFangSC-Regular;
    color: #B1B1B1;
  }
  .wrap-date-detail{
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:0.5px solid #EAEAEA ;
    padding-left: 15px;
  }


</style>
<script>
  import TodoEditDate from 'com/pub/TodoEditDate'
  import dateUtil from 'ut/dateUtil'
  import Bus from 'com/bus'
  export default {
    data () {
      return {
        editDate: false,
        showEditDate: ''
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
      currentTodo: Object,
      ifshow: Boolean
    },
    components: {
      'r-todo-edit-date': TodoEditDate
    },
    watch: {
      ifshow () {
//        console.log('inputdate监听到变化了')
        this.showEditDate = this.ifshow
        if (this.editDate) {
          this.editDate = false
          Bus.$emit('senddate')
        }
      }
    },
    methods: {
      changeEditDate (e) {
//        e.stopPropagation()
        this.editDate = !this.editDate
        if (!this.showEditDate) {
          this.showEditDate = !this.showEditDate
        }
        Bus.$emit('closetime')
        Bus.$emit('close-add-plan')
        Bus.$emit('close-priority')
        e.stopPropagation()
//        this.$store.commit('SHOW_DATE')
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
      this.showEditDate = this.ifshow
    },
    mounted () {
      Bus.$on('closedate', () => {
        this.editDate = false
      })
      Bus.$on('close-date', () => {
        if (this.editDate) {
          Bus.$emit('senddate')
        } else {
          this.editDate = false
        }
      })
    }
  }
</script>
