<template>
  <li class="task-list">
    <img class="small-img" :src="previewImg" alt="task.img.name"/>
    <div class="file-name">
      <div class="word">{{task.img.name.substr(0,30)}}</div>
      <div class="file-size">{{format(uploadedSize)}}/{{format(task.file.size)}}</div>
    </div>
    <div @click="triggerDelete" class="icon-wrap">
      <i class="icon2-error delete-comment"></i>
      <span class="done-text" v-show="!task.isShowProgress">上传完成</span>
    </div>
    <div ref="progressBar" class="progress-mask" v-show="task.isShowProgress" :style="progressStyle"></div>
  </li>
</template>
<style lang="scss" scoped>
  .small-img{
    width: 27px;
    height: 27px;
  }
  .icon-wrap {
    position:absolute;top:0;right:0.5rem;bottom:0;overflow:hidden;
  }
  .icon-wrap > * {
    float: right;line-height:1.2rem;
  }
  .delete-comment {
    color: #DEDEDE;
    font-size: 18px;
    z-index:9;
  }
  .done-text {
    color: #9B9B9B;font-size: 12px;padding-right:0.3rem;
  }
  .file-name {
    font-family:AppleSystemUIFont;
    margin-left: 10px;
  }
  .word{
    font-size: 13px;
    color: #3D3D3D;
  }
  .file-size {
    font-size: 12px;color: #9B9B9B;
  }
  .task-list{
    position: relative;
    display:flex;
    align-items: center;
    border-top: 1px solid #E0E0E0;
    border-bottom: none;
    background-color: white;
    padding-left: 13px;
    height: 1.2rem;
  }
  .task-list:last-child{
    border-bottom: 1px solid #E0E0E0;
  }
  .progress-mask {
    position: absolute; top:0;bottom:0;left:0;width:1%;background: rgba(0,122,255,0.2);
    transition: transform 1s ease-in-out;
     -webkit-transition: -webkit-transform 1s ease-in-out;
    transform-origin: 0 50%;
     -webkit-transform-origin: 0 50%;
  }
</style>
<script>
  import util from 'ut/jsUtil'

  export default {
    data () {
      return {}
    },
    props: {
      task: Object
    },
    computed: {
      uploadedSize () {
        return Math.ceil(this.task.progress * this.task.file.size / 100)
      },
      progressStyle () {
        var style = 'scaleX(' + this.task.progress + ')'
        return {
          'transform': style,
          '-webkit-transform': style
        }
      },
      //  根据当前task.file的类型，判断需要显示什么样的预览图
      previewImg () {
        var type = this.task.file.type
        if (new RegExp('image/').test(type)) {
          return this.task.img.src
        } else {
          switch (type) {
            case 'application/pdf':
              return 'https://res-front-cdn.timetask.cn/beta/images/pdf.692b9767b9.png'
            case 'application/zip':
              return 'https://res-front-cdn.timetask.cn/beta/images/zip.f9f2049911.png'
            case 'application/ppt':
            case 'application/pptx':
              return 'https://res-front-cdn.timetask.cn/beta/images/ppt.2c7e64eb9b.png'
            case 'application/doc':
            case 'application/docx':
              return 'https://res-front-cdn.timetask.cn/beta/images/word.b44eea8fcf.png'
            default:
              return 'https://res-front-cdn.timetask.cn/beta/images/file.46449ccbd9.png'
          }
        }
      }
    },
    methods: {
      format (num) {
        return util.formatUnit(num)
      },
      triggerDelete () {
        this.$emit('upload-item-delete', this.task)
      },
      //  检查进度条是否需要消失
      checkProgressBar () {
        this.task.isShowProgress = (this.task.progress < 100)
      }
    },
    mounted () {
      this.$refs.progressBar.addEventListener('transitionend', this.checkProgressBar)
      this.$refs.progressBar.addEventListener('webkitTransitionEnd', this.checkProgressBar)
    },
    beforeDestroy () {
      this.$refs.progressBar.removeEventListener('transitionend', this.checkProgressBar)
      this.$refs.progressBar.addEventListener('webkitTransitionEnd', this.checkProgressBar)
    }
  }
</script>
