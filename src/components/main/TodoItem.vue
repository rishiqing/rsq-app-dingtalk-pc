<template>
  <li class="todoItem handle" @click="clickItem" draggable='true' @dragstart="drag(item)">
    <!--<v-touch class="" @tap="clickItem($event)" style="margin-left: 1rem">-->
    <div class="todo-checkbox" v-if="isCheckable" @click="clickCheckOut">
      <i class="icon2-check-box select"
         :class="{'icon-check_box_outline_blank': !item.pIsDone, 'icon-check': item.pIsDone}"></i>
      <div class="hide" :class="{'square-icon':item.pIsDone}"></div>
      <i class="icon2-selected finish-icon" :class="{'isdisplay':item.pIsDone}"></i>
    </div>
    <div class="title-todo" >
        <span class="todo-content-sche" :class="{ 'text-grey': item.pIsDone, 'text-mid-line': item.pIsDone,'delay-width':isDelay, 'no-delay-width': !isDelay}">{{ item.pTitle }}</span>
        <span class="delayer" :class="{'is-alert': isDelay}" v-show="isDelay">延期{{delayDays}}天</span>
        <span>{{item.pDisplayOrder}}</span>
        <div class="wrap-icon" @mouseover="showName" @mouseout="hideName">
          <i class="icon2-receive plan" v-show="isFromSche"></i>
          <div id="cssTest" class="displayName" v-show="this.IsNameShow">{{fromName}}</div>
        </div>
        <i v-show="isFromKanban" class="icon2-receive receive"></i>
    <i class="handle"></i>
        <!--<div  v-show="this.IsNameShow">{{item.kanbanOrCreatorName}}</div>-->
    </div>
    <!--</v-touch>-->
  </li>
</template>
<style lang="scss" scoped>
  #cssTest{
    position: absolute;
    bottom: 30px;
    left: -20px;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    background-color: black;
    color: white;
    /*float:left;*/
    min-width:60px;
    height:20px;
    border:1px solid black;
    z-index: 305;
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
    left:20px;
    top:20px;
    transform: rotate(90deg);
  }
  /*#cssTest:after{*/
    /*content:"";*/
    /*border:8px solid #fff;*/
    /*border-top-color:transparent;*/
    /*border-right-color:transparent;*/
    /*border-bottom-color:transparent;*/
    /*width:0px;*/
    /*height:0px;*/
    /*position:absolute;*/
    /*left:2px;*/
    /*top:5px;*/
  /*}*/
  .text-grey{
    color: gray;
  }
  .text-mid-line{
    text-decoration: line-through;
  }
  .delay-width{
    width: 70%;
  }
  .no-delay-width{
    width: 100%;
  }
  .wrap-icon{
    position: absolute;
    right: 15px;
    /*border: 1px solid red;*/
  }
  .delayer{
    margin-left: 5px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #E91010;
  }
  .finish-icon{
    display: none;
  }
  .isdisplay{
    display: block;
    margin-left: -13px;
    margin-top: -10px;
    /*position: absolute;*/
    /*top:2px*/
  }
  .hide{
    display: none;
  }
  .square-icon{
    display: block;
    background-color: white;
    border:1px solid white;
    width:4px;
    height: 4px;
    margin-left: -6px;
    margin-top: -9px;
  }
  .todo-checkbox{
    display: flex;
    align-items: center;
    position: relative;
  }
  .select,.plan,.receive,.hide,.create-icon,.finish-icon{
    font-size: 15px;
  }
  .isfrom{
    display: none;
  }
  .title-todo{
    height: 42px;
    font-size: 14px;
    display: flex;
    align-items: center;
    width: 90%;
    background: #FFFFFF;
    border: 1px solid #ECECEC;
    border-radius: 2px;
  }
  .todo-content-sche{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    margin-left:10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3D3D3D;
  }
  .todoItem{
    position: relative;
    height: 42px;
    display: flex;
    background-color: #FFFFFF;
    border: 1px solid #ECECEC;
    margin-top: 3px;
  }
</style>
<script>
//  import dateUtil from 'ut/dateUtil'

  export default {
    name: 'TodoItem',
    data () {
      return {
        IsNameShow: false
      }
    },
    props: {
      item: Object,
      isCheckable: Boolean,
      itemTitle: Object
    },
    computed: {
      currentDate () { return this.$store.getters.defaultTaskDate },
      isIE () { return this.item.pContainer === 'IE' },
      isIU () { return this.item.pContainer === 'IU' },
      isUE () { return this.item.pContainer === 'UE' },
      isUU () { return this.item.pContainer === 'UU' },
      delayDays () {
//        return dateUtil.getDelayDays(this.item, this.currentDate, false)
        return (new Date().getDate() - this.item.date)
      },
      isDelay () {
        return this.delayDays > 0
      },
      isFromSche () {
        return this.item.isFrom === 'receive'
      },
      fromName () {
        if (this.item.from != null) {
          return this.item.from.levelOneName
        }
      },
      isFromKanban () {
        return this.item.isFrom === 'kanban'
      }
    },
    methods: {
      drag (item) {
//        console.log('drag的item是' + JSON.stringify(item))
        this.$store.dispatch('setDragItem', item)
      },
      isMaxlength (item) {
        return item.pTitle.length > 10
      },
      clickItem (e) {
        //  这个是点击跳到编辑界面
        if (!e.target.classList.contains('icon2-check-box')) {
          this.$emit('todo-item-click', this.item)
          e.preventDefault()
        }
      },
      clickCheckOut (e) {
        this.$emit('todo-item-check', this.item, !this.item.pIsDone)
        e.stopPropagation()
        e.preventDefault()
      },
      showName () {
        this.IsNameShow = true
      },
      hideName () {
        this.IsNameShow = false
      }
    },
    mounted () {
    }
  }
</script>
