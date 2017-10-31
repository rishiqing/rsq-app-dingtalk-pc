<!--<template>-->
  <!--<ul class="coment-list">-->
    <!--<div class="comment-top">-->
      <!--<i class=""></i>-->
      <!--<span class="word-update">动态</span>-->
      <!--<div :class="{'isDisplay': !more}" class="operation" @click="changeState">收起操作记录</div>-->
      <!--<div :class="{'isDisplay': more}" class="operation"  @click="changeState">显示操作记录</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;<r-record-coment&ndash;&gt;-->
      <!--&lt;!&ndash;v-for="item in recordItems"&ndash;&gt;-->
      <!--&lt;!&ndash;:disabled="disabled"&ndash;&gt;-->
      <!--&lt;!&ndash;:item="item"&ndash;&gt;-->
      <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
      <!--&lt;!&ndash;:more="more"&ndash;&gt;-->
    <!--&lt;!&ndash;&gt;</r-record-coment>&ndash;&gt;-->
    <!--<r-todo-coment-->
      <!--v-for="item in commentItems"-->
      <!--:disabled="disabled"-->
      <!--:item="item"-->
      <!--:key="item.id"-->
      <!--@comment-file-touch="showAction"-->
    <!--&gt;</r-todo-coment>-->
    <!--<div v-if="comentCount" class="noComent">-->
      <!--&lt;!&ndash;<img src="../../assets/img/nocoment.png" alt="">&ndash;&gt;-->
      <!--<p class="noComentContent">暂无评论</p>-->
    <!--</div>-->
  <!--</ul>-->
<!--</template>-->
<!--<style>-->
  <!--.comment-top{-->
    <!--height: 40px;-->
  <!--}-->
  <!--.coment-list{-->
    <!--padding-left: 15px;-->
    <!--margin: 0;-->
  <!--}-->
  <!--.word-update{-->
    <!--font-size: 12px;-->
  <!--}-->
  <!--.comment-top{-->
    <!--display: flex;-->
    <!--align-items: center;-->
  <!--}-->
  <!--.noComent{-->
    <!--text-align: center;-->
    <!--height: 3rem;-->
  <!--}-->
  <!--/*.noComent>img{*/-->
    <!--/*width: 44px;*/-->
    <!--/*height:44px ;*/-->
    <!--/*margin-top: 1.6rem;*/-->
  <!--/*}*/-->
  <!--.noComentContent{-->
    <!--font-family: PingFangSC-Regular;-->
    <!--font-size: 15px;-->
    <!--color: #55A8FD;-->
    <!--letter-spacing: 0;-->
  <!--}-->
  <!--.isDisplay{-->
    <!--display: none;-->
  <!--}-->
  <!--/*.comentlist{*/-->
    <!--/*background-color: white;*/-->
    <!--/*margin-top: 10px;*/-->
    <!--/*!*margin-bottom: 5rem;*!*/-->
    <!--/*padding-bottom: 2.9rem;*/-->
    <!--/*!*margin-bottom: 1.4rem;*!*/-->
    <!--/*!*border-top: 1px solid #E0E0E0;*!*/-->
  <!--/*}*/-->
  <!--.operation{-->
    <!--font-family: PingFangSC-Regular;-->
    <!--color:#55A8FD;-->
    <!--font-size:15px ;-->
    <!--cursor: pointer;-->
  <!--}-->
<!--</style>-->
<!--<script>-->
<!--//  import Previewer from 'com/pub/Previewer'-->
  <!--import ComentItem from 'com/pub/ComentItem'-->
<!--//  import comentRecord from 'com/pub/comentRecord'-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--more: false-->
      <!--}-->
    <!--},-->
    <!--name: 'ComentList',-->
    <!--props: {-->
      <!--disabled: Boolean,-->
      <!--items: Array,-->
      <!--commentContent: String-->
    <!--},-->
    <!--components: {-->
      <!--'r-todo-coment': ComentItem-->
<!--//      'r-record-coment': comentRecord-->
    <!--},-->
    <!--computed: {-->
<!--//      recordItems () {-->
<!--//        return this.items.filter(i => {-->
<!--//          return i.type !== 0-->
<!--//        })-->
<!--//      },-->
<!--//      commentItems () {-->
<!--//        return this.items.filter(i => {-->
<!--//          return i.type === 0-->
<!--//        })-->
<!--//      },-->
<!--//      comentCount () {-->
<!--//        if (this.items === undefined) {-->
<!--//          return-->
<!--//        } else {-->
<!--//          for (var i = 0; i < this.items.length; i++) {-->
<!--//            if (this.items[i].type === 0) {-->
<!--//              return false-->
<!--//            }-->
<!--//          }-->
<!--//          return true-->
<!--//        }-->
<!--//      }-->
    <!--},-->
    <!--methods: {-->
<!--//      getFileName (file) {-->
<!--//        if (!file.name) return ''-->
<!--//        var arr = file.name.split('/')-->
<!--//        return arr[arr.length - 1].substr(14)-->
<!--//      },-->
      <!--changeState () {-->
        <!--this.more = !this.more-->
      <!--}-->
<!--//      showAction (f) {-->
<!--//        var that = this-->
<!--//        window.rsqadmg.exec('actionsheet', {-->
<!--//          buttonArray: ['预览文件', '下载文件'],-->
<!--//          success: function (res) {-->
<!--//            switch (res.buttonIndex) {-->
<!--//              case 0:-->
<!--//                Previewer.show({-->
<!--//                  file: f-->
<!--//                })-->
<!--//                break-->
<!--//              case 1:-->
<!--//                that.downloadFile(f)-->
<!--//                break-->
<!--//              default:-->
<!--//                break-->
<!--//            }-->
<!--//          }-->
<!--//        })-->
<!--//      },-->
<!--//      downloadFile (f) {-->
<!--//        var link = document.createElement('a')-->
<!--//        link.download = this.getFileName(f)-->
<!--//        link.href = f.realPath-->
<!--//        link.click()-->
<!--//      }-->
    <!--}-->
  <!--}-->
<!--</script>-->
