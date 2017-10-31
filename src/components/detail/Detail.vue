<template>
  <div>
    <div class="modal" @click="closeModal"></div>
    <div class="detail">
      <div class="detail-top">
        <r-detail-header
          @close-detail="closeDetail"
        >
        </r-detail-header>
      </div>
      <div class="detail-content">
        <r-input-title
          :item-title="item.pTitle"
          @changeTitle="changeTitle"
          :isInbox="isInbox"
        >
        </r-input-title>
        <r-description></r-description>
        <r-input-date></r-input-date>
        <r-input-time></r-input-time>
        <r-input-member></r-input-member>
        <r-input-priority
          :item="item"
        >
        </r-input-priority>
        <r-input-sub-todo
          :item="item"
        ></r-input-sub-todo>
        <!--<r-comment-list></r-comment-list>-->
      </div>
      <div class="detail-bottom">
        <div v-show="this.commentState" class="bottom-comment" @click="changeCommentState()">
          输入的讨论内容或发送文件
        </div>
        <textarea v-model="commentContent" class="comment-text" @keypress="postComment($event.target.value,$event)" name="" id=""  rows="5" v-show="!this.commentState"></textarea>
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
//  import util from 'ut/jsUtil'
//  import dateUtil from 'ut/dateUtil'
//  import ComentList from 'com/pub/ComentList'
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
//      'r-comment-list': ComentList,
      'r-description': Description,
      'r-input-priority': InputPriority
    },
    data () {
      return {
        commentState: true,
        commentContent: ''
      }
    },
    computed: {
      currentTodo () {
        return this.$store.state.todo.currentTodo || {}
      },
      isInbox () {
        return this.currentTodo.pContainer === 'inbox'
      }
    },
    props: {
      item: Object
    },
    methods: {
      postComment (value, event) {
        if (event.keyCode === 13) {
          this.$store.dispatch('postTodoComment', {commentContent: value})
            .then(() => {
              this.commentState = !this.commentState
              this.commentContent = ''
            })
        }
      },
      changeCommentState () {
        this.commentState = !this.commentState
      },
      changeTitle (newTitle, e) {
        if (!newTitle) {
          window.rsqadmg.execute('alert', {message: '任务标题不能为空'})
//          return Promise.reject()
        }
        var params = {pTitle: newTitle}
        return this.$store.dispatch('updateTodo', {editItem: params})
          .then(() => {
            e.target.blur()
//            this.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED', params)
          })
          .then(() => {
//            this.editItem.pTitle = newTitle
//              this.editItem.pTitle = newTitle
//              window.rsqadmg.exec('hideLoader')
//              window.rsqadmg.execute('toast', {message: '保存成功'})
          })
      },
      closeDetail () {
        this.$emit('close-detail')
      },
      closeModal () {
        this.$emit('close-detail')
      }
    }
  }
</script>

<style>
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
