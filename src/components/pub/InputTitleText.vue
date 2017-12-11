<template>
  <div class="input-title-wrap">
      <div class="wrap-icon-title"
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
             class="input-title margin-detail"
             @keypress="changeItemTitle($event.target.value,$event)"
             @input="inputChange($event.target.value)"
             @blur="inputBlur($event.target.value)"
             @focus="IsDisabled($event)"/>
  </div>
</template>
<style scoped>
  .wrap-icon-title .square-icon{
    display: block;
    background-color: white;
    border:1px solid white;
    width:4px;
    height: 4px;
    margin-left: -6px;
    margin-top: -9px;
  }
  .wrap-icon-title .isdisplay{
    display: block;
    font-size: 14px;
    margin-left: -11px;
    margin-top: -8px;
    /*position: absolute;*/
    /*top:2px*/
  }
  .wrap-icon-title{
    height: 39px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .select-title{
    /*border: 1px solid #666666;*/
    /*border-radius: 1.98px;*/
    cursor: pointer;
    font-size: 14px;
  }
  .hide{
    display: none;
  }
  .finish-icon{
    display: none;
    color:#7bbdff
  }
  .input-title-wrap{
    display: flex;
    background-color: white;
    align-items: center;
    height: 38px;
    margin-left: 15px;
    border-bottom: 0.5px solid #EAEAEA;
  }
  .input-title{
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #3D3D3D;
    border: none;
    height: 35px;
    width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .input-title:focus {
    border: 0 solid white;
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
//        console.log('进来了吗' + !this.item.pIsDone)
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
