<template>
  <div class="wrap-inbox" :class="{'slide':showInbox}">
    <input type="text" class="inbox-input" placeholder="添加任务，按Enter保存"  @keypress="createInboxItem($event.target.value,$event)">
    <ul>
      <li v-for="item in items" class="inbox-list">
        <span>{{item.pTitle}}</span>
        <!--<div class="wrap-icon" @mouseover="showName" @mouseout="hideName">-->
          <!--<i class="icon2-plan plan"></i>-->
          <!--<div class="displayName" v-show="this.IsNameShow">李永州</div>-->
        <!--</div>-->
      </li>
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
      formatTitleDate (date) {
        return dateUtil.getStandardTime(date)
      },
      createInboxItem (title, e) {
        if (e.keyCode === 13) {
          this.$store.dispatch('submitCreateTodoItem', {createTaskDate: this.formatTitleDate(this.currentDate), pTitle: title, pContainer: 'inbox', todoType: 'inbox'})
            .then(item => {
            })
        }
      }
    }
  }
</script>
<style scoped>
  .slide{
    transform: translate(-250px);
  }
  .inbox-list{
    width: 264px;
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
    position: absolute;
    top:100px;
    right: -300px;
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
