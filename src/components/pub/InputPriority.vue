<template>
  <div class="wrap-priority" @click="changeMenuState">
    <i class="icon2-four-quadrant priority-icon"></i>
    <span class="priority">优先级</span>
    <span class="section-name">{{sectionName}}</span>
    <ul class="priority-menu" v-show="this.menuState">
      <li class="priority-name" @click="changeSection(titleItem)" v-for="titleItem in this.titleArray">
        <span class="section-name">{{titleItem.title}}</span>
        <i class="icon2-selected select" v-show="item.pContainer === titleItem.pContainer"></i>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .priority-menu{
    /*position: absolute;*/
    /*width: 100px;*/
    top:0;
    left:0;
    right: 0;
    margin: 0;
    list-style: none;
  }
  .priority-name{
    display: flex;
    height: 20px;
  }
  .section-name {
    font-size: 12px;
    margin-left: 15px;
  }
  .select,.priority-icon{
    font-size: 14px;
  }
  .priority{
    font-size: 12px;

  }
  .wrap-priority{
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:1px solid gray ;
    cursor: pointer;
  }

</style>
<script>
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
      changeSection (titleItem) {
        console.log('惦记的id' + titleItem.id + '--' + titleItem.pContainer)
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
          }
        )
      },
      changeMenuState () {
        this.menuState = !this.menuState
      },
      IsDisabled (e) {
        if (this.disabled) {
          e.target.blur()
          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
        }
      }
    },
    mounted () {
//      console.log(JSON.stringify(this.titleArray))
    }
  }
</script>
