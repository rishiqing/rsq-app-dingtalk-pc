<template>
  <div class="subtodo">
    <div class="subtodo-head">
      <i class="icon2-subplan-web subplan-icon"></i>
      <span class="subplan margin-detail">子任务</span>
    </div>
    <r-subtodo-item-list
      :subTodos="subTodos"
      :isCheckable="true"
    >
    </r-subtodo-item-list>
    <input autofocus ref="subtodoInput" type="text" class="subtodo-input" v-show="InputState" @keypress="createSubtodo($event.target.value,$event)" @blur="hideInput">
    <div class="subtodo-create" @click="showSubTodoInput">
      <i class="icon2-add-circle add-icon"></i>
      <span class="subplan-add margin-detail">添加子任务</span>
    </div>

  </div>
</template>
<style lang="" scoped>
  .subplan-add{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5EADFD;
  }
  .subtodo{
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .subtodo-head{
    border-bottom: 1px solid #EAEAEA;
  }
  .subtodo-head,.subtodo-create,.subtodo-input{
    padding-left: 15px;
    display: flex;
    align-items: center;
    height: 35px;
  }
  .subtodo-input{
    margin-left: 15px;
    /*border: none;*/
  }
  .subtodo-create{
    cursor: pointer;
  }
  .subplan-icon,.add-icon{
    font-size: 14px;
  }
  .add-icon{
    color:#5EADFD
  }
  .subplan{
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: #B1B1B1;
  }
</style>
<script>
  import SubTodoItemList from 'com/pub/SubTodoItemList'
  export default {
    data () {
      return {
        InputState: false
      }
    },
    props: {
      item: Object,
      editTime: Boolean,
      disabled: Boolean
    },
    components: {
      'r-subtodo-item-list': SubTodoItemList
    },
    computed: {
      subTodos () {
        return this.$store.state.todo.currentTodo.subTodos// 其实有没有必要写这个呢，因为currenttodo是动态变化的，只要重新和后台打交道setcurrent以后自然可以变化
      }
    },
    methods: {
      hideInput () {
        this.InputState = false
      },
      showSubTodoInput () {
//        if (this.disabled) {
//          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
//          return
//        }
        this.InputState = true
//        console.log(this.$refs.subtodoInput)
//        this.$refs.subtodoInput.focus()
      },
      createSubtodo (value, event) {
        if (event.keyCode === 13) {
//          console.log('进来了') // 参数有主任务id和name
          this.$store.dispatch('createSubTodo', {id: this.item.id, name: value, pIsDone: false})
            .then(item => {
//              this.InputState = false
              event.target.value = ''
              document.getElementsByClassName('subtodo-input').value = ''
//              console.log('返回来的item是' + item)
              return item
            })
        }
      }
    }
  }
</script>
