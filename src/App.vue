<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  window.onresize = function () {
    console.log(document.documentElement.clientWidth + ':' + document.documentElement.clientHeight)
  }
  export default {
    name: 'app',
    computed: {
      loginUser () {
        return this.$store.getters.loginUser || {}
      },
      userId () {
        return this.loginUser.authUser.userId
      },
      corpId () {
        return this.loginUser.authUser.corpId
      }
    },
    mounted () {
      window.rsqadmg.execute('openLink', {
        'corpID': this.corpId,
        'userID': this.userId,
        success () {
        }
      })
    }
  }
</script>

<style>
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{
    /*background-color:#d3d7d9;*/
    background: hsla(210,7%,84%,.39);
  }
  ::-webkit-scrollbar-thumb{background-color:gray;}
  ::-webkit-scrollbar-thumb:hover {background-color:lightgray}
  ::-webkit-scrollbar-thumb:active {background-color:#00aff0}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
  overflow: hidden;
  height: 100%;
}
</style>
