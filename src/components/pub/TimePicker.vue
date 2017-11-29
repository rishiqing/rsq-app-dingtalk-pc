<template>
  <ul class="edit-time-wrap" :class="{'IfStart': !startFlag, 'IfEnd': startFlag}">
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
      startFlag: Boolean,
      getScrollTime: String
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
      console.log('穿过俩的时间' + this.getScrollTime)
      var index = this.timeArray.indexOf(this.getScrollTime)
      console.log('第几个索引' + index)
//      console.log('拿到的li' + document.getElementsByClassName('wrap-time')[8].innerText)
//      var distance = document.getElementsByClassName('wrap-time')[index].offsetTop
//      console.log('距离时' + distance)
      var distance = index * 20 + 'px'
      var parent = document.getElementsByClassName('edit-time-wrap')[0]
      parent.scrollTop = distance
    }
  }
</script>
<style>
  .IfEnd{
    left:25px;
  }
  .IfStart{
    left:138px
  }
  .edit-time-wrap{
    box-shadow: 0 4px 20px 0 rgba(90,152,212,.32);
    z-index: 500;
    position: absolute;
    top: 40px;
    height: 300px;
    overflow: auto;
    width: 85px;
    list-style: none;
    padding: 0;
  }
  .wrap-time{
    height: 50px;
    text-align: center;
  }
</style>
