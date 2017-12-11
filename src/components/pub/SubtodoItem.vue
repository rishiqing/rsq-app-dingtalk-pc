<template>
  <li class="SubtodoItem">
    <div class="todo-checkbox" @click="clickCheckOut(item)">
      <i class="icon2-check-box select"
         :class="{'icon-check_box_outline_blank': !item.isDone, 'icon-check': item.isDone}"></i>
      <div class="hide" :class="{'square-icon':item.isDone}"></div>
      <i class="icon2-selected finish-icon" :class="{'isdisplay':item.isDone}"></i>
    </div>
    <input  @keypress="changeSubItemTitle($event.target.value,$event)" class="subtodo-content margin-detail" :class="{ 'text-grey': item.pIsDone, 'text-mid-line': item.pIsDone}" :value=item.name>
    <i class="icon2-arrow-down2 arrow-down" @click="showOption($event)"></i>
    <div class="delete-subtodo" @click="deleteTask(item)" v-show="this.deleteState">删除子任务</div>
  </li>
</template>
<script>
//  import dateUtil from 'ut/dateUtil'
  import Bus from 'com/bus'
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
      showOption (e) {
        this.deleteState = !this.deleteState
        e.stopPropagation()
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
      Bus.$on('close', () => {
        this.deleteState = false
      })
    }
  }
</script>
<style scoped>
  .hide {
    display: none;
  }
  .todo-checkbox .square-icon{
    display: block;
    background-color: white;
    border:1px solid white;
    width:4px;
    height: 4px;
    margin-left: -5px;
    margin-top: -8px;
  }
  .delete-subtodo{
    z-index: 200;
    font-size: 14px;
    position: absolute;
    top: 30px;
    right:5px;
    cursor: pointer;
    background-color: white;
    box-shadow: 3px 5px 24px #888888;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*text-align: center;*/
    height: 40px;
  }
  .arrow-down{
    cursor: pointer;
    position: absolute;
    right:5px;
    font-size: 14px;
    top: 10px;
  }
  .todo-checkbox{
    display: flex;
    align-items: center;
    height: 35px;
  }
  li.SubtodoItem{
    position: relative;
    display: flex;
    align-items: center;
    height: 35px;
    border-bottom: 0.5px solid #EAEAEA;
  }
  .subtodo-content{
    border: none;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: #3D3D3D;
  }
  .select,.finish-icon{
    font-size: 14px;
    cursor: pointer;
  }
  .finish-icon{
    display: none;
    color:#7bbdff
  }
  .isdisplay{
    display: block;
    margin-left: -13px;
    margin-top: -10px;
  }
</style>
