<template>
  <div>
    <div class="modal" @click="closeModal"></div>
    <div class="detail">
      <div class="detail-top">
        <r-detail-header
          @close-detail="closeDetail"
          :item="item"
        >
        </r-detail-header>
        <ul class="wrap-repeat" v-show="repeatState">
          <li v-for="item in this.repeatOption" @click="SelectRepeat(item)">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="detail-content">
        <r-input-title
          :item-title="item.pTitle"
          @changeTitle="changeTitle"
          :isInbox="isInbox"
          :item="item"
        >
        </r-input-title>
        <r-description></r-description>
        <r-input-date
          :currentTodo="currentTodo"
        >
        </r-input-date>
        <r-input-time
          :currentTodo="currentTodo"
        >
        </r-input-time>
        <r-input-member></r-input-member>
        <r-input-priority
          :item="currentTodo"
          :itemTitle="itemTitle"
        >
        </r-input-priority>
        <r-input-sub-todo
          :item="item"
        ></r-input-sub-todo>
        <r-comment-list
          :items="commentList"
          @reply="reply"
        >
        </r-comment-list>
      </div>
      <div class="detail-bottom">
        <div v-show="this.commentState" class="bottom-comment" @click="changeCommentState()">
          输入的讨论内容或发送文件
        </div>
        <textarea  v-model="commentContent" class="comment-text"  name="" id=""  rows="5" v-show="!this.commentState"></textarea>
        <div class="wrap-button" v-show="!this.commentState">
          <button @click="postComment(commentContent)" class="send">发送</button>
          <button @click="hideButton">取消</button>
        </div>
        <r-upload
          @get-file-id="setFileId"
          @remove-file-id="removeFileId"
          @ready-to-upload="isUploading"
          @finish-upload="finishUpload"
        >
        </r-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import DetailHeader from 'com/pub/DetailHeader'
//  import { Promise } from 'es6-promise'
//  import moment from 'moment'
  import InputTitleText from 'com/pub/InputTitleText'
  import InputDate from 'com/pub/InputDate'
  import InputTime from 'com/pub/InputTime'
  import InputMember from 'com/pub/InputMember'
  import InputSubTodo from 'com/pub/InputSubTodo'
  import Description from 'com/pub/Description'
  import InputPriority from 'com/pub/InputPriority'
  import Upload from 'com/pub/Upload'
//  import util from 'ut/jsUtil'
//  import dateUtil from 'ut/dateUtil'
  import ComentList from 'com/pub/ComentList'
  export default {
    name: 'app',
    components: {
      'r-detail-header': DetailHeader,
      'r-input-title': InputTitleText,
      'r-input-date': InputDate,
      'r-input-time': InputTime,
      'r-input-member': InputMember,
      'r-input-sub-todo': InputSubTodo,
//      'r-input-note': InputNoteText,
      'r-comment-list': ComentList,
      'r-description': Description,
      'r-input-priority': InputPriority,
      'r-upload': Upload
    },
    data () {
      return {
        buttonState: false,
        commentState: true,
        commentContent: '',
        repeatState: false,
        repeatOption: [
          '仅更改此任务', '更改此任务及之后所有任务', '更改所有重复的任务'
        ]
      }
    },
    computed: {
      currentTodo () {
        return this.$store.state.todo.currentTodo || {}
      },
      isInbox () {
        return this.currentTodo.pContainer === 'inbox'
      },
      commentList () {
        return this.$store.state.todo.currentTodo.comments
      }
//      subtodos () {
//        return this.$store.state.todo.subTodos
//      }
    },
    props: {
      item: Object,
      itemTitle: Object
    },
    methods: {
      setFileId (p) {
        this.fileId.push(p.id)
        this.fileName.push(p.name)
      },
      removeFileId (name) {
        for (var i = 0; i < this.fileName.length; i++) {
          if (this.fileName[i] === name) {
            this.fileId.splice(i, 1)
            this.fileName.splice(i, 1)
          }
        }
      },
      isUploading (array) {
        this.uploadingFile = array
      },
      finishUpload () {
        this.uploadingFile = []
      },
      reply (item) {
        this.commentContent = '@' + item.authorName
      },
      hideButton () {
        this.commentState = true
      },
      postComment (value) {
//        console.log('传进来value是' + value)
        console.log('进来评论了')
        this.$store.dispatch('postTodoComment', {commentContent: value})
          .then(() => {
//            this.commentState = !this.commentState
            this.commentContent = ''
          })
      },
      changeCommentState () {
        this.commentState = !this.commentState
      },
      updateRepeat (p) {
        return this.$store.dispatch('updateRepeatTodo', p)
      },
      changeTitle (newTitle, e) {
        if (event.keyCode === 13) {
          if (!newTitle) {
            window.rsqadmg.execute('alert', {message: '任务标题不能为空'})
          }
          var params = {pTitle: newTitle}
          return this.$store.dispatch('updateTodo', {editItem: params})
            .then(() => {
              e.target.blur()
              this.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED', params)
            })
        }
      },
      SelectRepeat (item) {
        var promise
        if (item === '仅更改此任务') {
          promise = this.updateRepeat({type: 'today'})
        } else if (item === '更改此任务及之后所有任务') {
          promise = this.updateRepeat({type: 'after'})
        } else {
          promise = this.updateRepeat({type: 'all'})
        }
        promise.then(() => {
          this.repeatState = false
          this.$emit('close-detail') // 放在then方法里面
        })
      },
      closeDetail () {
        var c = this.currentTodo
        var isEdited = this.$store.state.todo.isRepeatFieldEdit
        if (c.pContainer !== 'inbox' && !c.isCloseRepeat && isEdited) {
          this.repeatState = true
        }
        this.$emit('close-detail')
      },
      closeModal () {
        this.$emit('close-detail')
      }
    },
    mounted () {
//      console.log('现在的currenttode是' + JSON.stringify(this.currentTodo))
//      console.log('拿到的item' + JSON.stringify(this.item))
//      console.log('拿到的评论' + JSON.stringify(this.item.comments))
    }
  }
</script>

<style>
  .send{
    cursor: pointer;
  }
  .detail-bottom{
    position: relative;
  }
  .wrap-button{
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    top:64px;
    width:100px;
    height: 50px;
  }
  .comment-text{
    width: 98%;
  }
  .bottom-comment{
    background-color: white;
    /*margin-top: 20px;*/
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-left: 10px;
    margin-rigth: 10px;
  }
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background-color:#bee1eb;}
  ::-webkit-scrollbar-thumb{background-color:gray;}
  ::-webkit-scrollbar-thumb:hover {background-color:lightgray}
  ::-webkit-scrollbar-thumb:active {background-color:#00aff0}
  .detail-content{
    height:75%;
    overflow-y: auto;
  }
  .modal{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /*z-index: 1;*/
    background-color: rgba(0,0,0,.4);
  }
  .detail{
    position:fixed;
    border: 1px solid red;
    /*margin: 20px auto;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 620px;
    height: 570px;
    background-color: #F9F9FA;
  }
</style>
