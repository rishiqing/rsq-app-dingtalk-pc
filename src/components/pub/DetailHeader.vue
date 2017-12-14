<template>
  <div id="detail-header">
    <div class="wrap-header" :class="{'no-edit-desp':editDesp}">
      <div class="left-add">
        <!--<i class="icon2-plan plan"></i>-->
        <img src="../../assets/plan.png" alt="" class="plan-img">
        <span class="add-to-plan" @click="addToPlan($event)">{{isFromkanban}}</span>
      </div>
      <div class="close-icon">
        <i class="icon2-other other" @click="showOption($event)"></i>
        <i class="icon2-cancel cancel" @click="closeDetail"></i>
      </div>
      <ul v-show="this.deleteState" class="delete-task">
        <li @click="addToPlan">移动任务</li>
        <li @click="copyTask">复制任务</li>
        <li v-show="fromPlan">前往计划</li>
        <li @click="deleteTask(item)">删除任务</li>
      </ul>
      <ul class="wrap-repeat-delete" v-show="this.deleteOptionState">
        <li v-for="item in this.deleteOption" @click="deleteRepeat(item)">
          {{item}}
        </li>
      </ul>
    </div>
    <div :class="{'edit-desp':!editDesp}">
      这个是描述编辑状态
    </div>
    <div class="to-plan-window" v-show="this.showPlan" @click="stop($event)">
      <div class="plan-kind">
        <span>计划</span>
        <div class="wrap-plan-kind" @click="showMainPlan($event)">
          <span class="plan-name">{{planName}}</span>
          <i class="icon2-arrow-down2"></i>
          <ul class="wrap-plans" v-show="this.planState">
            <li v-for="plan in plans" class="wrap-plan-item" @click="changePlan(plan,$event)">
              <div class="wrap-plan-item-first">
                <img src="../../assets/plan.png" alt="" class="plan-img">
                <span class="plan-name">{{plan.name}}</span>
              </div>
              <i class="icon2-selected finish-plan" v-show="ifEqualPlan(plan.name)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="plan-kind">
        <span>子计划</span>
        <div class="wrap-plan-kind" @click="showSubPlan">
          <span class="plan-name">{{subPlanName}}</span>
          <i class="icon2-arrow-down2"></i>
          <ul class="wrap-plans" v-show="this.subPlanState">
            <li v-for="subplan in subplans" class="wrap-plan-item" @click="changeSubPlan(subplan)">
              <span>{{subplan.name}}</span>
              <i class="icon2-selected finish-plan" v-show="ifEqualSubPlan(subplan.name)"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="plan-kind">
        <span>卡片</span>
        <div class="wrap-plan-kind" @click="showCard">
          <span class="plan-name">{{cardName}}</span>
          <i class="icon2-arrow-down2"></i>
          <ul class="wrap-plans" v-show="this.cardState">
            <li v-for="card in cards" class="wrap-plan-item" @click="changeCard(card)">
              <span>{{card.name}}</span>
              <i class="icon2-selected finish-plan" v-show="ifEqualCard(card.name)"></i>
            </li>
          </ul>
        </div>
      </div>
      <button class="save-user-define-plan" @click="moveToPlan">移动</button>
    </div>
  </div>
</template>
<script>
  import dateUtil from 'ut/dateUtil'
  import Bus from 'com/bus'
  export default {
    name: 'app',
    components: {
    },
    data () {
      return {
//        planName: '',
//        subplanName: '',
//        cardName: '',
        cardState: false,
        planState: false,
        subPlanState: false,
        showPlan: false,
        editDesp: false,
        deleteState: false,
        deleteOptionState: false,
        deleteOption: [
          '仅删除此任务', '删除此任务及之后所有任务', '删除所有重复的任务'
        ]
      }
    },
    computed: {
      currentTodo () {
        return this.$store.state.todo.currentTodo
      },
      fromPlan () {
        return this.currentTodo.from != null
      },
      currentdate () {
        var date = this.$store.state.focusDate
        return date || new Date()
      },
      planName () {
        if (this.plans && this.plans.length > 0) {
          return this.item.isFrom === 'kanban' ? this.item.from.levelOneName : this.plans[0].name
        }
      },
      subPlanName () {
        if (this.subplans && this.subplans.length > 0) {
          return this.item.isFrom === 'kanban' ? this.item.from.levelFourName : this.subplans[0].name
        }
      },
      cardName () {
        if (this.cards && this.cards.length > 0) {
          return this.item.isFrom === 'kanban' ? this.item.from.levelTwoName : this.cards[0].name
        }
      },
      isFromkanban () {
        return this.item.isFrom === 'kanban' ? (this.item.from.levelOneName + ',' + this.item.from.levelFourName + ',' + this.item.from.levelTwoName) : '添加至计划'
      },
      plans () {
        return this.$store.state.plan
      },
      subplans () {
        return this.$store.state.subplan
      },
      cards () {
        return this.$store.state.card
      },
      defaultPlans () {
        return this.$store.state.plan.filter((plan) => { return plan.isDefault })
      }
    },
    props: {
      item: Object
    },
    methods: {
      ifEqualSubPlan (name) {
        if (this.subPlanName) {
          return name === this.subPlanName
        }
      },
      ifEqualPlan (name) {
        if (this.planName) {
          return name === this.planName
        }
      },
      ifEqualCard (name) {
        if (this.cardName) {
          return name === this.cardName
        }
      },
      stop (e) {
        e.stopPropagation()
      },
      copyTask () {
        var time = dateUtil.getStandardTime(this.currentdate)
        this.$store.dispatch('copy', {id: this.item.id, createTaskDate: time, pDisplayOrder: this.item.pDisplayOrder}).then(() => {
          this.deleteState = false
        })
      },
      moveToPlan () {
        var todoId = this.item.id
        var cardId = this.cards[0].id
        var createTaskDate = dateUtil.getStandardTime(new Date())
        this.$store.dispatch('moveToPlan', {todoId: todoId, cardId: cardId, createTaskDate: createTaskDate}).then(() => {
          this.showPlan = false
        })
      },
      changeSubPlan (subplan) {
        this.$store.commit('CHANGE_PLAN_ORDER', {subplan: subplan, id: 2})
        this.$store.dispatch('getCard', {item: subplan}).then(
          (item) => {
          })
      },
      changeCard (card) {
        this.$store.commit('CHANGE_PLAN_ORDER', {card: card, id: 3})
      },
      changePlan (plan, e) {
        this.$store.commit('CHANGE_PLAN_ORDER', {plan: plan, id: 1})
        this.$store.dispatch('getSubPlans', {defaultItem: plan}).then(
          (item) => {
            this.$store.dispatch('getCard', {item: item.childKanbanList[0]}).then(
              (item) => {
              })
          })
        this.planState = false
        e.stopPropagation()
      },
      showSubPlan () {
        this.subPlanState = !this.subPlanState
        this.planState = false
        this.cardState = false
      },
      showMainPlan (e) {
        this.planState = !this.planState
        this.cardState = false
        this.subPlanState = false
        e.stopPropagation()
      },
      showCard () {
        this.cardState = !this.cardState
        this.planState = false
        this.subPlanState = false
      },
      addToPlan (e) {
        this.showPlan = !this.showPlan
        this.deleteState = false
        Bus.$emit('close-time')
        Bus.$emit('close-date')
        e.stopPropagation()
      },
      closeDetail () {
        this.$emit('close-detail')
      },
      showOption (e) {
        this.deleteState = !this.deleteState
        e.stopPropagation()
      },
      deleteTask (item) {
        if (item.isCloseRepeat) {
          this.$store.dispatch('deleteTodo', {item: item}).then(
            () => {
              this.$emit('close-detail')
            }
          )
        } else {
          this.deleteOptionState = true
        }
      },
      deleteCurrentTodo (p) {
        return this.$store.dispatch('deleteTodo', p)
      },
      deleteRepeat (item) {
        var promise
        if (item === '仅删除此任务') {
          promise = this.deleteCurrentTodo({todo: this.item, isRepeat: true, type: 'today'})
        } else if (item === '删除此任务及之后所有任务') {
          promise = this.deleteCurrentTodo({todo: this.item, isRepeat: true, type: 'after'})
        } else {
          promise = this.deleteCurrentTodo({todo: this.item, isRepeat: true, type: 'all'})
        }
        promise.then(() => {
          this.repeatState = false
          this.deleteOptionState = false
          this.$emit('close-detail') // 放在then方法里面
        })
      }
    },
    created () {
      this.$store.dispatch('getPlans').then(
        (items) => {
//            console.log('拿到的plans' + JSON.stringify(items))
          var defaultItem = items.filter((item) => { return item.isDefault === true })
//            console.log('拿到的plans' + JSON.stringify(items))
//          console.log('拿到的id' + JSON.stringify(defaultItem))
          // 从这么多计划中选出一个默认的，根据磨人的child的id去继续请求子计划
          this.$store.dispatch('getSubPlans', {defaultItem: defaultItem[0]}).then(
            (item) => {
              this.$store.dispatch('getCard', {item: item.childKanbanList[0]}).then(
                (item) => {
                })
            })
        })
    },
    mounted () {
      Bus.$on('close', () => {
        this.deleteState = false
        this.showPlan = false
      })
      Bus.$on('close-add-plan', () => {
        this.deleteState = false
        this.showPlan = false
      })
    }
  }
</script>

<style>
  .wrap-plan-item-first{
    display: flex;
    align-items: center;
  }
  .finish-plan{
    font-size: 12px;
    color:#1ba4ff
  }
  .plan-kind>span{
    font-family: AppleSystemUIFont;
    font-size: 13px;
    color: #666666;
  }
  .plan-name{
    margin-left: 10px;
  }
  .plan-img{
    width: 20px;
    height: 20px;
  }
  .wrap-repeat-delete{
    list-style: none;
    height: 100px;
    width: 210px;
    padding-top: 10px;
    background-color: white;
    z-index: 900;
    padding-left: 10px;
    position: absolute;
    top: 20px;
    right: 110px;
    /*box-shadow:3px 5px 24px #888888 ;*/
    box-shadow: 0 1px 5px 0 rgba(114,175,225,0.45);
  }
  .wrap-repeat-delete>li{
    height: 20px;
    cursor: pointer;
    padding-left: 10px;
    padding-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #666666;
  }
  .left-add{
    display: flex;
    align-items: center;
  }
  .wrap-plan-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 30px;
    font-family: AppleSystemUIFont;
    font-size: 12px;
    color: #3D3D3D;
  }
  .wrap-plans{
    position: absolute;
    top: 30px;
    right: -10px;
    height: 200px;
    z-index:800;
    padding: 10px;
    /*width: 100px;*/
    background-color: white;
    list-style: none;
    overflow: auto;
    box-shadow: 0 4px 20px 0 rgba(90,152,212,.32);
  }
  .save-user-define-plan{
    background: #5EADFD;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.18);
    border-radius: 2px;
    margin-top: 20px;
    border: none;
    width: 245px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .plan-name{
    margin-right: 5px;
    max-width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-family: AppleSystemUIFont;
    font-size: 13px;
    color: #3D3D3D;
  }
  .to-plan-window{
    position: absolute;
    top: 50px;
    font-size: 14px;
    background: #fff;
    z-index: 700;
    border-radius: 2px;
    width: 245px;
    padding: 20px 19px 16px 20px;
    box-shadow:0 4px 20px 0 rgba(90,152,212,.32)
  }
  .wrap-plan-kind{
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
  }
  .plan-kind{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon{
    margin-right: 10px;
  }
  .wrap-header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    background-color: white;
    padding-left: 15px;
  }
  .delete-task>li{
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .delete-task>li:hover{
    background: rgba(0,0,0,0.04);
  }
  .delete-task{
    padding-left: 0;
    position: fixed;
    background-color: white;
    right: 0;
    top: 50px;
    width: 100px;
    list-style: none;
    /*height: 30px;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    font-family: AppleSystemUIFont;
    font-size: 13px;
    color: #666666;
    cursor: pointer;
    box-shadow: 0 1px 5px 0 rgba(114,175,225,0.45);
    /*box-shadow:3px 5px 24px #888888 ;*/
    z-index:2000
  }
  .plan,.other,.cancel{
    font-size: 16px;
  }
  .plan{
    /*color:white;*/
    /*background-color:#55A8FD*/
  }
  .other{
    margin-right: 10px;
    cursor: pointer;
    /*position: absolute;*/
    /*right: 50px;*/
  }
  .cancel{
    /*position: absolute;*/
    /*right: 30px;*/
    cursor: pointer;
  }
  .add-to-plan{
    font-size: 15px;
    margin-left: 10px;
    cursor: pointer;
    color:#8C8C8C
  }
  .no-edit-desp{
    display: none;
  }
  .edit-desp{
    display: none;
  }
</style>
