<template>
  <div class="section-wrap" :class="{'showheight': showHeight}" @drop="drop($event)" @dragover="allowDrop($event)">
    <div class="section-head">
      <input type="text" class="sche-name" :value=this.itemTitle.title @keypress="changeTitle($event.target.value, $event)">
      <button style="width: 50px" class="enlarge" @click="showLarge" v-show="!this.showHeight">变大</button>
      <button style="width: 50px" class="enlarge" @click="showSmall" v-show="this.showHeight">变小</button>
      <i class="icon2-add-circle create-icon" @click="changeInputState"></i>
    </div>
    <div class="wrap-input">
      <input v-model="content" placeholder="输入任务标题，按回车保存" type="text" v-show="InputState" @keypress="createSche($event.target.value,$event)">
      <div class="square" v-show="this.remindState">
        <span>请填写任务名称</span>
      </div>
      <div class="rotate-square" v-show="this.remindState"></div>
    </div>
    <r-todo-item-list
      :items="items"
      :itemTitle="itemTitle"
      :is-checkable="true"
      :showHeight="showHeight"
      v-if="items.length!==0"
      @todo-item-click="showModel"
    ></r-todo-item-list>
  </div>
</template>
<script>
  import TodoItemList from 'com/main/TodoItemList'
  import dateUtil from 'ut/dateUtil'
  export default {
    name: 'ScheduleView',
    data () {
      return {
        showHeight: false,
        titleName: '日程',
        currentDate: new Date(),
        InputState: false,
        remindState: false,
        content: ''
      }
    },
    props: {
      name: String,
      itemTitle: Object
//      sectionName: String
    },
    computed: {
      items () {
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
      dragItemId () {
        return this.$store.state.schedule.dragItemId
      },
      dragItem () {
        return this.$store.state.schedule.dragItem
      },
      sectionItems () {
        return this.items.filter((item) => { return item.pContainer === this.itemTitle.pContainer })
      }
//      title () {
//        var titleArray = this.$store.state.schedule.titleArray
//        for (var i = 0; i < titleArray.length; i++) {
//          if (titleArray[i][this.sectionName]) {
//            return titleArray[i][this.sectionName]
//          }
//        }
//      }
    },
    components: {
      'r-todo-item-list': TodoItemList
    },
    methods: {
      drop (event) {
        console.log('进来drop次')
        if (this.dragItem.pContainer !== this.itemTitle.pContainer) {
//          console.log('this.sectionItems' + JSON.stringify(this.sectionItems))
          if (this.sectionItems && this.sectionItems.length > 0) {
            var lastSectionItems = this.sectionItems[this.sectionItems.length - 1]
            var displayOrder = (lastSectionItems.pDisplayOrder - 1) / 2
          } else {
            displayOrder = 65535
          }
          this.$store.dispatch('changePriority', {id: this.dragItemId, pContainer: this.itemTitle.pContainer, pDisplayOrder: displayOrder}).then(
            () => {
            }
          )
        }
        event.preventDefault()
      },
      allowDrop (event) {
        event.preventDefault()
      },
      showSmall () {
        console.log('变大了')
        this.showHeight = !this.showHeight
      },
      showLarge () {
        console.log('变大了')
        this.showHeight = !this.showHeight
      },
      changeTitle (value, e) {
        if (e.keyCode === 13) {
          if (typeof (this.itemTitle.id) === 'string') {
            this.$store.dispatch('createScheTitle', {title: value, pContainer: this.itemTitle.pContainer}).then(
              () => {
                e.target.blur()
              }
            )
          } else {
            this.$store.dispatch('changeScheTitle', {title: value, id: this.itemTitle.id}).then(
              () => {
                e.target.blur()
              }
            )
          }
        }
      },
      showModel (item) {
        this.$emit('todo-item-click', item, this.itemTitle)
      },
      changeInputState () {
        this.InputState = true
      },
      formatTitleDate (date) {
        return dateUtil.getStandardTime(date)
      },
      createSche (title, event) {
        if (!title) {
          this.remindState = true
          return
        }
        if (event.keyCode === 13) {
//          console.log('进来了')
//          var todoType = this.isInbox ? 'inbox' : 'schedule'
//          console.log(dateUtil.getStandardTime(this.currentDate))
          this.$store.dispatch('submitCreateTodoItem', {createTaskDate: this.formatTitleDate(this.currentDate), pTitle: title, pContainer: this.itemTitle.pContainer, todoType: 'schedule'})
            .then(item => {
              this.InputState = false
              this.remindState = false
              this.content = ''
//              console.log('返回来的item是' + item)
              return item
            })
        }
      },
      fetchItems (strDate) {
//        window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(strDate)})
        this.$store.dispatch('fetchScheduleItems', { strDate })
      },
      fetchDatesHasTodo (p) {
        //  给日期加角标，值计算p.daysArray中的中间一个数组
        var weekArray = p.daysArray[1]
        //  如果dateSelect已经显示，则设置为dateSelect的月份，否则设置标题为当周所在的月份，以当周的第一天为准
//        var numDate = this.dateSelect.getTime()
        var firstDate = weekArray[0].date
        var lastDate = weekArray[weekArray.length - 1].date
//        var titleDate = firstDate
//        if (numDate > firstDate.getTime() && numDate < lastDate.getTime()) {
//          titleDate = this.dateSelect
//        }
//        window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(titleDate)})

        this.$store.dispatch('getDatesHasTodo', {
          startDate: firstDate,
          endDate: lastDate
        }).then(res => {
          weekArray.forEach(day => {
            if (res.indexOf(String(day.date.getTime())) !== -1) {
              this.$set(day, 'showTag', true)
            }
          })
        })
      }
    },
    mounted () {
      console.log('section中拿到的title是' + this.titleArray)
//      window.rsqadmg.exec('setTitle', {title: this.formatTitleDate(this.dateSelect)})
//      var btnParams
//      var that = this
//      btnParams = {
//        btns: [{key: 'toInbox', name: '收纳箱'}],
//        success (res) {
//          if (res.key === 'toInbox') {
//            that.$router.push('/inbox')
//          }
//        }
//      }
//      window.rsqadmg.execute('setOptionButtons', btnParams)
//      var date = dateUtil.getStandardTime(new Date())
//      this.fetchItems(new Date())
//      this.$store.dispatch('setNav', {isShow: true})
    }
  }
</script>
<style scoped>
  .square{
    width: 120px;
    height: 40px;
    font-size:15px ;
    display: flex;
    align-items: center;
    box-shadow: 0 0 14px rgba(0,0,0,.3);
    position:absolute;
    left: 40%;
    bottom: 60px;
    justify-content: center;
  }
  .rotate-square{
    position: absolute;
    left:52%;
    z-index: 1;
    width:15px;
    height: 15px;
    transform:rotate(45deg);
    bottom: 53px;
    background-color: white;
  }
  .sche-name{
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
  }
  .create-icon{
    font-size: 15px;
  }
  .wrap-input{
    position: relative;
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrap-input>input{
    width: 100%;
    height: 42px;
  }
  .section-head{
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    height: 50px;
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
  button{
    width: 20px;
    height:20px;
    float: right;
  }
  div.showheight{
    height: 80%;
    width: 98%;
    overflow: hidden;
    /*transform:scale(2,2);*/
    z-index:100;
    position: fixed;
    bottom: 0;
    top: 110px;
    left: 0;
    right: 0;
  }
  .enlarge{
    position: absolute;
    right: 5%;
    top: 30%;
  }
  /*.enlarge:hover .section-wrap{*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
  .section-wrap{
    transition: 0.3s;
    overflow: hidden;
   margin-left:1%;
   margin-top:1% ;
    width: 48%;
    height: 30%;
    float: left;
    border:1px solid red;
    background-color: #FAFAFA;
  }
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background-color:#bee1eb;}
  ::-webkit-scrollbar-thumb{background-color:gray;}
  ::-webkit-scrollbar-thumb:hover {background-color:lightgray}
  ::-webkit-scrollbar-thumb:active {background-color:#00aff0}
</style>
