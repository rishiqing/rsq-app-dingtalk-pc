<template>
  <div class="wrap-inbox" :class="{'slide':showInbox}">
    <input type="text" class="inbox-input" placeholder='添加任务，按Enter保存'  @keypress="createInboxItem($event.target.value,$event)">
    <ul class="inbox-list-wrap">
      <draggable :move="getdata" @update="datadragEnd" v-model="items">
        <transition-group>
          <li v-for="item in items" class="inbox-list" :key="item.id">
            <span class="inbox-list-item">{{item.pTitle}}</span>
          </li>
        </transition-group>
      </draggable>
    </ul>
  </div>
</template>
<script>
  import dateUtil from 'ut/dateUtil'
  export default {
    name: '',
    components: {
    },
    data () {
      return {
        currentDate: new Date()
      }
    },
    props: {
      showInbox: Boolean
    },
    computed: {
      items () {
        return this.$store.state.inbox.items
      }
    },
    methods: {
      getdata (evt) {
        console.log('item' + evt.draggedContext)
        console.log('id' + evt.draggedContext.item.id)
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
//        if (this.dragItem.pContainer === this.itemTitle.pContainer) {
//          if (evt.newIndex === 0) {
//            var displayOrder = this.sectionItems[0].pDisplayOrder + 65535
//          } else if (evt.newIndex === this.sectionItems.length) {
//            displayOrder = (this.sectionItems[this.sectionItems.length - 1].pDisplayOrder - 1) / 2
//          } else {
//            var prepDisplayOrder = this.sectionItems[evt.newIndex - 1].pDisplayOrder
//            var backpDisplayOrder = this.sectionItems[evt.newIndex + 1].pDisplayOrder
//            displayOrder = (prepDisplayOrder + backpDisplayOrder) / 2
//          }
//          console.log('displkayOrder是' + displayOrder)
//          this.$store.dispatch('changePriority', {id: this.dragItemId, pContainer: this.itemTitle.pContainer, pDisplayOrder: displayOrder}).then(
//            () => {
//            }
//          )
//        }
      },
      formatTitleDate (date) {
        return dateUtil.getStandardTime(date)
      },
      createInboxItem (title, e) {
        if (e.keyCode === 13) {
          this.$store.dispatch('submitCreateTodoItem', {createTaskDate: this.formatTitleDate(this.currentDate), pTitle: title, pContainer: 'inbox', todoType: 'inbox'})
            .then(item => {
              e.target.value = ''
            })
        }
      }
    },
    mounted () {
      console.log('手按箱' + JSON.stringify(this.items))
    }
  }
</script>
<style scoped>
  .inbox-list-item{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .inbox-list-wrap{
    padding-right: 10px;
    margin-top: 10px;
    padding-left: 0;
    height: 60%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .slide{
    transform: translate(-300px);
  }
  .inbox-list{
    padding-left: 5px;
    margin-top: 5px;
    background: #FFFFFF;
    border: 1px solid #ECECEC;
    border-radius: 2px;
    width: 250px;
    height: 42px;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3D3D3D;
    background: #FFFFFF;
    border: 1px solid #ECECEC;
    border-radius: 2px;
  }
  .inbox-input{
    /*background: #FFFFFF;*/
    border: 0 solid #979797;
    width: 264px;
    height: 42px;
    display: flex;
    align-items: center;
  }
  .inbox-input::-webkit-input-placeholder { /* WebKit browsers */
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #000000;
  }
  .wrap-inbox{
    z-index: 500;
    padding: 10px;
    background: #F9F9F9;
    box-shadow: -1px 2px 3px 0 rgba(186,215,225,0.45);
    position: absolute;
    top:50px;
    right: -310px;
    transition: 0.1s;
    height: 600px;
    z-index: 5;
    background: #F9F9F9;
    box-shadow: -1px 2px 3px 0 rgba(186,215,225,0.45);
  }
  ul{
    margin: 0;
  }

</style>
