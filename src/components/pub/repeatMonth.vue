<template>
  <div class="wrap-month">

  </div>
</template>
<script>

</script>
<style>
  .week-bottom div:hover{
    color:green
  }
  .week-top div:hover{
    color:green
  }
  .week-top div{
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
    border:1px solid red;
  }
  .week-bottom div{
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
    border:1px solid red;
  }
  .week-bottom, .week-top{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
  }

</style>
