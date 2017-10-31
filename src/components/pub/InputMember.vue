<template>
  <div class="wrap-member">
    <i class="icon2-member member-icon"></i>
    <span class="member">执行人</span>
    <!--<span class="now" :class="{'edit-padding-left':editTime,'new-padding-right':newItem}">{{timeValue}}</span>-->
  </div>
</template>
<style>
  .member-icon{
    font-size: 14px;
  }
  .member{
    font-size: 12px;
  }
  .wrap-member{
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:1px solid gray ;
  }

</style>
