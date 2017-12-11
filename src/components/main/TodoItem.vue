<template>
  <li class="todoItem handle" @click="clickItem" draggable='true' @dragstart="drag(item)" :class="{'large-width': bigger}">
    <!--<v-touch class="" @tap="clickItem($event)" style="margin-left: 1rem">-->
    <div class="todo-checkbox" v-if="isCheckable" @click="clickCheckOut">
      <i class="icon2-check-box select"
         :class="{'icon-check_box_outline_blank': !item.pIsDone, 'icon-check': item.pIsDone}"></i>
      <div class="hide" :class="{'square-icon':item.pIsDone}"></div>
      <i class="icon2-selected finish-icon" :class="{'isdisplay':item.pIsDone}"></i>
    </div>
    <div class="title-todo" >
        <span class="todo-content-sche" :class="{ 'text-grey': item.pIsDone, 'text-mid-line': item.pIsDone,'delay-width':isDelay, 'no-delay-width': !isDelay}">{{ item.pTitle }}</span>
        <span class="delayer" :class="{'is-alert': isDelay, 'ifMax': bigger}" v-show="isDelay">延期{{delayDays}}天</span>
        <!--<span>{{item.pDisplayOrder}}</span>-->
        <div  ref="wrapIcon" class="wrap-icon" @mouseover="showName(item)" @mouseout="hideName">
          <i ref="plan-icon" class="icon2-receive plan" v-show="isFromSche"  v-tip.dark.transition.top="fromName"></i>
          <i ref="receive-icon" v-show="isFromKanban" class="icon2-plan receive"   v-tip.dark.transition.top="fromName"></i>
          <!--<div  class="link b5" v-tip.dark="fromName"></div>-->
          <!--<span v-show="IsNameShow" id="cssTest" class="tooltip" title="This is my span's tooltip message!" :style="{top: top + 'px', left: left + 'px'}">Some text</span>-->
          <!--<p v-show="IsNameShow" ref="dialog" id="cssTest" class="displayName" :style="{top: top + 'px', left: left + 'px'}">{{fromName}}</p>-->
        </div>
    <!--<i class="handle"></i>-->
        <!--<div  v-show="this.IsNameShow">{{item.kanbanOrCreatorName}}</div>-->
    </div>
    <!--</v-touch>-->
  </li>
</template>
<style lang="scss" scoped>
  .link {
    color: #55b559;
    padding: 8px 10px;
    position: absolute;
    margin: 10px 20px;
  }
  .b5 {
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
   }
  li.large-width{
    width: 96.5%;
  }
  .displayName{

  }
  .plan{
    color:#A8CCEF
  }
  .receive{
    color:#A8CCEF
  }
  @media (min-width: 1201px){
    .title-todo {
      width:90%;
    }
    .todo-content-sche {
      max-width: 83%;
    }
    /*.delay-width {*/
      /*width: 85%;*/
    /*}*/
  }
  @media (max-width: 1200px) and (min-width: 1101px){
    .title-todo {
      width:90%;
    }
    .todo-content-sche {
      max-width:81% ;
    }
    /*.delay-width {*/
      /*width: 85%;*/
    /*}*/
  }
  @media (max-width: 1100px) and (min-width: 1001px) {
    .title-todo {
      width:88.5%;
    }
    .todo-content-sche {
      max-width:79% ;
    }
    /*.delay-width {*/
      /*width: 83%;*/
    /*}*/
  }
  @media (max-width: 1000px) and (min-width: 901px) {
    .title-todo {
      width:87.5%;
    }
    .todo-content-sche {
      max-width: 77%;
    }
    /*.delay-width {*/
      /*width: 81%;*/
    /*}*/
  }
  @media (max-width: 900px) and (min-width: 801px){
    .title-todo {
      width:86.5%;
    }
    .todo-content-sche {
      max-width: 75%;
    }
    /*.delay-width {*/
      /*width: 78%;*/
    /*}*/
  }
  @media (max-width: 800px) {
    .title-todo {
      width:85%;
    }
    .todo-content-sche {
      max-width:73% ;
    }
    /*.delay-width {*/
      /*width: 75%;*/
    /*}*/
  }
  /*.ifMax{*/
    /*position: absolute;*/
    /*right: 35px;*/
    /*top: 12px;*/
  /*}*/
  #cssTest{
    position: fixed;
    /*bottom: 20px;*/
    /*right:100px;*/
    /*<!--left: -20px;-->*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    text-align: center;
    /*background-color: black;*/
    color: white;
    /*float:left;*/
    max-width:180px;
    font-size: 15px;
    min-height: 20px;
    /*overflow-y: hidden;*/
    /*height:20px;*/
    /*border:1px solid black;*/
    z-index: 1900;
    background: rgba(0,0,0,0.86);
    border-radius: 3px;
    /*overflow-y: auto ;*/
    /*position:relative;*/
    /*left:10px;*/
    /*top:10px;*/
  }
  #cssTest:before{
    content:"";
    border:9px solid rgba(0,0,0,0.86);
    border-left-color:rgba(0,0,0,0.86) ;
    border-top-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
    width:0px;
    height:0px;
    position:absolute;
    left:30%;
    top:75%;
    transform: rotate(90deg);
    /*background: rgba(0,0,0,0.86);*/
  }
  .text-grey{
    color: gray;
  }
  .text-mid-line{
    text-decoration: line-through;
  }
  .delay-width{
    /*width: 80%;*/
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .no-delay-width{
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .wrap-icon{
    position: absolute;
    right: 15px;
    top: 13px;
    /*border: 1px solid red;*/
  }
  .delayer{
    /*width: 20%;*/
    /*margin-left: 5px;*/
    /*margin-right: 5px;*/
    /*display: flex;*/
    /*justify-content: flex-end;*/
    margin-left: 11px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #E91010;
  }
  .finish-icon{
    display: none;
    color:#7bbdff
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
    /*position: relative;*/
    height: 42px;
    font-size: 14px;
    display: flex;
    align-items: center;
    /*width: 87%;*/
    background: #FFFFFF;
    /*border: 1px solid #ECECEC;*/
    border-radius: 2px;
  }
  .todo-content-sche{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /*display: flex;*/
    /*max-width:70%;*/
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
    padding-left: 21px;
    cursor: pointer;
    width: 94%;
  }
  li:hover{
     background-color: #f9f9f9;
  }
  .title-todo:hover{
    background-color: #f9f9f9;
  }
</style>
<script>
//  import $ from 'jquery'
  import dateUtil from 'ut/dateUtil'
//  $(document).ready(function () {
//    $('.tooltip').tooltipster()
//  })
  export default {
    name: 'TodoItem',
    data () {
      return {
        IsNameShow: false,
        top: '',
        left: ''
      }
    },
    props: {
      item: Object,
      isCheckable: Boolean,
      itemTitle: Object,
      bigger: Boolean
    },
    computed: {
      currentDate () { return this.$store.getters.defaultTaskDate },
      isIE () { return this.item.pContainer === 'IE' },
      isIU () { return this.item.pContainer === 'IU' },
      isUE () { return this.item.pContainer === 'UE' },
      isUU () { return this.item.pContainer === 'UU' },
      delayDays () {
        return dateUtil.getDelayDays(this.item, this.currentDate, false)
//        return (new Date().getDate() - this.item.date)
      },
      isDelay () {
        return this.delayDays > 0
      },
      isFromSche () {
        return this.item.isFrom === 'receive'
      },
      fromName () {
        if (this.item.from != null) {
          if (this.item.from.levelFourName === null) {
            return this.item.from.levelOneName
          } else {
            return this.item.from.levelOneName + ',' + this.item.from.levelFourName + ',' + this.item.from.levelTwoName
          }
        }
      },
      isFromKanban () {
        return this.item.isFrom === 'kanban'
      }
    },
    methods: {
      mousePosition (ev) {
        if (ev.pageX || ev.pageY) { // firefox、chrome等浏览器
          return {x: ev.pageX, y: ev.pageY}
        }
        return {// IE浏览器
          x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
          y: ev.clientY + document.body.scrollTop - document.body.clientTop
        }
      },
      mouseMove (ev) {
        ev = ev || window.event
        var mousePos = this.mousePosition(ev)
        console.log(mousePos.x + ':' + mousePos.y)
        this.top = mousePos.y - 63
        this.left = mousePos.x - 54
//        document.getElementById('cssTest').style.top = mousePos.x + 'px'
//        document.getElementById('cssTest').style.left = mousePos.y + 'px'
      },
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
      showName (item) {
        this.IsNameShow = true
        this.mouseMove()
//        console.log('item是' + JSON.stringify(item))
//        console.log(item.offsetTop + ':' + item.offsetLeft)
//        this.$refs.dialog.offsetTop = item.offsetTop
//        this.$refs.dialog.offsetLeft = item.offsetLeft
      },
      hideName () {
        this.IsNameShow = false
      }
    },
    mounted () {
    }
  }
</script>
