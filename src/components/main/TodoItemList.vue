<template>
  <ul class="sche-list">
  <template v-if="this.sectionname==='重要紧急'">
    <r-todo-item
        v-for="item in items"
        v-if="item.pContainer==='IE'"
        :item="item"
        :sectionName="sectionname"
        :is-checkable="isCheckable"
        @todo-item-click="showEdit"
        @todo-item-check="checkTodo"
        :key="item.id"
    ></r-todo-item>
  </template>
   <template v-else-if="this.sectionname==='重要不紧急'">
     <r-todo-item
         v-for="item in items"
         v-if="item.pContainer==='IU'"
         :item="item"
         :sectionName="sectionName"
         :is-checkable="isCheckable"
         @todo-item-click="showEdit"
         @todo-item-check="checkTodo"
         :key="item.id"
     ></r-todo-item>
   </template>
  <template v-else-if="this.sectionname==='不重要紧急'">
    <r-todo-item
        v-for="item in items"
        v-if="item.pContainer==='UE'"
        :item="item"
        :sectionName="sectionName"
        :is-checkable="isCheckable"
        @todo-item-click="showEdit"
        @todo-item-check="checkTodo"
        :key="item.id"
    ></r-todo-item>
  </template>
  <template v-else-if="this.sectionname==='不重要不紧急'">
    <r-todo-item
        v-for="item in items"
        v-if="item.pContainer==='UU'"
        :item="item"
        :sectionName="sectionName"
        :is-checkable="isCheckable"
        @todo-item-click="showEdit"
        @todo-item-check="checkTodo"
        :key="item.id"
    ></r-todo-item>
  </template>
  </ul>
</template>
<style lang="scss" scoped>
  .sche-list{
    background-color: white;
    border-bottom:1px solid #E0E0E0 ;
    border-top:1px solid #DADADA ;
    padding-left: 3%;
    margin:0;
    height: 210px;
    overflow: auto;
  }
  .itemList{
    /*padding-bottom:1.306rem;*/

  }
  li:last-child{
    border-bottom: none;
  }
</style>
<script>
  import TodoItem from 'com/main/TodoItem'

  export default {
    data () {
      return {
        sectionname: this.sectionName
      }
    },
    name: 'TodoItemList',
    props: {
      items: Array,
      isCheckable: Boolean,    //  是否显示完成复选框
      sectionName: String
    },
    computed: {
      itemcount () {
        return this.items.length >= 8 && this.isCheckable
      }
    },
    components: {
      'r-todo-item': TodoItem
    },
    methods: {
      showEdit (item) {
        this.$emit('todo-item-click', item)
        this.$store.dispatch('setCurrentTodo', item)// 设置当前todo不管是inbox的todo还是ssche的todo
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
