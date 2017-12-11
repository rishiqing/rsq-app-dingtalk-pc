<template>
  <div>
    <div class="fixed-view" style="background:#fff;z-index:999;" transition="expand">
      <div class="itm-outer">
        <div class="itm-inner">
          <div class="itm-title u-padding-left-40">
            <input type="text" placeholder="请输入名称进行搜索" v-model="memberName">
          </div>
          <div class="itm-icons itm-front-icons u-abs-left">
            <i class="icon icon-search"></i>
          </div>
        </div>
      </div>
      <ul class="itm-lst">
        <li class="kb-item u-cf"
            v-for="staff in filteredUsers" :key="staff.id">
          <div class="clickable itm-outer">
            <div class="itm-inner" @click="toggleSelect(staff)">
              <div class="itm-title u-padding-left-60">{{staff.name}}</div>
              <div class="itm-icons u-abs-left">
                <div class="itm-icon-img-wrap">
                  <avatar :src="staff.avatar"
                          :username="staff.name"></avatar>
                </div>
                <!--<img class="itm-icon-img" :src="staff.avatar" />-->
              </div>
              <div class="itm-icons u-abs-right">
                <i class="icon icon-check is-active" v-show="staff.isSelected"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div style="padding-bottom: 150px;"></div>
    </div>
    <div class="" style="position: fixed;bottom:0;left:0;right:0;padding:10px 0;background:#fff;z-index:9999;">
      <div class="itm-outer itm--trans-bg">
        <div class="itm-inner">
          <div tag="input" class="edt-todo-submit u-full-width btnConfirm" type="button" :value="btnText"
                   @click="confirmSelect"/>
        </div>
      </div>
      <div class="itm-outer itm--trans-bg">
        <div class="itm-inner">
          <div tag="input" class="btn-default u-full-width btnCancel" type="button" value="取消"
                   @click="selfClose"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  fixed-view {
    z-index:100;

  }
  .expand-transition {
    transition: all .3s ease;
  }
  .expand-enter {
    transform: translateY(100%);
  }
  .expand-leave {
    transform: translateY(100%);
  }
</style>
<script>
  import Avatar from 'com/pub/TextAvatar'

  export default{
    data () {
      return {
        btnText: '',
        maximum: 0,    //  最多选择的用户数量
        memberList: [],    //  所有用户的列表
        selectedList: [],  //  默认选中的用户列表
        disabledIdList: [],  //  不可更改选择状态的用户id列表
        success: function () {},  //  点击确定按钮的回调
        cancel: function () {},  //  点击取消按钮的回调
        localList: [],
        memberName: '',
        selectCount: 0
      }
    },
    computed: {
      filteredUsers () {
        var self = this
        return self.localList.filter(function (staff) {
          return staff.name.indexOf(self.memberName) !== -1
        })
      }
    },
    components: {
      'avatar': Avatar
    },
    methods: {
      selfClose (e) {
        window.onpopstate = null
        this.cancel()
        this.$emit('self-close')
        e.preventDefault()
      },
      makeLocalList () {
        var selectIds = this.selectedList.map(function (obj) {
          return obj.userId
        })
        var ct = 0
        var list = this.memberList.map(function (mem) {
          var isSelect = (selectIds.indexOf(mem.userId) !== -1)
          if (isSelect) {
            ct += 1
          }
          return {
            id: mem.userId,
            isSelected: isSelect,
            name: mem.name,
            avatar: mem.avatar,
            orgUser: mem
          }
        })
        this.selectCount = ct
        return list
      },
      toggleSelect (mem) {
        if (this.disabledIdList.indexOf(mem.id) !== -1) {
          return
        }
        var c = this.selectCount + (mem.isSelected ? -1 : 1)
        if (c >= this.maximum || c < 0) {
          return window.rsqadmg.exec('alert', {message: '超出最大数量限制'})
        }
        this.selectCount = c
        mem.isSelected = !mem.isSelected
      },
      confirmSelect (e) {
        var arr = []
        this.localList.forEach(function (mem) {
          if (mem.isSelected) {
            arr.push(mem.orgUser)
          }
        })
        this.success(arr)
        this.selfClose()
        e.preventDefault()
      }
    },
    attached () {
      this.localList = this.makeLocalList()
      var that = this
      //  如果通过任意方式跳出页面了，那么关闭当前选择框
      window.onpopstate = function () {
        that.selfClose()
      }
    }
  }
</script>
