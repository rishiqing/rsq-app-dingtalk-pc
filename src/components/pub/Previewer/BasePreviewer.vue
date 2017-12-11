<template>
  <div class="preview">
    <div class="preview-mask"></div>
    <div class="preview-head">
      <div class="preview-title">{{fileName}}</div>
      <i class="icon2-error deleteComent preview-close" @click="closePreview"></i>
    </div>
    <div class="preview-img-wrap" v-show="previewImage.id">
      <img class="preview-img"
           ref="photo"
           :src="previewImage.realPath"
           :alt="fileName"
           @mousewheel="bbimg($event)"
      >
    </div>
    <div class="preview-file-wrap" v-show="previewFile.id">
      <iframe class="preview-file" :src="fileFramePath" frameborder="0"></iframe>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .preview {}
  .preview-mask {position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.9);opacity: 0.8;z-index:1500;}
  .preview-head {position: fixed;top: 0;left: 0;width: 100%;overflow:hidden;
    text-align: center;cursor: default;background: rgba(0,0,0,.86);z-index: 1530;}
  .preview-close {
    position:fixed;
    /*width: 0.7rem;*/
    border-radius: 50%;
    /*line-height: 0.65rem;*/
    top: 0.45rem;
    right: 0.35rem;
    font-size: 22px;
    color: #fff;
    background: #000;
    /*padding-bottom: 0.1rem;*/
    /*padding-left: 0.04rem;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  .preview-title {text-align:center;width: 80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#fff;
    margin:0 auto;font-size: 16px;height:1.5rem;line-height:1.5rem;}
  .preview-img-wrap {
    position:fixed;
    left:10%;
    top:1.5rem;
    right:10%;
    bottom:1.5rem;
    z-index:1520;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .preview-img {
    display:block;
    position:relative;
    /*width: 100%;*/
    z-index: 1521;
  }
  .preview-file-wrap {position:fixed;left:0%;top:1.5rem;right:0%;bottom:0rem;overflow:scroll;z-index:1520;
    -webkit-overflow-scrolling:touch;}
  .preview-file {display:block;position:relative;width: 100%;height:100%;z-index: 1521;}
</style>
<script>
  export default {
    data () {
      return {
        isShow: false,
        previewImage: {},
        previewFile: {}
      }
    },
    computed: {
      fileName () {
        var file = this.previewImage.id ? this.previewImage : this.previewFile
        if (!file.name) return ''
        var arr = file.name.split('/')
        return arr[arr.length - 1].substr(14)
      },
      fileFramePath () {
        if (!this.previewFile.id) return ''
        return 'https://ow365.cn/?i=3169&furl=' + this.previewFile.realPath
      }
    },
    methods: {
      bbimg (event) {
//        var photo = document.getElementsByClassName('preview-img')[0]
        var photo = this.$refs.photo
        var zoom = parseInt(photo.style.zoom, 10) || 100
        zoom += event.wheelDelta / 12
        if (zoom > 0) photo.style.zoom = zoom + '%'
        return false
      },
      closePreview (e) {
        this.previewImage = {}
        this.previewFile = {}
        this.$emit('self-close')
        e.preventDefault()
      },
      showFilePage (f) {
        window.dd.biz.util.openLink({
          url: 'https://ow365.cn/?i=3169&furl=' + f.realPath,  //  要打开链接的地址
          onSuccess: function (result) {
          },
          onFail: function () {}
        })
      }
    },
    mounted () {
      var that = this
      //  如果通过任意方式跳出页面了，那么关闭当前选择框
      window.onpopstate = function () {
        that.closePreview()
      }
    }
  }
</script>
