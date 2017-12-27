<template>
  <div class="wrap-inbox connectedSortable" :class="{'slide':showInbox}" @click="stop($event)" :data-pcontainer="inbox">
    <input type="text" class="inbox-input" placeholder='添加任务，按Enter保存'  @keypress="createInboxItem($event.target.value,$event)">
    <ul class="inbox-list-wrap connectedSortable" id="sortable2" :data-pcontainer="inbox">
      <!--<draggable :move="getdata" @update="datadragEnd">-->
        <!--<transition-group>-->
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
        <!--</transition-group>-->
      <!--</draggable>-->
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
        showfromName: false,
        index: '',
        itemId: '',
        pCon: ''
      }
    },
    watch: {
      itemId () {
        if (this.pCon === 'inbox') {
          if (this.index === 0) {
            if (this.items.length !== 0) {
              var displayOrder = this.items[0].pDisplayOrder + 65535
            } else {
              displayOrder = 65535
            }
          } else if (this.index === (this.items.length)) {
            displayOrder = (this.items[this.items.length - 1].pDisplayOrder - 1) / 2
          } else {
            var prepDisplayOrder = this.items[this.index - 1].pDisplayOrder
            var backpDisplayOrder = this.items[this.index].pDisplayOrder
            displayOrder = (prepDisplayOrder + backpDisplayOrder) / 2
          }
          this.$store.dispatch('changePriorityInbox', {id: this.itemId, pDisplayOrder: displayOrder}).then(
            () => {
            }
          )
        } else {
          var sectionItems = this.scheItems.filter((item) => { return item.pContainer === this.pCon })
          console.log(sectionItems.length)
          if (this.focusdate) {
            var date = this.focusdate
          } else {
            date = this.currentDate
          }
          var startdate = dateUtil.getStandardTime(date)
          startdate = startdate.substring(0, 4) + '/' + startdate.substring(4, 6) + '/' + startdate.substring(6, 8)
          var enddate = startdate
          if (this.index === 0) {
            if (sectionItems.length !== 0) {
              displayOrder = sectionItems[0].pDisplayOrder + 65535
            } else {
              displayOrder = 65535
            }
          } else if (this.index === (sectionItems.length)) {
            displayOrder = (sectionItems[sectionItems.length - 1].pDisplayOrder - 1) / 2
          } else {
            prepDisplayOrder = sectionItems[this.index - 1].pDisplayOrder
            backpDisplayOrder = sectionItems[this.index].pDisplayOrder
            displayOrder = (prepDisplayOrder + backpDisplayOrder) / 2
          }
          console.log(displayOrder)
          this.$store.dispatch('changePriority', {id: this.itemId, pDisplayOrder: displayOrder, pContainer: this.pCon, startDate: startdate, endDate: enddate}).then(
            () => {
            }
          )
        }
      }
    },
    props: {
      showInbox: Boolean
    },
    computed: {
      focusdate () {
        return this.$store.state.focusDate
      },
      scheItems () {
        var items = this.$store.state.schedule.items
        var newItems = []
        if (items !== null && items.length !== 0) {
          for (var i = 0; i < items.length; i++) {
            if (!items[i].pIsDone) {
              newItems.push(items[i])
            }
          }
          for (i = 0; i < items.length; i++) {
            if (items[i].pIsDone) {
              newItems.push(items[i])
            }
          }
          return newItems
        } else {
          return []
        }
      },
      items () {
        return this.$store.state.inbox.items
      },
      inbox () {
        if (this.items) {
          return this.items[0].pContainer
        }
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
        var that = this
//        console.log(sortable + resizeble + p + q)
        $('#sortable2').sortable({
          connectWith: '.connectedSortable',
          placeholder: 'ui-state-highlight',
          stop: function (event, ui) {
            console.log('触发的是收纳箱')
            var pContainer = ui.item.parent()[0].getAttribute('data-pcontainer')
            console.log('pContainer' + pContainer)
            that.index = ui.item.index()
            console.log('index' + that.index)
            that.pCon = pContainer
            that.itemId = ui.item[0].getAttribute('data-id')
//            ui.item.addClass('todoItem').removeClass('inbox-list')
          }
        }).disableSelection()
      }
    },
    mounted () {
      this.addInboxDrag()
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
