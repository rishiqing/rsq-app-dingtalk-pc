<template>
  <div class="section-wrap">
    <div class="section-head">
      <input type="text" class="sche-name" :value=this.title @blur="changeTitle($event.target.value)">
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
      :sectionName="sectionName"
      :is-checkable="true"
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
        titleName: '日程',
        currentDate: new Date(),
        InputState: false,
        remindState: false,
        content: ''
      }
    },
    props: {
      name: String,
      sectionName: String
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
      title () {
        var titleArray = this.$store.state.schedule.titleArray
        for (var i = 0; i < titleArray.length; i++) {
          if (titleArray[i][this.sectionName]) {
            return titleArray[i][this.sectionName]
          }
        }
      }
    },
    components: {
      'r-todo-item-list': TodoItemList
    },
    methods: {
      changeTitle (value) {
        this.$store.dispatch('changeScheTitle', {title: value, sectionname: this.sectionName})
      },
      showModel (item) {
        this.$emit('todo-item-click', item)
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
//          return window.rsqadmg.execute('alert', {message: '请填写任务名称'})}
//        if (!this.isInbox) {
//         var createTaskDate = dateUtil.dateNum2Text(planTime)
//        }
        if (this.sectionName === '重要紧急') {
          var sectionname = 'IE'
        } else if (this.sectionName === '重要不紧急') {
          sectionname = 'IU'
        } else if (this.sectionName === '不重要紧急') {
          sectionname = 'UE'
        } else if (this.sectionName === '不重要不紧急') {
          sectionname = 'UU'
        }
        if (event.keyCode === 13) {
          console.log('进来了')
          var todoType = this.isInbox ? 'inbox' : 'schedule'
          this.$store.dispatch('submitCreateTodoItem', {createTaskDate: this.formatTitleDate(this.currentDate), pTitle: title, todoType: todoType, pContainer: sectionname})
            .then(item => {
              this.InputState = false
              this.remindState = false
              this.content = ''
              console.log('返回来的item是' + item)
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
  .section-wrap{
   margin-left:1%;
   margin-top:1% ;
    width: 48%;
    height: 264px;
    float: left;
    border:1px solid red;
    background-color: #FAFAFA;
  }
</style>
