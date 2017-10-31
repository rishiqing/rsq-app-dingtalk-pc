<template>
  <div class="input-title-wrap">
      <div class="wrap-icon"
               v-if="!isInbox"
               @click="clickCheckOut">
        <i class="icon2-check-box select-title"
           :class="{'icon-check_box_outline_blank': !itemChecked, 'icon-check': itemChecked}"></i>
        <div class="hide" :class="{'for-hide-title':itemChecked}"></div>
        <i class="icon2-selected hide" :class="{'isdisplay-title':itemChecked}"></i>
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
    position: absolute;
    font-size: 14px;
    /*left: -15px;*/
    /*top: -15px;*/
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
      inputBlur (value) {
        this.$emit('text-blur', value)
      },
      inputChange (value) {
        this.$emit('text-change', value)
      },
      clickCheckOut () {
        if (this.disabled) {
          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
          return
        }
        this.$emit('click-checkout', !this.itemChecked)
      }
    }
  }
</script>
