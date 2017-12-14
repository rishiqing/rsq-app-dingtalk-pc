<template>
  <div class="section-wrap" :class="{'floatDirection': direction, 'reverseDirection': !direction, 'showheight': showHeight, 'IELarge':ieLarge, 'IULarge': iuLarge,'UELarge': ueLarge,'UULarge': uuLarge}" @drop="drop($event)" @dragover="allowDrop($event)">
    <div class="section-head" @mouseover="showIcon" @mouseout="hideIcon">
      <input ref="itemTitleInput" type="text" class="sche-name" :value=this.itemTitle.title @keypress="changeTitle($event.target.value, $event)" @focus="showSave">
      <div class="save-sche-title" v-show="this.showSaveButton" @click="saveTitle">保存</div>
      <img src="../../assets/big.png" class="enlarge" @click="showLarge" v-show="!this.showHeight && this.showIconLarge">
      <img src="../../assets/small.png" class="enSmall" @click="showSmall" v-show="this.showHeight && !this.showSaveButton">
      <i class="icon2-add-circle create-icon" v-show="!this.showSaveButton" @click="changeInputState"></i>
      <!--<img src="../../assets/h.png" v-show="!this.showSaveButton" class="icon2-add-circle create-icon" @click="changeInputState">-->
    </div>
    <div class="wrap-input">
      <input class="create-task" ref="createTask" v-model="content" placeholder="输入任务标题，按回车保存" type="text" v-show="InputState" @blur="hideInput" @keypress="createSche($event.target.value,$event)" autofocus>
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
        showSaveButton: false,
        showIconLarge: false,
        ieLarge: false,
        iuLarge: false,
        ueLarge: false,
        uuLarge: false,
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
      direction () {
        return (this.ieLarge || this.ueLarge)
      },
      loginUser () {
        return this.$store.getters.loginUser || {}
      },
      userId () {
        return this.items[0].pUserId.toString()
      },
      focusdate () {
        return this.$store.state.focusDate
      },
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
      hideIcon () {
        this.showIconLarge = false
      },
      showIcon () {
        if (!this.showSaveButton) {
          this.showIconLarge = true
        }
      },
      saveTitle () {
        this.showSaveButton = false
        this.changeTitle(this.$refs.itemTitleInput.value)
      },
      showSave () {
        this.showSaveButton = true
        this.showIconLarge = false
      },
      hideInput () {
        this.InputState = false
        this.content = ''
      },
      drop (event) {
        console.log('进来drop次')
        console.log('this.dragItem' + JSON.stringify(this.dragItem))
        if (this.dragItem.pContainer !== this.itemTitle.pContainer && this.dragItem.pContainer !== 'inbox') {
          console.log('别的范围')
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
        } else if (this.dragItem.pContainer === 'inbox') {
          if (this.sectionItems && this.sectionItems.length > 0) {
            lastSectionItems = this.sectionItems[this.sectionItems.length - 1]
            displayOrder = (lastSectionItems.pDisplayOrder - 1) / 2
          } else {
            displayOrder = 65535
          }
          var focusdate = this.focusdate ? this.focusdate : new Date()
          var standardDate = dateUtil.getStandardTime(focusdate)
          var startdate = standardDate.substring(0, 4) + '/' + standardDate.substring(4, 6) + '/' + standardDate.substring(6, 8)
          var enddate = startdate
          this.$store.dispatch('changeInbox', {startDate: startdate, endDate: enddate, dates: '', id: this.dragItemId, pContainer: this.itemTitle.pContainer, pDisplayOrder: displayOrder}).then(
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
        this.ieLarge = false
        this.iuLarge = false
        this.ueLarge = false
        this.uuLarge = false
      },
      showLarge () {
//        console.log('变大了')
        this.showHeight = !this.showHeight
        if (this.itemTitle.pContainer === 'IE') {
          this.ieLarge = true
        } else if (this.itemTitle.pContainer === 'IU') {
          this.iuLarge = true
        } else if (this.itemTitle.pContainer === 'UE') {
          this.ueLarge = true
        } else {
          this.uuLarge = true
        }
      },
      changeTitle (value) {
//        if (e.keyCode === 13) {
//        console.log('value是' + value)
//        this.$refs.itemTitleInput.value = value
        if (typeof (this.itemTitle.id) === 'string') {
          this.$store.dispatch('createScheTitle', {title: value, pContainer: this.itemTitle.pContainer}).then(
            () => {
              this.$refs.itemTitleInput.target.blur()
            }
          )
        } else {
          this.$store.dispatch('changeScheTitle', {title: value, id: this.itemTitle.id}).then(
            () => {
//              this.$refs.itemTitleInput.value = value
              this.$refs.itemTitleInput.target.blur()
            }
          )
        }
//        }
      },
      showModel (item) {
        this.$emit('todo-item-click', item, this.itemTitle)
      },
      changeInputState () {
        this.InputState = true
        this.$nextTick(() => {
          this.$refs.createTask.focus()
        })
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
          var newdate = dateUtil.createStandardTime(new Date())
//          console.log('newdate是' + newdate)
          var date = this.formatTitleDate(this.currentDate)
          var startTime = date.substring(0, 4) + '/' + date.substring(4, 6) + '/' + date.substring(6, 8)
          var endTime = startTime
          if (this.sectionItems && this.sectionItems.length === 0) {
            var displayOrder = 65535
          } else {
            displayOrder = this.sectionItems[0].pDisplayOrder + 65536
          }
          this.$store.dispatch('submitCreateTodoItem', {'startDate': startTime, 'endDate': endTime, receiverIds: this.userId, pPlanedTime: newdate, pDisplayOrder: displayOrder, createTaskDate: this.formatTitleDate(this.currentDate), pTitle: title, pContainer: this.itemTitle.pContainer, todoType: 'schedule'})
            .then(item => {
//              this.InputState = false
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
//      console.log('section中拿到的title是' + this.titleArray)
    }
  }
</script>
<style scoped>
  /*div.floatDirection{*/
    /*float: right*/
  /*}*/
  /*.reverseDirection{*/
    /*float: left;*/
  /*}*/
  @media (max-height: 600px) and (min-height: 500px) {
    .section-wrap{
      height: 45%;
      margin-top: 1.3%;
    }
    div.UULarge {
      height: 79%;
      right: 2%;
      bottom: 1.4%;
    }
    div.IELarge{
      height: 77%;
      left:6px;
      top: 110px;
    }
    div.IULarge{
      height: 78%;
      right:2%;
      top: 110px
    }
    div.UELarge{
      height: 78%;
      left:10px;
      bottom:2%
      /*right:1.9%;*/
      /*top: 110px*/
    }
  }
  @media (min-height: 601px) and (max-height: 649px) {
    .section-wrap{
      height: 46%;
      margin-top: 1.2%;
    }
    div.UULarge {
      height: 80%;
      right: 2%;
      bottom: 1%;
    }
    div.IELarge{
      height: 80%;
      left:6px;
      top: 110px;
    }
    div.IULarge{
      height: 80%;
      right:2.1%;
      top: 110px
    }
    div.UELarge{
      height: 79%;
      left:9px;
      bottom:2%
    }
  }
  @media (min-height: 650px) {
    .section-wrap{
      height: 47%;
      margin-top: 1.2%;
    }
    div.UULarge {
      height: 81%;
      right: 2%;
      bottom: 2%;
    }
    div.IELarge{
      height: 81%;
      left:6px;
      top: 110px;
    }
    div.IULarge{
      height: 81%;
      right:1.9%;
      top: 110px
    }
    div.UELarge{
      height: 81%;
      left:9px;
      bottom:2%
    }
  }
    ::-webkit-input-placeholder{
      font-size: 14px;
    }
    .create-task{
      padding-left: 11px;
    }
    .save-sche-title{
      background: #6BC859;
      box-shadow: 0 0 1px 0 rgba(0,0,0,0.18);
      border-radius: 2px;
      width: 52px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #FFFFFF;
    }
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
      background: none;
      border: none;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #666666;
      width: 80%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .create-icon{
      cursor:pointer;
      /*width: 20.8px;*/
      /*height: 20.8px;*/
      font-size: 20px;
    color: #D4D8DC
  }
    .create-icon:hover{
      color: #5EADFD;
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
    padding-left: 2%;
    padding-right: 2%;
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
    /*height: 80%;*/
    width: 96%;
    overflow: hidden;
    /*transform:scale(2,2);*/
    z-index:100;
    position: fixed;
    /*bottom: 0;*/
    /*top: 110px;*/
    /*left: 0;*/
    /*right: 0;*/
  }
  /*div.UULarge{*/
    /*height: 81%;*/
    /*right: 2%;*/
    /*bottom: 2%;*/
  /*}*/
  .enlarge{
    position: absolute;
    right: 40px;
    top: 15px;
    width: 17px;
    height: 17px;
    cursor: pointer;
  }
  .enSmall{
    position: absolute;
    right: 55px;
    top: 30%;
    width: 17px;
    height: 17px;
    curor: pointer;
  }
  /*.enlarge:hover .section-wrap{*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
  /*.section-wrap:nth-child(1){*/
    /*margin-top:1% ;*/
  /*}*/
  /*.section-wrap:nth-child(2){*/
    /*margin-top:1% ;*/
  /*}*/
  .section-wrap{
    transition: 0.3s;
    overflow-y: hidden;
    overflow-x: hidden;
    margin-left:1.2%;
    /*margin-top:2% ;*/
    /*padding-bottom: 2%;*/
    /*margin-bottom: 2%;*/
    width: 48%;
    /*!*height: 47%;*!*/
    float: left;
    /*border:1px solid red;*/
    background-color: #FAFAFA;
    border: 0 solid #E6E6E6;
    box-shadow: 0 1px 2px 0 rgba(186,215,225,0.50);
    border-radius: 2px;
  }
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{
    /*background-color:#d3d7d9;*/
     background: hsla(210,7%,84%,.39)
  }
  ::-webkit-scrollbar-thumb{
    /*background-color:gray;*/
    background: #d4d7da;
  }
  ::-webkit-scrollbar-thumb:hover {background-color:lightgray}
  ::-webkit-scrollbar-thumb:active {background-color:#00aff0}
</style>
