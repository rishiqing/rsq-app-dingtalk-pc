<template>
  <li class="SubtodoItem">
    <div class="todo-checkbox" @click="clickCheckOut(item)">
      <i class="icon2-check-box select"
         :class="{'icon-check_box_outline_blank': !item.pIsDone, 'icon-check': item.pIsDone}"></i>
      <div class="hide" :class="{'square-icon':item.pIsDone}"></div>
      <i class="icon2-selected finish-icon" :class="{'isdisplay':item.pIsDone}"></i>
    </div>
    <span class="subtodo-content" :class="{ 'text-grey': item.pIsDone, 'text-mid-line': item.pIsDone}">{{ item.name }}</span>
  </li>
</template>
<script>
//  import dateUtil from 'ut/dateUtil'
  export default {
    name: 'TodoItem',
    data () {
      return {}
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
        this.$store.dispatch('submitSubTodoFinish', {item: item, status: item.pIsDone})
          .then(function () {
          })
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
  .todo-checkbox{
    display: flex;
    align-items: center;
    height: 35px;
  }
  .SubtodoItem{
    display: flex;
    align-items: center;
    height: 35px;
  }
  .subtodo-content{
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
