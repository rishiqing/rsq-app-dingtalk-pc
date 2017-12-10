<template>
  <div class="wrap-upload">
    <input class="file-input" type="file" id="imgInp" name="uploads[]" multiple="multiple" @change="addToTask"/>
    <i class="icon-attachment upload-icon" v-show="!this.commentState"></i>
    <!--<i class="icon2-at remind-sb" @click="call" v-show="!this.commentState"></i>-->
    <ul class="ul-list" v-show="!this.commentState">
      <r-upload-item
        v-for="(task, index) in taskList"
        :key="index"
        :task="task"
        @upload-item-delete="deleteTask"
      ></r-upload-item>
    </ul>
    <!--<div @click="cancelUpload">测试</div>-->
  </div>
</template>
<style lang="scss">
  .remind-sb{
    cursor: pointer;
    margin-left: 15px;
  }
  .upload-icon{
    font-size: 20px;
    /*<!--margin-left: -32px;-->*/
    margin-top: -15px;
    color:#b1b1b1
  }
  .wrap-upload {
    /*position: absolute;*/
    /*top: 10px;*/
    margin-top: -30px;
    width: 100%;
  }
  .ul-list{
    margin: 0;
    padding-left: 0;
    margin-top: 10px;
    max-height: 150px;
    overflow-y: auto;
  }
  .file-input {
    cursor: pointer;
    width: 10px;
    opacity: 0;
    /*<!--margin-left: -15px;-->*/
    /*position:absolute;*/
    /*top: 4.75rem;*/
    /*font-size:30px;*/
    /*left:0.3rem;*/
    /*width:0.848rem;*/
    /*height: 0.7rem;*/
    /*Opacity settings for all browsers*/
    /*opacity: 0;*/
     -moz-opacity: 0;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)
  }
</style>
<script>
  import UploadItem from 'com/pub/UploadItem'
  import Bus from 'com/bus'
  import util from 'ut/jsUtil'
  export default {
    data () {
      return {
        taskList: []  //  上传任务的taskList，每个task，包括image和file两个对象
      }
    },
    props: {
      commentState: Boolean
    },
    computed: {
      currentTodo () {
        return this.$store.state.todo.currentTodo
      },
      loginUser () {
        return this.$store.getters.loginUser || {}
      },
      corpId () {
        return this.loginUser.authUser.corpId
      },
      unionId () {
        return this.loginUser.authUser.unionId
      },
      userId () {
        return this.loginUser.authUser.userId
      },
      unfinishedTask () {
        return this.taskList.filter(t => {
          return !t.finished
        })
      }
    },
    components: {
      'r-upload-item': UploadItem
    },
    methods: {
      call () {
        this.$emit('call')
      },
      showNativeMemberEdit () {
        var that = this
        var corpId = that.loginUser.authUser.corpId
//        console.log('提取之前内容是' + JSON.stringify(this.selectedLocalList))
//        var selectedArray = util.extractProp(this.selectedLocalList, 'userId')
//        alert('提取之后内容是' + (selectedArray))
//        console.log('提取之后内容是' + (selectedArray))
//        var disabledArray = util.extractProp(this.disabledLocalList, 'userId')
//        console.log('提取之后禁止内容是' + (selectedArray))
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
//            console.log('返回来的res是' + JSON.stringify(res))
            var idArray = util.extractProp(res, 'emplId')
//            console.log('返回来的idarray是' + idArray)
//            window.rsqadmg.exec('showLoader')
            that.$store.dispatch('fetchRsqidFromUserid', {corpId: corpId, idArray: idArray})
              .then(function (idMap) {
//                window.rsqadmg.exec('hideLoader')
                var userArray = util.getMapValuePropArray(idMap)
//                  console.log('userId是' + JSON.stringify(userArray))
                var rsqIdArray = util.extractProp(userArray, 'rsqUserId') // 这里应该拿到name
                that.$emit('member-changed', rsqIdArray)
              })
          }
        })
      },
      deleteTask (task) {
        for (var i = 0; i < this.taskList.length; i++) {
          if (task.img.name === this.taskList[i].img.name) {
            this.taskList.splice(i, 1)
          }
        }
        this.$emit('remove-file-id', task.img.name)
      },
      //  显示图片的第一种方式
      addToTask (e) {
        this.$emit('showEditComment')
        var files = e.target.files
//        console.log('files是' + (files))
        if (files.length < 1) return
        if (this.unfinishedTask.length + files.length > 5) {
          window.rsqadmg.exec('alert', {message: '一次最多上传5张图片！'})
          return
        }
        for (var i = 0; i < files.length; i++) {
          var file = files[i]
          if (parseInt(file.size) > (50 * 1024 * 1024)) {
            window.rsqadmg.execute('alert', {title: '', message: '上传文件最大不能超过50M', buttonName: '确定'})
//            alert('上传文件最大不能超过50M')
          } else {
            var url = URL.createObjectURL(file)
            this.taskList.push({
              finished: false,
              isShowProgress: true,  //  刚创建未上传时显示进度条
              progress: 0,
              img: {
                name: file.name,
                src: url
              },
              file: file
            })
          }
        }
        // }
        this.triggerUpload()
      },
      //  上传
      triggerUpload () {
        if (this.unfinishedTask.length > 0) {
          this.$emit('ready-to-upload', this.unfinishedTask)
        }
        //  同时上传需要做数量控制，因此不做同时上传，只做顺序上传
        //  由于一个公司之间的文件需要共享预览，所以以corpId作为pathId
        return this.$store.dispatch('uploadToOSS', { // 这个方法有点复杂。。。看不太懂，只需要知道返回值就行了
          pathId: this.corpId,
          list: this.unfinishedTask
        }).then(res => {
//          console.log('res内容是' + JSON.stringify(res))
          // 在这里发送getfromAli
          for (var i = 0; i < res.length; i++) {
            var name = res[i].name
            this.$store.dispatch('toRsqServer', {name: name}).then(res => {
              this.$emit('get-file-id', {id: res.id, name: res.name})
              this.$emit('finish-upload')
            })
          }
        })
      },
      cancelUpload () {
        this.$store.dispatch('cancelUploadToOSS', {
          pathId: this.unionId
        }).then(() => {
          alert(1)
        })
      }
    },
    mounted () {
      Bus.$on('clearTask', () => {
        this.taskList.splice(0, this.taskList.length)
      })
    },
    beforeDestroy () {}
  }
</script>
