<template>
  <div>
    <div class="modal"></div>
    <div class="detail" @click="disappear($event)">
      <div class="detail-top">
        <r-detail-header
          @close-detail="closeDetail"
          :item="item"
        >
        </r-detail-header>
        <ul class="wrap-repeat-select" v-show="repeatState">
          <li v-for="item in this.repeatOption" @click="SelectRepeat(item)">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="detail-content" :class="{'fileCountZero':EditComment,'fileCountOne':fileCountOne,'fileCountTwo':fileCountTwo,'fileCountThree':fileCountThree, 'noComment': this.commentState}">
        <div class="wrap-title-desp">
          <r-input-title
            :item-title="item.pTitle"
            @changeTitle="changeTitle"
            :isInbox="isInbox"
            :item="item"
          >
          </r-input-title>
          <r-description></r-description>
        </div>
        <r-input-date
          :ifshow="ifShow"
          :currentTodo="currentTodo"
          :showTime="showTime"
        >
        </r-input-date>
        <r-input-time
          :ifshow="ifShow"
          :currentTodo="currentTodo"
          :showDate="showDate"
        >
        </r-input-time>
        <r-input-member
          :selected-rsq-ids="joinUserRsqIds"
          @member-changed="saveMember"
        >
        </r-input-member>
        <r-input-priority
          :ifshow="ifShow"
          :item="currentTodo"
          :itemTitle="itemTitle"
        >
        </r-input-priority>
        <r-input-sub-todo
          :item="item"
        ></r-input-sub-todo>
        <r-comment-list
          :items="commentList"
          :id="this.item.id"
          @reply="reply"
        >
        </r-comment-list>
      </div>
      <div class="detail-bottom">
        <div v-show="this.commentState" class="bottom-comment" @click="changeCommentState">
          输入的讨论内容或发送文件
        </div>
        <textarea  :class="{}" ref="textareaComment" autofocus v-model="commentContent" class="comment-text"  name="" id=""  rows="5" v-show="!this.commentState"></textarea>
        <r-upload
          :commentState="this.commentState"
          @get-file-id="setFileId"
          @remove-file-id="removeFileId"
          @ready-to-upload="isUploading"
          @finish-upload="finishUpload"
          @showEditComment="showEditComment"
          @member-changed="getMemberName"
          @call="showMember"
        >
        </r-upload>
        <div class="wrap-button" v-show="!this.commentState">
          <button @click="postComment(commentContent)" class="send">发送</button>
          <button @click="hideButton" class="cancel-comment">取消</button>
        </div>
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
  import Bus from 'com/bus'
  import util from 'ut/jsUtil'
  import moment from 'moment'
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
        ifShow: true,
        showTime: false,
        showDate: false,
        joinUserRsqIds: [],
        buttonState: false,
        commentState: true,
        commentContent: '',
        repeatState: false,
        repeatOption: [
          '仅更改此任务', '更改此任务及之后所有任务', '更改所有重复的任务'
        ],
        content: '',
        fileId: [],
        fileName: [],
        uploadingFile: []
      }
    },
    computed: {
      loginUser () {
        return this.$store.getters.loginUser || {}
      },
      userId () {
        return [this.currentTodo.pUserId]
      },
      fileCountOne () {
        return this.fileId.length === 1
      },
      fileCountTwo () {
        return this.fileId.length === 2
      },
      fileCountThree () {
        return this.fileId.length >= 3
      },
      EditComment () {
        return this.fileId.length === 0 && !this.commentState
      },
      currentTodo () {
        return this.$store.state.todo.currentTodo || {}
      },
      isInbox () {
        return this.currentTodo.pContainer === 'inbox'
      },
      commentList () {
        return this.$store.state.todo.currentTodo.comments
      },
      defaultTaskDate () {
        return this.$store.getters.defaultTaskDate
      },
//      loginUser () {
//        return this.$store.getters.loginUser || {}
//      },
//      userId () {
//        return this.loginUser.authUser.userId ? this.loginUser.authUser.userId : 'dingtalkupload'
//      },
      corpId () {
        return this.loginUser.authUser.corpId ? this.loginUser.authUser.corpId : 'dingtalkupload'
      }
    },
    props: {
      item: Object,
      itemTitle: Object
    },
    methods: {
      showMember () {
        var that = this
        var corpId = that.loginUser.authUser.corpId
        window.rsqadmg.exec('selectDeptMember', {
          btnText: '确定',  //  选择器按钮文本，pc端需要的参数
          multiple: true, //  默认false，选择单人
          maximum: 10,  //  可选择人数的上限，默认-1不限制人数
          title: that.selectTitle, //  选择器标题，pc端需要的参数
          corpId: corpId,  //  加密的企业 ID，
          selectedIds: [],
          disabledIds: [], //  不能选的人
          success (res) {
//            var list = res; //返回选中的成员列表[{openid:'联系人openid',name:'联系人姓名',headImg:'联系人头像url'}]
//              that.memberList = res
            if (res.length === 0) {
              return this.$emit('member-changed', [])
            }
            that.commentContent = '@' + res[0].name + ' ' // 先假设选了一个人
          }
        })
      },
      disappear (e) {
        console.log('到父组件detail了' + e.target.classList)
        this.ifShow = !this.ifShow
//        this.$store.commit('HIDE_POP')
        Bus.$emit('close')
      },
      getMemberName () {

      },
      saveMember (idArray) { // 这个方法关键之处是每次要穿的参数是总接收id，增加的id减少的id
        var compRes = util.compareList(this.joinUserRsqIds, idArray)
//        console.log('比较之后的结果是' + JSON.stringify(compRes))
        var params = {
          receiverIds: idArray.join(','),
          addJoinUsers: compRes.addList.join(','),
          deleteJoinUsers: compRes.delList.join(',')
        }
//        window.rsqadmg.execute('showLoader', {text: '保存中...'})
        this.$store.dispatch('updateTodo', {editItem: params}).then(() => {
          this.joinUserRsqIds = idArray
          if (params.addJoinUsers) {
            var IDArrays = params.addJoinUsers.split(',')
            var empIDArray = []
            var that = this
            this.$store.dispatch('fetchUseridFromRsqid', {corpId: this.corpId, idArray: IDArrays})
              .then(idMap => {
                for (var i = 0; i < IDArrays.length; i++) {
                  empIDArray.push(idMap[IDArrays[i]].emplId)
                }
                var standardTime = moment().format('YYYY-MM-DD HH:mm')
                window.rsqadmg.exec('notify', {
                  userIds: empIDArray,
                  corpId: that.corpId,
                  alertTime: standardTime,
                  title: this.item.pTitle,
                  success: () => {
                    console.log('发送成功')
                  }
                })
              })
          }
        })
      },
      showEditComment () {
        this.commentState = false
      },
      setFileId (p) {
        this.fileId.push(p.id)
        this.fileName.push(p.name)
      },
      removeFileId (name) {
        for (var i = 0; i < this.fileName.length; i++) {
//          console.log('name是' + name + '' + 'this.fileName[i]是' + this.fileName[i].substr(33))
          if (this.fileName[i].substr(32) === name) {
//            console.log('想等了')
            this.fileId.splice(i, 1)
//            console.log(this.fileId.length)
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
        this.commentState = !this.commentState
        this.commentContent = '@' + item.authorName + ' '
        this.$nextTick(() => {
          this.$refs.textareaComment.focus()
        }) // 为什么不起作用
      },
      hideButton () {
        this.commentState = true
      },
      postComment (value) {
//        console.log('传进来value是' + value)
//        console.log('进来评论了')
        if ((!value) && (this.fileId.length === 0)) {
          window.rsqadmg.execute('alert', {title: '', message: '评论不能为空', buttonName: '确定'})
        } else {
          if (value.indexOf('@') !== -1) {
            var newValue = value.split(' ')
            value = '<input value="' + newValue[0] + '">' + newValue[1]
          }
          this.$store.dispatch('postTodoComment', {
            commentContent: value,
            fileIds: this.fileId,
            createTaskDate: this.defaultTaskDate
          })
            .then(() => {
              Bus.$emit('clearTask')
              this.commentContent = ''
              this.fileId = []
              this.fileName = []
              var scrollBar = document.getElementsByClassName('detail-content')[0]
              scrollBar.scrollTop = scrollBar.scrollHeight
            })
        }
      },
      changeCommentState () {
        this.commentState = !this.commentState
        this.$nextTick(() => {
          this.$refs.textareaComment.focus()
        }) // 为什么不起作用
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
          params['oldPTitle'] = this.item.pTitle
          params['id'] = this.item.id
          params['oldPNote'] = this.item.pNote
          params['oldSubTodos'] = this.item.subTodo
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
        } else {
          this.$emit('close-detail')
        }
      },
      closeModal () {
        this.$emit('close-detail')
      }
    },
    mounted () {
      this.joinUserRsqIds = [this.currentTodo.receiverIds]
//      console.log('现在的currenttode是' + JSON.stringify(this.currentTodo))
//      console.log('拿到的item' + JSON.stringify(this.item))
//      console.log('拿到的评论' + JSON.stringify(this.item.comments))
    }
  }
</script>

<style>
  .wrap-repeat-select{
    position: absolute;
    width: 200px;
    top:30px;
    list-style: none;
    background-color: white;
    right: 10px;
    box-shadow: 3px 5px 24px #888888;
    z-index:800;
    padding-left: 0;
  }
  .wrap-repeat-select>li{
    padding-left: 20px;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .wrap-title-desp{
    background-color: white;
  }
  .fileCountZero{
    max-height: 70%;
  }
  .fileCountOne{
    max-height: 60%;
  }
  .fileCountTwo{
    max-height: 50%;
  }
  .fileCountThree {
    max-height: 40%;
  }
  .hasComment{
    max-height: 80%;
  }
  .noComment{
    max-height: 80%;
  }
  .send{
    font-family: PingFangSC-Regular;
    border: none;
    border-radius: 2px;
    padding: 5px 10px;
    background-color: #5EADFD;
    color: white;
    cursor: pointer;
    margin-right: 10px;
  }
  .cancel-comment{
    font-family: PingFangSC-Regular;
    border: 1px solid #5EADFD;
    border-radius: 2px;
    padding: 3px 8px;
    background-color: white;
    color: #5EADFD;
    cursor: pointer;
  }
  .detail-bottom{
    /*position: relative;*/
    /*height: 50px;*/
    background-color: #EEF1F4 ;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .wrap-button{
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
    top:70px;
    width:120px;
    height: 26px;
  }
  .comment-text{
    border: none;
    width: 99%;
    height: 90px;
  }
  .bottom-comment{
    /*position: fixed;*/
    /*left:0;*/
    /*right:0;*/
    /*bottom: 0;*/
    /*background-color: white;*/
    /*margin-top: 20px;*/
    cursor: pointer;
    background-color: white;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    /*margin-left: 10px;*/
    margin-rigth: 10px;
    margin-bottom: 10px;
  }
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{
    /*background-color:#d3d7d9;*/
    background: hsla(210,7%,84%,.39)
  }
  ::-webkit-scrollbar-thumb{
    /*background-color:gray;*/
    background: #d4d7da;
  }
  ::-webkit-scrollbar-thumb:hover {background-color:lightgray}
  ::-webkit-scrollbar-thumb:active {background-color:#00aff0}
  /*::-webkit-scrollbar{width:4px;}*/
  /*::-webkit-scrollbar-track{background-color:#bee1eb;}*/
  /*::-webkit-scrollbar-thumb{background-color:gray;}*/
  /*::-webkit-scrollbar-thumb:hover {background-color:lightgray}*/
  /*::-webkit-scrollbar-thumb:active {background-color:#00aff0}*/
  .detail-content{
    margin-top: 10px;
    /*max-height:60%;*/
    /*height: calc(100% - 45px);*/
    overflow-y: auto;
    /*margin-bottom: 50px;*/
  }
  .modal{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 600;
    background-color: rgba(0,0,0,.4);
  }
  .detail{
    z-index: 601;
    position:fixed;
    border-radius: 10px;
    /*border: 1px solid red;*/
    /*margin: 20px auto;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 620px;
    height: 570px;
    background-color: #F9F9FA;
  }
</style>
