<template>
  <li class="SubtodoItem">
    <div class="todo-checkbox" @click="clickCheckOut(item)">
      <i class="icon2-check-box select"
         :class="{'icon-check_box_outline_blank': !item.isDone, 'icon-check': item.isDone}"></i>
      <div class="hide" :class="{'square-icon':item.isDone}"></div>
      <i class="icon2-selected finish-icon" :class="{'isdisplay':item.isDone}"></i>
    </div>
    <input  @keypress="changeSubItemTitle($event.target.value,$event)" class="subtodo-content" :class="{ 'text-grey': item.pIsDone, 'text-mid-line': item.pIsDone}" :value=item.name>
    <i class="icon2-arrow-down2 arrow-down" @click="showOption"></i>
    <div class="delete-subtodo" @click="deleteTask(item)" v-show="this.deleteState">删除子任务</div>
  </li>
</template>
<script>
//  import dateUtil from 'ut/dateUtil'
  export default {
    name: 'TodoItem',
    data () {
      return {
        deleteState: false
      }
    },
    props: {
      item: Object,
      isCheckable: Boolean
    },
    computed: {
      currentDate () { return this.$store.getters.defaultTaskDate }
    },
    methods: {
      clickCheckOut (item) {
        console.log(JSON.stringify(item))
        this.$store.dispatch('submitSubTodoFinish', {item: item, status: !item.isDone})
          .then(function () {
          })
      },
      changeSubItemTitle (newTitle, e) {
        if (event.keyCode === 13) {
          if (!newTitle) {
            alert('子任务标题不能为空')//          return Promise.reject()
            return
          }
          var params = {name: newTitle, id: this.item.id}
          return this.$store.dispatch('updateSubTodo', {editItem: params})
            .then(() => {
              e.target.blur()
              this.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED', params)
            })
        }
      },
      showOption () {
        this.deleteState = !this.deleteState
      },
      deleteTask (item) {
        this.$store.dispatch('deleteSubTodo', {item: item}).then(
          () => {
            this.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED')
          }
        )
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
  .delete-subtodo{
    font-size: 14px;
    position: absolute;
    top: 30px;
    right:5px;
    cursor: pointer;
  }
  .arrow-down{
    position: absolute;
    right:5px;
    font-size: 14px;
  }
  .todo-checkbox{
    display: flex;
    align-items: center;
    height: 35px;
  }
  .SubtodoItem{
    position: relative;
    display: flex;
    align-items: center;
    height: 35px;
  }
  .subtodo-content{
    border: none;
    font-size: 12px;
  }
  .select,.finish-icon{
    font-size: 14px;
  }
  .finish-icon{
    display: none;
  }
  .isdisplay{
    display: block;
    margin-left: -13px;
    margin-top: -10px;
  }
</style>
