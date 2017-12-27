<template>
  <ul class="sortable1 sche-list connectedSortable" v-model="items" :class="{'listHeight': showHeight}" :options="{animation: 300,handle:'.handle'}" :data-pContainer="this.itemTitle.pContainer">
    <!--<draggable :move="getdata" @update="datadragEnd">-->
      <!--<transition-group>-->
        <template v-if="this.itemTitle.pContainer==='IE'">
          <r-todo-item
              v-for="item in items"
              v-if="item.pContainer==='IE'"
              :item="item"
              :key="item.id"
              :id="id"
              :is-checkable="isCheckable"
              :bigger="showHeight"
              @todo-item-click="showEdit"
              @todo-item-check="checkTodo"
              @drag="getDragItem"
          ></r-todo-item>
        </template>
        <template v-else-if="this.itemTitle.pContainer==='IU'">
           <r-todo-item
               v-for="item in items"
               v-if="item.pContainer==='IU'"
               :item="item"
               :key="item.id"
               :id="id"
               :is-checkable="isCheckable"
               :bigger="showHeight"
               @todo-item-click="showEdit"
               @todo-item-check="checkTodo"
               @drag="getDragItem"
           ></r-todo-item>
         </template>
        <template v-else-if="this.itemTitle.pContainer==='UE'">
          <r-todo-item
              v-for="item in items"
              v-if="item.pContainer==='UE'"
              :item="item"
              :key="item.id"
              :id="id"
              :is-checkable="isCheckable"
              :bigger="showHeight"
              @todo-item-click="showEdit"
              @todo-item-check="checkTodo"
              @drag="getDragItem"
          ></r-todo-item>
        </template>
        <template v-else-if="this.itemTitle.pContainer==='UU'">
          <r-todo-item
              v-for="item in items"
              v-if="item.pContainer==='UU'"
              :item="item"
              :id="id"
              :is-checkable="isCheckable"
              :bigger="showHeight"
              @todo-item-click="showEdit"
              @todo-item-check="checkTodo"
              @drag="getDragItem"
              :key="item.id"
          ></r-todo-item>
        </template>
      <!--</transition-group>-->
    <!--</draggable>-->
  </ul>
</template>
<style lang="scss" scoped>
  .sche-list{
    /*background-color: white;*/
    /*border-bottom:1px solid #E0E0E0 ;*/
    /*border-top:1px solid #DADADA ;*/
    padding-left: 2%;
    margin:0;
    /*height: 220px;*/
    height: 75%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .listHeight{
    height: 89%;
  }
  .itemList{
    /*padding-bottom:1.306rem;*/

  }
  li:last-child{
    /*border-bottom: none;*/
  }
</style>
<script>
  import TodoItem from 'com/main/TodoItem'
  import draggable from 'vuedraggable'
  import $ from 'jquery'
  import 'jquery-ui'
  import 'jquery-ui/ui/widgets/resizable'
  import 'jquery-ui/themes/base/sortable.css'
  import 'jquery-ui/themes/base/resizable.css'
  export default {
    data () {
      return {
        options: {
          handle: '.handle'
        },
        itemsArray: null,
        itemId: '',
        pContainer: '',
        index: '',
        pCon: '',
        sectionItems: [],
        isInbox: false
      }
    },
    name: 'TodoItemList',
    props: {
      showHeight: Boolean,
      id: Number,
      items: Array,
      isCheckable: Boolean,    //  是否显示完成复选框
      itemTitle: Object
    },
    computed: {
      inboxItems () {
        return this.$store.state.inbox.items
      },
      itemcount () {
        return this.items.length >= 8 && this.isCheckable
      },
      UEitems () {
        return this.items.filter((item) => { return item.pContainer === 'UE' })
      },
//      sectionItems () {
//        return this.items.filter((item) => { return item.pContainer === this.itemTitle.pContainer })
//      },
      dragItemId () {
        return this.$store.state.schedule.dragItemId
      },
      dragItem () {
        return this.$store.state.schedule.dragItem
      }
    },
    watch: {
      itemId (id) {
        if (this.pCon !== 'inbox') {
          this.sectionItems = this.items.filter((item) => { return item.pContainer === this.pCon })
          if (this.index === 0) {
            if (this.sectionItems.length !== 0) {
              var displayOrder = this.sectionItems[0].pDisplayOrder + 65535
            } else {
              displayOrder = 65535
            }
          } else if (this.index === (this.sectionItems.length)) {
            displayOrder = (this.sectionItems[this.sectionItems.length - 1].pDisplayOrder - 1) / 2
          } else {
            var prepDisplayOrder = this.sectionItems[this.index - 1].pDisplayOrder
            var backpDisplayOrder = this.sectionItems[this.index].pDisplayOrder
            displayOrder = (prepDisplayOrder + backpDisplayOrder) / 2
          }
          console.log('displayOrder' + displayOrder)
          this.$store.dispatch('changePriority', {
            id: this.itemId,
            pContainer: this.pCon,
            pDisplayOrder: displayOrder
          }).then(
            () => {
            }
          )
        } else {
          this.$store.dispatch('changePriority', {
            id: this.itemId,
            pDisplayOrder: 65535,
            pContainer: 'inbox'
          }).then(
            () => {
            }
          )
        }
      }
    },
    components: {
      'r-todo-item': TodoItem,
      'draggable': draggable
    },
    methods: {
      getdata (evt) {
        console.log('item' + evt.draggedContext)
        console.log('id' + evt.draggedContext.item.id)
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        if (this.dragItem.pContainer === this.itemTitle.pContainer) {
          console.log('自己范围拖动')
          if (evt.newIndex === 0) {
            console.log('进来了')
            console.log(this.sectionItems[0].pDisplayOrder)
            var displayOrder = this.sectionItems[0].pDisplayOrder + 65535
          } else if (evt.newIndex === (this.sectionItems.length - 1)) {
            displayOrder = (this.sectionItems[this.sectionItems.length - 1].pDisplayOrder - 1) / 2
          } else {
            var prepDisplayOrder = this.sectionItems[evt.newIndex - 1].pDisplayOrder
            var backpDisplayOrder = this.sectionItems[evt.newIndex + 1].pDisplayOrder
            console.log('进来了' + prepDisplayOrder + backpDisplayOrder)
            displayOrder = (prepDisplayOrder + backpDisplayOrder) / 2
          }
          console.log('displkayOrder是' + displayOrder)
          this.$store.dispatch('changePriority', {id: this.dragItemId, pContainer: this.itemTitle.pContainer, pDisplayOrder: displayOrder}).then(
            () => {
            }
          )
        }
      },
      getDragItem (item) {
//        console.log('拿到的itemID是' + JSON.stringify(item.id))
        this.dom = item
      },
      showEdit (item) {
//        console.log('穿够来的item是' + JSON.stringify(item))
        this.$store.dispatch('getItem', item).then(
          (item) => {
//            console.log('返回来的item是' + JSON.stringify(item))
            this.$store.dispatch('setCurrentTodo', item).then(
              () => {
//                console.log('发动前')
                this.$emit('todo-item-click', item)
              }
            )
          }
        )
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
      },
      addDrag () {
        var that = this
        $('.sortable1').sortable({
          connectWith: '.connectedSortable',
          placeholder: 'ui-state-highlight',
          stop: function (event, ui) {
            console.log('触发的是todoitemlist')
            var pContainer = ui.item.parent()[0].getAttribute('data-pcontainer')
            console.log('pContainer' + pContainer)
            that.index = ui.item.index()
            that.pCon = pContainer
            that.itemId = ui.item[0].getAttribute('data-id')
          }
        }).disableSelection()
      }
    },
    mounted () {
      this.itemsArray = this.items
      this.addDrag()
//      console.log(sortable + resizeble + p + q)
//      console.log('this.itemsArray' + this.itemsArray)
    }
  }
</script>
