<template>
  <div class="wrap-inbox" :class="{'slide':showInbox}" @click="stop($event)">
    <input type="text" class="inbox-input" placeholder='添加任务，按Enter保存'  @keypress="createInboxItem($event.target.value,$event)">
    <ul class="inbox-list-wrap " id="sortable2">
      <draggable :move="getdata" @update="datadragEnd">
        <transition-group>
          <inboxItem
            v-for="item in items"
            :item="item"
            :key="item.id">
          </inboxItem>
          <!--<li v-for="item in items" class="inbox-list" :key="item.id" @dragstart="drag(item)">-->
            <!--<span class="inbox-list-item">{{item.pTitle}}</span>-->
            <!--<div class="wrap-icon" @mouseover="showName" @mouseout="hideName">-->
              <!--<i class="icon2-receive plan" v-show="isFromSche(item)"></i>-->
              <!--<i v-show="isFromKanban(item)" class="icon2-plan receive"></i>-->
              <!--<p id="cssTest" class="displayName" v-show="showfromName">{{fromName(item)}}</p>-->
            <!--</div>-->
          <!--</li>-->
        </transition-group>
      </draggable>
    </ul>
  </div>
</template>
<script>
  import dateUtil from 'ut/dateUtil'
  import inboxItem from 'com/inbox/inboxItem'
  import $ from 'jquery'
  import 'jquery-ui/ui/widgets/sortable'
  import 'jquery-ui/ui/widgets/resizable'
  import 'jquery-ui/themes/base/sortable.css'
  import 'jquery-ui/themes/base/resizable.css'
//  import $ from 'jquery'
//  $(function () {
//    console.log(sortble + resizeble)
//    $('#sortable2').sortable({
//      placeholder: 'ui-state-highlight'
//    })
//    $('#sortable2').disableSelection()
//  })
  export default {
    name: '',
    components: {
      'inboxItem': inboxItem
    },
    data () {
      return {
        currentDate: new Date(),
        showfromName: false
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
      stop (e) {
        e.stopPropagation()
      },
//      fromName (item) {
//        if (item.from != null) {
//          return item.from.levelOneName
//        }
//      },
//      isFromSche (item) {
//        return item.isFrom === 'receive'
//      },
//      isFromKanban (item) {
//        return item.isFrom === 'kanban'
//      },
//      showName () {
//        this.showfromName = true
//      },
//      hideName () {
//        this.showfromName = false
//      },
//      drag (item) {
//        console.log('drag的item是' + JSON.stringify(item))
//        this.$store.dispatch('setDragItem', item)
//      },
      getdata (evt) {
        console.log('item' + evt.draggedContext)
        console.log('id' + evt.draggedContext.item.id)
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        if (evt.newIndex === 0) {
          var order = this.items[0].pDisplayOrder + 65535
        } else if (evt.newIndex === (this.items.length - 1)) {
          order = (this.items[this.items.length - 1].pDisplayOrder - 1) / 2
        } else {
          order = (this.items[evt.newIndex - 1].pDisplayOrder + this.items[evt.newIndex - 1].pDisplayOrder) / 2
        }
        this.$store.dispatch('changeOrder', {id: this.items[evt.oldIndex].id, pDisplayOrder: order}).then(
          () => {
          })
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
      },
      addInboxDrag () {
//        console.log(sortable + resizeble + p + q)
        $('#sortable2').sortable({
          connectWith: '.connectedSortable',
          placeholder: 'ui-state-highlight'
        }).disableSelection()
      }
    },
    mounted () {
//      this.addInboxDrag()
//      console.log('手按箱' + JSON.stringify(this.items))
    }
  }
</script>
<style scoped>
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{
    /*background-color:#d3d7d9;*/
    background: hsla(210,7%,84%,.39)
  }
  ::-webkit-scrollbar-thumb{
    /*background-color:gray;*/
    background: #d4d7da;
  }
  .ui-state-highlight { height: 30px; }
  #cssTest{
    position: fixed;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    text-align: center;
    background-color: black;
    color: white;
    /*float:left;*/
    min-width:80px;
    height:20px;
    border:1px solid black;
    z-index: 1900;
    /*overflow-y: auto ;*/
    /*position:relative;*/
    /*left:10px;*/
    /*top:10px;*/
  }
  #cssTest:before{
    content:"";
    border:9px solid black;
    border-top-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
    width:0px;
    height:0px;
    position:absolute;
    left:30%;
    top:17px;
    transform: rotate(90deg);
  }
  .plan, .receive{
    color:#A8CCEF
  }
  .wrap-icon{
    position: absolute;
    right: 15px;
    top: 13px;
  }
  @media (min-height: 701px) {
    .inbox-list-wrap{
      height: 82%;
    }
  }
  @media (min-height: 650px) and (max-height: 700px) {
    .inbox-list-wrap{
      height: 82%;
    }
  }
  @media (min-height: 590px) and (max-height: 620px) {
    .inbox-list-wrap{
      height: 68%;
    }
  }
  @media (min-height: 560px) and (max-height: 589px) {
    .inbox-list-wrap{
      height: 63%;
    }
  }
  @media (min-height: 500px) and (max-height: 559px) {
    .inbox-list-wrap{
      height: 56%;
    }
  }
  @media (min-height: 621px) and (max-height: 649px) {
    .inbox-list-wrap{
      height: 75%;
    }
  }
  .inbox-list-item{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .inbox-list-wrap{
    padding-right: 10px;
    margin-top: 10px;
    padding-left: 0;
    /*height: 70%;*/
    overflow-y: auto;
    overflow-x: hidden;
  }
  .slide{
    transform: translate(-300px);
  }
  .inbox-list{
    position: relative;
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
  .inbox-list:hover{
    background-color: #f9f9f9;
  }
  .inbox-input{
    /*background: #FFFFFF;*/
    border: 0 solid #979797;
    width: 244px;
    height: 42px;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding-left: 9px;
  }
  .inbox-input::-webkit-input-placeholder { /* WebKit browsers */
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #8C8C8C;
    /*padding-left: 9px;*/
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
    /*height: 600px;*/
    z-index: 5;
    background: #F9F9F9;
    box-shadow: -1px 2px 3px 0 rgba(186,215,225,0.45);
  }
  ul{
    margin: 0;
  }

</style>
