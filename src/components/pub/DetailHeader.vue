<template>
  <div id="detail-header">
    <div class="wrap-header" :class="{'no-edit-desp':editDesp}">
      <i class="icon2-plan plan"></i>
      <span class="add-to-plan">添加至计划</span>
      <i class="icon2-other other"></i>
      <i class="icon2-cancel cancel" @click="closeDetail"></i>
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
        editDesp: false
      }
    },
    methods: {
      closeDetail () {
        this.$emit('close-detail')
      }
    }
  }
</script>

<style>
  .wrap-header{
    display: flex;
    align-items: center;
    height: 64px;
    background-color: white;
    padding-left: 15px;
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
