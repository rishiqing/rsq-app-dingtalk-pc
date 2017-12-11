<template>
  <ul class="subtodo-list">
      <r-subtodo-item
        v-for="item in subTodos"
        :item="item"
        :is-checkable="isCheckable"
        @todo-item-click="showEdit"
        @todo-item-check="checkTodo"
        :key="item.id"
      ></r-subtodo-item>
  </ul>
</template>
<style lang="scss" scoped>
  .subtodo-list{
    margin: 0;
    padding-left:15px ;
  }
  .itemList{
    /*padding-bottom:1.306rem;*/

  }
  li:last-child{
    /*border-bottom: none;*/
  }
</style>
<script>
  import SubtodoItem from 'com/pub/SubtodoItem'

  export default {
    data () {
      return {
        sectionname: this.sectionName
      }
    },
    name: '',
    props: {
      subTodos: Array,
      isCheckable: Boolean,    //  是否显示完成复选框
      sectionName: String
    },
    computed: {
      itemcount () {
        return this.items.length >= 8 && this.isCheckable
      }
    },
    components: {
      'r-subtodo-item': SubtodoItem
    },
    methods: {
      showEdit (item) {
        this.$emit('todo-item-click', item)
//        this.$store.dispatch('setCurrentTodo', item)// 设置当前todo不管是inbox的todo还是ssche的todo
//        this.$router.push('/todo/' + item.id)
      },
      checkTodo (item, status) {
        this.$store.dispatch('submitTodoFinish', {item: item, status: status})
          .then(function () {
//              this.$store.dispatch('saveTodoAction', {editItem: {status: status}})
//                .then(() => {
//                })
          })
      }
    }
  }
</script>
