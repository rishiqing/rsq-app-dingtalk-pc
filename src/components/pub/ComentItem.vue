<template>
  <div  class="wrap-comment-item">
    <li class="coment" @mouseover="showButton(item)" @mouseout="showTime">
      <div class="left">
        <!--{{item.authorName}}-->
        <avatar :src="item.authorAvatar"
                :username="item.authorName"
                :size="30">
        </avatar>
      </div>
      <div class="right">
        <div class="top">
          <span class="author">{{item.authorName}}</span>
          <span class="time" v-show="this.timeState">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
          <span class="delete-comment" v-show="this.delete" @click="deleteComment(item,$event)">删除</span>
          <span class="reply-comment" v-show="this.reply" @click="replyComment(item,$event)">回复</span>
        </div>
        <div class="bottom">
          <div class="comentContent" v-if="IfReplyComment">
            <span class="replyComment" v-html="item.commentContent">{{item.commentContent}}</span>
            <!--<span class="comentContent">{{item.commentContent.substr(IndexOfBlank + 1)}}</span>-->
            <!--<span class="replyComment">{{item.commentContent.substring(0,IndexOfBlank)}}</span>-->
            <!--<span class="comentContent">{{item.commentContent.substr(IndexOfBlank + 1)}}</span>-->
          </div>
          <div class="comentContent" v-else>{{replaceComment(item.commentContent)}}</div>
          <div class="coment-item-picture file-touch" v-for="file in item.fileList" :key="file.id">
            <template v-if="(file.contentType.toUpperCase() === 'PNG'||file.contentType.toUpperCase() === 'JPEG'|| file.contentType.toUpperCase() === 'JPG')">
              <img class="comment-photo file-touch" :src="file.realPath"  alt="">
              <span class="file-name file-touch">{{getFileName(file.name)}}</span>
              <span class="file-size file-touch">{{getFileSize(file.size)}}</span>
              <span class="file-preview" @click="filePreview(file)">预览</span>
              <span class="file-preview" @click="fileDownload(file)">下载</span>
            </template>
            <template v-else-if="file.contentType.toUpperCase() == 'PDF'">
              <img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/pdf.692b9767b9.png"  alt="">
              <span class="file-name file-touch">{{getFileName(file.name)}}</span>
              <span class="file-size file-touch">{{getFileSize(file.size)}}</span>
              <span class="file-preview" @click="filePreview(file)">预览</span>
              <span class="file-preview" @click="fileDownload(file)">下载</span>
            </template>
            <template v-else-if="file.contentType.toUpperCase() === 'ZIP'">
              <img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/zip.f9f2049911.png"  alt="">
              <span class="file-name file-touch">{{getFileName(file.name)}}</span>
              <span class="file-size file-touch">{{getFileSize(file.size)}}</span>
              <span class="file-preview" @click="filePreview(file)">预览</span>
              <span class="file-preview" @click="fileDownload(file)">下载</span>
            </template>
            <template v-else-if="file.contentType.toUpperCase() === 'DOC' || file.contentType.toUpperCase() === 'DOC'">
              <img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/word.b44eea8fcf.png"  alt="">
              <span class="file-name file-touch">{{getFileName(file.name)}}</span>
              <span class="file-size file-touch">{{getFileSize(file.size)}}</span>
              <span class="file-preview" @click="filePreview(file)">预览</span>
              <span class="file-preview" @click="fileDownload(file)">下载</span>
            </template>
            <template v-else-if="file.contentType.toUpperCase() === 'PPT' || file.contentType.toUpperCase() === 'PPTX'">
              <img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/ppt.2c7e64eb9b.png"  alt="">
              <span class="file-name file-touch">{{getFileName(file.name)}}</span>
              <span class="file-size file-touch">{{getFileSize(file.size)}}</span>
              <span class="file-preview" @click="filePreview(file)">预览</span>
              <span class="file-preview" @click="fileDownload(file)">下载</span>
            </template>
            <template v-else>
              <img class="comment-photo file-touch" src="https://res-front-cdn.timetask.cn/beta/images/file.46449ccbd9.png"  alt="">
              <span class="file-name file-touch">{{getFileName(file.name)}}</span>
              <span class="file-size file-touch">{{getFileSize(file.size)}}</span>
              <span class="file-preview" @click="filePreview(file)">预览</span>
              <span class="file-preview" @click="fileDownload(file)">下载</span>
            </template>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
<style scoped>
  .toolbox-atSpan {
    background: rgba(0,0,0,.1);
    padding: 2px;
    margin: 4px;
    font-size: 12px;
    border: none;
    display: inline;
    border-radius: 4px;
    line-height: normal;
  }
  .replyComment>input {
    border: none;
    background-color: lightgray;
  }
  input[type="button"] {
    border: none;
    background-color: red;
  }
  .wrap-comment-item:last-child{
    /*margin-bottom: 50px;*/
  }
  .delete-comment{
    color: red;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 11.9px;
    color: #5EADFD;
  }
  .reply-comment{
    font-size: 12px;
    cursor: pointer;
    color:#FF7A7A
  }
  .replyComment{
    /*background: rgba(0,0,0,.1);*/
  }
  .coment{
    /*padding-left: 3%;*/
    margin-top:20px;
    list-style: none;
    /*margin-bottom: 10px;*/
    /*line-height: 0.7rem;*/
    border-bottom: none;
  }
  .comment:last-child{

  }
  .file-name{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #BFBFBF;
    margin-left: 10px;
    width: 60%;
  }
  .file-preview{
    width: 30px;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #5799db;
    margin-left: 30px;
  }
  .file-size{
    width: 40px;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #BFBFBF;
    /*display: block;*/
    margin-left:20px;
    /*float: right;*/
  }
  .comment-photo{
    width: 25px;
    height: 29px;
  }
  .coment-item-picture{
    display: flex;
    align-items: center;
    padding: 5px;
    background-color: white;
    border: 1px solid #E0E0E0;
    width: 100%;
    margin-top: 5px;
  }
  .coment:after{
    display: block;
    content: '';
    clear: both;
  }
  .time{
    /*font-size: 10px;*/
    /*color:#8C8C8C ;*/
    /*!*width: 2.186rem;*!*/
    /*!*position: absolute;*!*/
    /*!*right:0.26rem;*!*/
    /*font-family: PingFangSC-Regular;*/
    font-family: SFNSText;
    font-size: 11.9px;
    color: #8C8C8C;
    line-height: 15.87px;
  }
  .left{
    /*width: 1.093rem;*/
    font-size: 14px;
    float: left;
    zoom: 1;
  }
  .right{
    padding: 0;
    margin-left: 10px;
    width: calc(100% - 52px);
    float: left;
    border: none;
  }
  .top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.3rem;
    height: 20px;
    /*margin-top: -4px;*/
  }
  .author{
    /*width: 5.733rem;*/
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #8C8C8C;
    letter-spacing: 0;
  }
  .comentContent{
    width: 94%;
    font-family: STHeitiSC-Light;
    font-size: 15px;
    color: #111111;
    letter-spacing: 0;
    margin-top: 10px;
    /*line-height: 21px;*/
  }
</style>
<script>
  import Avatar from 'com/pub/TextAvatar'
  export default {
    data () {
      return {
        timeState: true,
        delete: false,
        reply: false
      }
    },
    computed: {
      loginUser () {
        return this.$store.state.loginUser
      },
      rsqUserId () {
        return this.loginUser.rsqUser.id
      },
//      comments () {
//        return this.$store.state.todo.currentTodo.comments
//      },
      IfReplyComment () {
        return (this.item.commentContent.indexOf('@') !== -1)
      },
      IndexOfBlank () {
        if (this.IfReplyComment) {
          return this.item.commentContent.indexOf(' ')
        }
      }
    },
    props: {
      disabled: Boolean,
      item: Object,
      more: Boolean
    },
    components: {
      'avatar': Avatar
    },
    methods: {
      replaceReplyComment (item) {
//        console.log(item.innerHTML)
        return item.replace(/<\/?.+?>/g, '\n').replace(/(\n)+/g, '\n').replace('&nbsp;', '')
      },
      replaceComment (item) {
        return item.replace(/<\/?.+?>/g, '')
      },
      showButton (item) {
        this.timeState = false
        if (this.rsqUserId === item.authorId) {
          this.delete = true
        } else {
          this.reply = true
        }
      },
      showTime () {
        this.timeState = true
        this.delete = false
        this.reply = false
      },
      getFileName (orgName) {
        return orgName.substr(32)
//        if (!orgName) return ''
//        var arr = orgName.split('/')
//        return arr[arr.length - 1].substr(14, 25)
      },
      getFileSize (fileSize) {
        if (fileSize > 1024) {
          return parseInt(fileSize / 1024) + 'KB'
        } else if (fileSize > 1048576) {
          return parseInt(fileSize / (1024 * 1024)) + 'MB'
        } else {
          return fileSize
        }
      },
      deleteComment (item, e) {
        console.log('delete进来了')
        this.$store.dispatch('deleteCommentItem', {item: item})
          .then(() => {
            e.stopPropagation()
          })
      },
      replyComment (item, e) {
//        console.log('reply进来了')
        this.$emit('reply', item)
        this.$store.dispatch('ReplyCommentItem', {item: item})
          .then(() => {
            e.stopPropagation()
          })
      },
      filePreview (file) {
        this.$emit('filePreview', file)
      },
      fileDownload (file) {
        this.$emit('fileDownload', file)
      },
      triggerAndroid (e) {
        if (this.disabled) return
        if (!e.target.classList.contains('file-touch')) {
          this.deleteComment(this.item)
        }
      }
    },
    mounted () {}
  }
</script>
