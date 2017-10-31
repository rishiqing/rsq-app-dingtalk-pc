<!--<template>-->
  <!--<v-touch @tap="triggerAndroid($event)">-->
    <!--<li class="coment" >-->
      <!--<div class="left">-->
        <!--<avatar :src="item.authorAvatar"-->
                <!--:username="item.authorName"-->
                <!--:size="30">-->
        <!--</avatar>-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<div class="top">-->
          <!--<span class="author">{{item.authorName}}</span>-->
          <!--<span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>-->
        <!--</div>-->
        <!--<div class="bottom">-->
          <!--<div class="comentContent" v-if="IfReplyComment">-->
            <!--<span class="replyComment">{{item.commentContent.substring(0,IndexOfBlank)}}</span>-->
            <!--<span class="comentContent">{{item.commentContent.substr(IndexOfBlank + 1)}}</span>-->
          <!--</div>-->
          <!--<div class="comentContent" v-else>{{item.commentContent}}</div>-->
          <!--<v-touch class="coment-item-picture file-touch" v-for="file in item.fileList" :key="file.id" @tap="fileTouch(file)">-->
            <!--<template v-if="(file.contentType.toUpperCase() === 'PNG'||file.contentType.toUpperCase() === 'JPEG'|| file.contentType.toUpperCase() === 'JPG')">-->
              <!--<img class="comment-photo file-touch" :src="file.realPath"  alt="">-->
              <!--<span class="file-name file-touch">{{getFileName(file.name)}}</span>-->
              <!--<span class="file-size file-touch">{{getFileSize(file.size)}}</span>-->
            <!--</template>-->
            <!--<template v-else-if="file.contentType.toUpperCase() == 'PDF'">-->
              <!--<img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/pdf.692b9767b9.png"  alt="">-->
              <!--<span class="file-name file-touch">{{getFileName(file.name)}}</span>-->
              <!--<span class="file-size file-touch">{{getFileSize(file.size)}}</span>-->
            <!--</template>-->
            <!--<template v-else-if="file.contentType.toUpperCase() === 'ZIP'">-->
              <!--<img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/zip.f9f2049911.png"  alt="">-->
              <!--<span class="file-name file-touch">{{getFileName(file.name)}}</span>-->
              <!--<span class="file-size file-touch">{{getFileSize(file.size)}}</span>-->
            <!--</template>-->
            <!--<template v-else-if="file.contentType.toUpperCase() === 'DOC' || file.contentType.toUpperCase() === 'DOC'">-->
              <!--<img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/word.b44eea8fcf.png"  alt="">-->
              <!--<span class="file-name file-touch">{{getFileName(file.name)}}</span>-->
              <!--<span class="file-size file-touch">{{getFileSize(file.size)}}</span>-->
            <!--</template>-->
            <!--<template v-else-if="file.contentType.toUpperCase() === 'PPT' || file.contentType.toUpperCase() === 'PPTX'">-->
              <!--<img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/ppt.2c7e64eb9b.png"  alt="">-->
              <!--<span class="file-name file-touch">{{getFileName(file.name)}}</span>-->
              <!--<span class="file-size file-touch">{{getFileSize(file.size)}}</span>-->
            <!--</template>-->
            <!--<template v-else>-->
              <!--<img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/file.46449ccbd9.png"  alt="">-->
              <!--<span class="file-name file-touch">{{getFileName(file.name)}}</span>-->
              <!--<span class="file-size file-touch">{{getFileSize(file.size)}}</span>-->
            <!--</template>-->
          <!--</v-touch>-->
        <!--</div>-->
      <!--</div>-->
    <!--</li>-->
  <!--</v-touch>-->
<!--</template>-->
<!--<style scoped>-->
  <!--.replyComment{-->
    <!--background: rgba(0,0,0,.1);-->
  <!--}-->
  <!--.coment{-->
    <!--padding-left: 3%;-->
    <!--margin-top:0.613rem ;-->
    <!--/*margin-bottom: 10px;*/-->
    <!--line-height: 0.7rem;-->
    <!--border-bottom: none;-->
  <!--}-->
  <!--.comment:last-child{-->

  <!--}-->
  <!--.file-name{-->
    <!--font-family: PingFangSC-Regular;-->
    <!--font-size: 13px;-->
    <!--color: #BFBFBF;-->
    <!--margin-left: 10px;-->
  <!--}-->
  <!--.file-size{-->
    <!--font-family: PingFangSC-Regular;-->
    <!--font-size: 13px;-->
    <!--color: #BFBFBF;-->
    <!--/*display: block;*/-->
    <!--margin-left:0.4rem;-->
    <!--/*float: right;*/-->
  <!--}-->
  <!--.comment-photo{-->
    <!--width: 25px;-->
    <!--height: 29px;-->
  <!--}-->
  <!--.coment-item-picture{-->
    <!--display: flex;-->
    <!--align-items: center;-->
    <!--padding: 5px;-->
    <!--background-color: white;-->
    <!--border: 1px solid #E0E0E0;-->
    <!--width: 91%;-->
    <!--margin-top: 5px;-->
  <!--}-->
  <!--.coment:after{-->
    <!--display: block;-->
    <!--content: '';-->
    <!--clear: both;-->
  <!--}-->
  <!--.time{-->
    <!--font-size: 0.32rem;-->
    <!--color:#8C8C8C ;-->
    <!--width: 2.186rem;-->
    <!--position: absolute;-->
    <!--right:0.26rem;-->
    <!--font-family: PingFangSC-Regular;-->
  <!--}-->
  <!--.left{-->
    <!--width: 1.093rem;-->
    <!--float: left;-->
    <!--zoom: 1;-->
  <!--}-->
  <!--.right{-->
    <!--padding: 0;-->
    <!--width: calc(100% - 52px);-->
    <!--float: left;-->
    <!--border: none;-->
  <!--}-->
  <!--.top{-->
    <!--display: flex;-->
    <!--align-items: center;-->
    <!--padding-right: 0.3rem;-->
    <!--margin-top: -4px;-->
  <!--}-->
  <!--.author{-->
    <!--width: 5.733rem;-->
    <!--font-family: PingFangSC-Regular;-->
    <!--font-size: 12px;-->
    <!--color: #8C8C8C;-->
    <!--letter-spacing: 0;-->
  <!--}-->
  <!--.comentContent{-->
    <!--width: 94%;-->
    <!--font-family: STHeitiSC-Light;-->
    <!--font-size: 15px;-->
    <!--color: #111111;-->
    <!--letter-spacing: 0;-->
    <!--line-height: 21px;-->
  <!--}-->
<!--</style>-->
<!--<script>-->
  <!--import Avatar from 'com/pub/TextAvatar'-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--loginUser () {-->
        <!--return this.$store.state.loginUser-->
      <!--},-->
      <!--rsqUserId () {-->
        <!--return this.loginUser.rsqUser.id-->
      <!--},-->
      <!--comments () {-->
        <!--return this.$store.state.todo.currentTodo.comments-->
      <!--},-->
      <!--IfReplyComment () {-->
        <!--return (this.item.commentContent.indexOf('@') !== -1)-->
      <!--},-->
      <!--IndexOfBlank () {-->
        <!--if (this.IfReplyComment) {-->
          <!--return this.item.commentContent.indexOf('&')-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--props: {-->
      <!--disabled: Boolean,-->
      <!--item: Object,-->
      <!--more: Boolean-->
    <!--},-->
    <!--components: {-->
      <!--'avatar': Avatar-->
    <!--},-->
    <!--methods: {-->
      <!--getFileName (orgName) {-->
        <!--if (!orgName) return ''-->
        <!--var arr = orgName.split('/')-->
        <!--return arr[arr.length - 1].substr(14, 25)-->
      <!--},-->
      <!--getFileSize (fileSize) {-->
        <!--if (fileSize > 1024) {-->
          <!--return parseInt(fileSize / 1024) + 'KB'-->
        <!--} else if (fileSize > 1048576) {-->
          <!--return parseInt(fileSize / (1024 * 1024)) + 'MB'-->
        <!--} else {-->
          <!--return fileSize-->
        <!--}-->
      <!--},-->
      <!--deleteComment (item) {-->
        <!--var that = this-->
        <!--if (this.rsqUserId === item.authorId) {-->
          <!--window.rsqadmg.exec('confirm', {-->
            <!--message: '确定要删除此评论？',-->
            <!--success () {-->
              <!--window.rsqadmg.execute('showLoader', {text: '删除中...'})-->
              <!--that.$store.dispatch('deleteCommentItem', {item: item})-->
                <!--.then(() => {-->
                  <!--window.rsqadmg.exec('hideLoader')-->
                  <!--window.rsqadmg.execute('toast', {message: '删除成功'})-->
                <!--})-->
            <!--}-->
          <!--})-->
        <!--} else {-->
          <!--window.rsqadmg.exec('confirm', {-->
            <!--message: '确定回复此评论？',-->
            <!--success () {-->
              <!--that.$store.dispatch('ReplyCommentItem', {item: item})-->
                <!--.then(() => {-->
                  <!--that.$router.push('/pub/coment')-->
                <!--})-->
            <!--}-->
          <!--})-->
        <!--}-->
      <!--},-->
      <!--fileTouch (file) {-->
        <!--this.$emit('comment-file-touch', file)-->
      <!--},-->
      <!--triggerAndroid (e) {-->
        <!--if (this.disabled) return-->
        <!--if (!e.target.classList.contains('file-touch')) {-->
          <!--this.deleteComment(this.item)-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--mounted () {}-->
  <!--}-->
<!--</script>-->
