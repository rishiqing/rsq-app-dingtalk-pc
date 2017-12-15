<template>
  <div id="app">
    <transition name="fade">
      <start
        @enter="enter"
        v-show="this.engine"
      >
      </start>
    </transition>
    <router-view/>
  </div>
</template>

<script>
  import start from 'com/main/start'
  window.onresize = function () {
    console.log(document.documentElement.clientWidth + ':' + document.documentElement.clientHeight)
  }
  export default {
    name: 'app',
    data () {
      return {
        engine: true,
        t: ''
      }
    },
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
    methods: {
      enter () {
        this.engine = false
        window.clearTimeout(this.t)
      }
    },
    components: {
      'start': start
    },
    watch: {
      engine () {
        window.rsqadmg.execute('openLink', {
          'corpID': this.corpId,
          'userID': this.userId,
          success () {
          }
        })
      }
    },
    mounted () {
      this.t = window.setTimeout(
        () => {
          this.engine = false
        }, 2000
      )
//      window.rsqadmg.execute('openLink', {
//        'corpID': this.corpId,
//        'userID': this.userId,
//        success () {
//        }
//      })
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
