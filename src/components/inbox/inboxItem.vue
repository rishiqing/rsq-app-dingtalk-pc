<template>
  <li class="inbox-list ui-state-default" :key="item.id" @dragstart="drag(item)">
    <span class="inbox-list-item">{{item.pTitle}}</span>
    <div class="wrap-icon" @mouseover="showName" @mouseout="hideName">
      <i class="icon2-receive plan" v-show="isFromSche" v-tip.dark.transition.top="fromName"></i>
      <i v-show="isFromKanban" class="icon2-plan receive" v-tip.dark.transition.top="fromName"></i>
      <p v-tip.dark.transition.top="fromName" id="cssTest" class="displayName" v-show="IsNameShow" :style="{top: top + 'px', left: left + 'px'}">{{fromName}}</p>
    </div>
  </li>
</template>
<style>
  .ui-state-highlight { height: 30px; }
  #cssTest{
    position: fixed;
    /*bottom: 30px;*/
    /*left: -20px;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    text-align: center;
    background-color: black;
    color: white;
    /*float:left;*/
    max-width:180px;
    min-height:20px;
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
  @media (min-height: 650px) and (max-height: 700px) {
    .inbox-list-wrap{
      height: 80%;
    }
  }
  @media (min-height: 590px) and (max-height: 620px) {
    .inbox-list-wrap{
      height: 70%;
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
    width: 264px;
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
    height: 600px;
    z-index: 5;
    background: #F9F9F9;
    box-shadow: -1px 2px 3px 0 rgba(186,215,225,0.45);
  }
  ul{
    margin: 0;
  }
</style>
<script>
//  import dateUtil from 'ut/dateUtil'

  export default {
    name: 'inboxItem',
    data () {
      return {
        IsNameShow: false,
        top: '',
        left: ''
      }
    },
    props: {
      item: Object
    },
    computed: {
      currentDate () { return this.$store.getters.defaultTaskDate },
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
//        console.log(mousePos.x + ':' + mousePos.y)
        this.top = mousePos.y - 65
        this.left = mousePos.x - 48
//        console.log(document.getElementById('cssTest').style.top + ':' + document.getElementById('cssTest').style.left)
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
      showName () {
        this.IsNameShow = true
        this.mouseMove()
      },
      hideName () {
        this.IsNameShow = false
      }
    },
    mounted () {
    }
  }
</script>
