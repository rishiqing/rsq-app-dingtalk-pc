<template>
  <div class="wrap-priority" @click="changeMenuState($event)">
    <i class="icon2-four-quadrant priority-icon"></i>
    <span class="priority margin-detail">优先级</span>
    <span class="section-name margin-detail font-style">{{sectionName}}</span>
    <ul class="priority-menu" v-show="this.menuState && this.editPriority">
      <li class="priority-name" @click="changeSection(titleItem, $event)" v-for="titleItem in this.titleArray">
        <span class="section-name-list">{{titleItem.title}}</span>
        <i class="icon2-selected select" v-show="item.pContainer === titleItem.pContainer"></i>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  priority-menu>li{
   list-style: none;
  }
  .priority-name:nth-child(1):before{
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #fd8a8a;
    margin-top: 4px;
  }
  .priority-name:nth-child(2):before{
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #ffd15b;
    margin-top: 4px;
  }
  .priority-name:nth-child(3):before{
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #64a2e1;
    margin-top: 4px;
  }
  .priority-name:nth-child(4):before{
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #6bc859;
    margin-top: 4px;
  }
  .priority-menu{
    list-style: none;
    position: absolute;
    width: 150px;
    top:40px;
    left:21px;
    right: 0;
    margin: 0;
    list-style: none;
    z-index: 100;
    background-color: white;
    box-shadow: 3px 5px 24px #888888;
    padding-left: 15px;
    padding-top: 10px;
  }
  .priority-name{
    display: flex;
    height: 30px;
    /*width: 150px;*/
    padding: 5px 0;
  }
  .section-name {
    font-size: 12px;
    margin-left: 15px;
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .section-name-list{
    font-size: 12px;
    margin-left: 15px;
    width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .select,.priority-icon{
    font-size: 14px;
    /*margin-left: 20px;*/
  }
  .select{
    margin-left: 20px;
    color: #1ba4ff;
    position: absolute;
    right:10px
  }
  .priority{
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: #B1B1B1;
  }
  .wrap-priority{
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:0.5px solid #EAEAEA ;
    cursor: pointer;
  }

</style>
<script>
  import Bus from 'com/bus'
  export default {
    data () {
      return {
        menuState: false,
        editPriority: ''
      }
    },
    computed: {
      titleArray () {
        return this.$store.state.schedule.titleArray
      },
      sectionName () {
        for (var i = 0; i < this.titleArray.length; i++) {
          if (this.titleArray[i].pContainer === this.item.pContainer) {
            return this.titleArray[i].title
          }
        }
      }
    },
    props: {
      disabled: Boolean,
      item: Object,
      itemTitle: Object,
      ifshow: Boolean
    },
    methods: {
      changeSection (titleItem, e) {
//        console.log('惦记的id' + titleItem.id + '--' + titleItem.pContainer)
//        if (e.target.innerText === '重要紧急') {
//          var pContainer = 'IE'
//        } else if (e.target.innerText === '不重要紧急') {
//          pContainer = 'IU'
//        } else if (e.target.innerText === '重要不紧急') {
//          pContainer = 'UE'
//        } else if (e.target.innerText === '不重要不紧急') {
//          pContainer = 'UU'
//        }
        this.$store.dispatch('changePriority', {id: this.item.id, pContainer: titleItem.pContainer}).then(
          () => {
            this.menuState = false
            e.stopPropagation()
          }
        )
      },
      changeMenuState (e) {
        this.menuState = !this.menuState
        if (!this.editPriority) {
          this.editPriority = true
        }
        Bus.$emit('close-date')
        Bus.$emit('close-time')
        e.stopPropagation()
      },
      IsDisabled (e) {
        if (this.disabled) {
          e.target.blur()
          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
        }
      }
    },
    created () {
      this.editPriority = this.ifshow
    },
    watch: {
      ifshow () {
//        console.log('inputpriority监听到变化了')
        this.editPriority = this.ifshow
        if (this.menuState) {
          this.menuState = false
        }
      }
    },
    mounted () {
      Bus.$on('close', () => {
//        console.log('进优先级了')
//        if (this.menuState) {
//          this.menuState = false
//        }
      })
      Bus.$on('close-priority', () => {
        this.menuState = false
//        console.log('进优先级了')
//        if (this.menuState) {
//          this.menuState = false
//        }
      })
    }
  }
</script>
