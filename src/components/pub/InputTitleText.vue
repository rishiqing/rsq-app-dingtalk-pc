<template>
  <div class="input-title-wrap">
      <div class="wrap-icon"
               v-if="!isInbox"
               @click="clickCheckOut">
        <i class="icon2-check-box select-title"
           :class="{'icon-check_box_outline_blank': !item.pIsDone, 'icon-check': itemChecked}"></i>
        <div class="hide" :class="{'square-icon':item.pIsDone}"></div>
        <i class="icon2-selected finish-icon" :class="{'isdisplay':item.pIsDone}"></i>
      </div>
      <input type="text" placeholder="输入任务标题"
             ref="titleInput"
             :value="itemTitle"
             class="input-title"
             @keypress="changeItemTitle($event.target.value,$event)"
             @input="inputChange($event.target.value)"
             @blur="inputBlur($event.target.value)"
             @focus="IsDisabled($event)"/>
  </div>
</template>
<style scoped>
  .square-icon{
    display: block;
    background-color: white;
    border:1px solid white;
    width:4px;
    height: 4px;
    margin-left: -6px;
    margin-top: -9px;
  }
  .wrap-icon .isdisplay{
    display: block;
    font-size: 14px;
    margin-left: -13px;
    margin-top: -10px;
    /*position: absolute;*/
    /*top:2px*/
  }
  .wrap-icon{
    height: 39px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .select-title{
    font-size: 14px;
  }
  .hide{
    display: none;
  }
  .finish-icon{
    display: none;
  }
  .input-title-wrap{
    display: flex;
    background-color: white;
    align-items: center;
    height: 38px;
    margin-left: 15px;
    border-bottom: 1px solid gray;
  }
  .input-title{
    border: none;
    height: 37px;
  }
</style>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
    },
    props: {
      item: Object,
      newCheckable: Boolean,
      isCheckable: Boolean,
      itemTitle: String,
      itemChecked: Boolean,
      disabled: Boolean,
      isEdit: Boolean,
      isInbox: Boolean
    },
    methods: {
      changeItemTitle (value, e) {
        this.$emit('changeTitle', value, e)
      },
      IsDisabled (e) {
        if (this.disabled) {
          e.target.blur()
          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
        }
      },
      inputBlur (newTitle) {
        if (!newTitle) {
          alert('标题不能为空')
          return
        }
        var params = {pTitle: newTitle}
        return this.$store.dispatch('updateTodo', {editItem: params})
          .then(() => {
//              this.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED', params)
          })
      },
      inputChange (value) {
        this.$emit('text-change', value)
      },
      clickCheckOut () {
        console.log('进来了吗' + !this.item.pIsDone)
//        if (this.disabled) {
//          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
//          return
//        }
        this.$store.dispatch('submitTodoFinish', {item: this.item, status: !this.item.pIsDone})
          .then(function () {
//              this.$store.dispatch('saveTodoAction', {editItem: {status: status}})
//                .then(() => {
//                })
          })
//        this.$emit('click-checkout', !this.itemChecked)
      }
    }
  }
</script>
