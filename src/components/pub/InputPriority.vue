<template>
  <div class="wrap-priority" @click="changeMenuState($event)">
    <i class="icon2-four-quadrant priority-icon"></i>
    <span class="priority margin-detail">优先级</span>
    <span class="section-name margin-detail font-style">{{sectionName}}</span>
    <ul class="priority-menu" v-show="this.menuState">
      <li class="priority-name" @click="changeSection(titleItem, $event)" v-for="titleItem in this.titleArray">
        <span class="section-name">{{titleItem.title}}</span>
        <i class="icon2-selected select" v-show="item.pContainer === titleItem.pContainer"></i>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .priority-name:before{
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: black;
    margin-top: 4px;
  }
  .priority-menu{
    position: absolute;
    width: 150px;
    top:40px;
    left:21px;
    right: 0;
    margin: 0;
    /*list-style: none;*/
    z-index: 100;
    background-color: white;
    box-shadow: 3px 5px 24px #888888;
    padding-left: 15px;
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
  }
  .select,.priority-icon{
    font-size: 14px;
    /*margin-left: 20px;*/
  }
  .select{
    margin-left: 20px;
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
    border-bottom:1px solid #EAEAEA ;
    cursor: pointer;
  }

</style>
<script>
  import Bus from 'com/bus'
  export default {
    data () {
      return {
        menuState: false
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
      itemTitle: Object
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
        e.stopPropagation()
      },
      IsDisabled (e) {
        if (this.disabled) {
          e.target.blur()
          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
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
//      console.log(JSON.stringify(this.titleArray))
    }
  }
</script>
