<template>
  <li class="todoItem" @click="clickItem">
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
        <span v-if="!isCheckable" v-show="isFromSche" class="receive">我收到的</span>
        <span v-if="!isCheckable" v-show="isFromKanban" class="receive">来自计划</span>
        <div class="wrap-icon" @mouseover="showName" @mouseout="hideName">
          <i class="icon2-plan plan"></i>
          <div class="displayName" v-show="this.IsNameShow">李永州</div>
        </div>
        <i v-show="isFromKanban" class="icon2-receive receive"></i>
        <!--<div  v-show="this.IsNameShow">{{item.kanbanOrCreatorName}}</div>-->
    </div>
    <!--</v-touch>-->
  </li>
</template>
<style lang="scss" scoped>
  .text-grey{
    color: gray;
  }
  .text-mid-line{
    text-decoration: line-through;
  }
  .displayName{
    position: absolute;
    top: -20px;
    left: -20px;
    background-color: lightgray;
    z-index: 2;
  }
  .delay-width{
    width: 70%;
  }
  .no-delay-width{
    width: 100%;
  }
  .wrap-icon{
    position: absolute;
    right: 5px;
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
      sectionName: String
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
      isFromKanban () {
        return this.item.isFrom === 'kanban'
      }
    },
    methods: {
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
