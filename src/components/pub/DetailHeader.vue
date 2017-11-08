<template>
  <div id="detail-header">
    <div class="wrap-header" :class="{'no-edit-desp':editDesp}">
      <i class="icon2-plan plan"></i>
      <span class="add-to-plan">添加至计划</span>
      <i class="icon2-other other" @click="showOption"></i>
      <i class="icon2-cancel cancel" @click="closeDetail"></i>
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
  </div>
</template>
<script>
  export default {
    name: 'app',
    components: {
    },
    data () {
      return {
        editDesp: false,
        deleteState: false,
        deleteOptionState: false,
        deleteOption: [
          '仅删除此任务', '删除此任务及之后所有任务', '删除所有重复的任务'
        ]
      }
    },
    props: {
      item: Object
    },
    methods: {
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
    }
  }
</script>

<style>
  .wrap-header{
    position: relative;
    display: flex;
    align-items: center;
    height: 64px;
    background-color: white;
    padding-left: 15px;
  }
  .delete-task{
    position: absolute;
    top: 30px;
    font-size: 20px;
    cursor: pointer;
  }
  .plan,.other,.cancel{
    font-size: 16px;
  }
  .other{
    position: absolute;
    right: 50px;
  }
  .cancel{
    position: absolute;
    right: 30px;
    cursor: pointer;
  }
  .add-to-plan{
    font-size: 16px;
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
