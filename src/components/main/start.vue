<template>
  <div class="start" id="splash">
      <img src="../../assets/start.png" alt="" class="start-img">

  </div>
</template>
<style scoped>
  .start-text{
    display: flex;
    justify-content: center;
  }
  .start-img{
    width: 410px;
    height: 262px
  }
  .start{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1006;
    width: 100%;
    height: 100%;
    /*opacity: 1;*/
    /*transition: opacity .3s ease;*/
    box-sizing: border-box;
  }
  .start-text{
    margin-top: 60px;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #FFFFFF;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .enter-rsq{
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #FFFFFF;
    background: #86DD2F;
    border-radius: 4px;
    cursor: pointer;
    width: 148px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 39px;
  }
</style>
<script>
  export default {
    methods: {
      enterRsq () {
        this.$emit('enter')
      }
    }
  }
</script>
