<template>
  <div id="detail-header">
    <div class="wrap-header" :class="{'no-edit-desp':editDesp}">
      <div class="left-add">
        <i class="icon2-plan plan"></i>
        <span class="add-to-plan" @click="addToPlan">{{isFromkanban}}</span>
      </div>
      <div class="close-icon">
        <i class="icon2-other other" @click="showOption"></i>
        <i class="icon2-cancel cancel" @click="closeDetail"></i>
      </div>
      <div class="delete-task" v-show="this.deleteState" @click="deleteTask(item)">删除任务</div>
      <ul class="wrap-repeat" v-show="this.deleteOptionState">
        <li v-for="item in this.deleteOption" @click="deleteRepeat(item)">
          {{item}}
        </li>
      </ul>
    </div>
    <div :class="{'edit-desp':!editDesp}">
      这个是描述编辑状态
    </div>
    <div class="to-plan-window" v-show="this.showPlan">
      <div class="plan-kind">
        <span>计划</span>
        <div class="wrap-plan-kind" @click="showMainPlan">
          <span class="plan-name">{{planName}}</span>
          <i class="icon2-arrow-down2"></i>
          <ul class="wrap-plans" v-show="this.planState">
            <li v-for="plan in plans" class="wrap-plan-item" @click="changePlan(plan)">
              {{plan.name}}
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
              {{subplan.name}}
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
              {{card.name}}
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
      moveToPlan () {
        var todoId = this.item.id
        var cardId = this.cards[0].id
        var createTaskDate = dateUtil.getStandardTime(new Date())
        this.$store.dispatch('moveToPlan', {todoId: todoId, cardId: cardId, createTaskDate: createTaskDate})
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
      changePlan (plan) {
        this.$store.commit('CHANGE_PLAN_ORDER', {plan: plan, id: 1})
        this.$store.dispatch('getSubPlans', {defaultItem: plan}).then(
          (item) => {
            this.$store.dispatch('getCard', {item: item.childKanbanList[0]}).then(
              (item) => {
              })
          })
      },
      showSubPlan () {
        this.subPlanState = !this.subPlanState
      },
      showMainPlan () {
        this.planState = !this.planState
      },
      showCard () {
        this.cardState = !this.cardState
      },
      addToPlan () {
        this.showPlan = !this.showPlan
      },
      closeDetail () {
        this.$emit('close-detail')
      },
      showOption () {
        this.deleteState = !this.deleteState
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
    }
  }
</script>

<style>
  .left-add{
    display: flex;
    align-items: center;
  }
  .wrap-plan-item{
    width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 30px;
  }
  .wrap-plans{
    position: absolute;
    top: 20px;
    right: -10px;
    height: 200px;
    z-index:800;
    padding: 10px;
    width: 100px;
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
    width: 280px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .plan-name{
    margin-right: 5px;
  }
  .to-plan-window{
    position: absolute;
    top: 50px;
    font-size: 14px;
    background: #fff;
    z-index: 700;
    border-radius: 2px;
    width: 285px;
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
  .delete-task{
    position: absolute;
    right: 0;
    top: 40px;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
    box-shadow:3px 5px 24px #888888 ;
  }
  .plan,.other,.cancel{
    font-size: 16px;
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
    font-size: 13px;
    margin-left: 10px;
    cursor: pointer;
  }
  .no-edit-desp{
    display: none;
  }
  .edit-desp{
    display: none;
  }
</style>
