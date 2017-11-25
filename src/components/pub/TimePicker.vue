<template>
  <ul class="edit-time-wrap" :class="{'IfStart': !startFlag}">
    <li class="wrap-time"  v-for="item in timeArray" @click="changeTime(item)">
      {{item}}
    </li>
  </ul>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        timeArray: []
      }
    },
    props: {
      startFlag: Boolean
    },
    methods: {
      changeTime (time) {
        this.$emit('changeTime', time, this.startFlag)
      },
      initData () {
        for (var i = 0; i < 290; i++) {
          this.timeArray.push(moment({hour: 0, minute: 0}).add(5 * i, 'm').format('HH:mm'))
        }
      }
    },
    mounted () {
      this.initData()
      console.log('事件数组是' + this.titleArray)
    }
  }
</script>
<style>
  .IfStart{
    left:100px
  }
  .edit-time-wrap{
    z-index: 500;
    position: absolute;
    top: 10px;
    height: 300px;
    overflow: auto;
    width: 100px;
    list-style: none;
    padding: 0;
  }
  .wrap-time{
    height: 50px;
    text-align: center;
  }
</style>
