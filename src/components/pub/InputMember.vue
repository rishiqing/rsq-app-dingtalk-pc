<template>
  <div class="wrap-member">
    <i class="icon2-member member-icon"></i>
    <span class="member margin-detail">执行人</span>
    <div class="wrap-member-name margin-detail font-style">
      <span @click="showNativeMemberEdit($event)">{{nameConcat}}</span>
    </div>
    <i class="icon2-add-circle create-icon add-member" @click="showNativeMemberEdit($event)" ></i>
    <!--<img src="../../assets/h.png"  @click="showNativeMemberEdit($event)" class="add-member">-->
  </div>
</template>
<style>
  .create-icon{
    cursor:pointer;
    /*width: 20.8px;*/
    /*height: 20.8px;*/
    font-size: 20px;
    color: #D4D8DC
  }
  .create-icon:hover{
    color: #5EADFD;
  }
  .wrap-member-name{
    max-width: 500px;
    cursor:pointer;
  }
  .add-member{
    width: 22px;
    height: 22px;
    margin-left: 10px;
  }
  .member-icon{
    font-size: 14px;
  }
  .member{
    font-size: 13px;
    font-family: PingFangSC-Regular;
    color: #B1B1B1;
  }
  .wrap-member{
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:0.5px solid #EAEAEA ;
  }

</style>
<script>
  import { Promise } from 'es6-promise'
  import util from 'ut/jsUtil'
  import SelectMember from 'com/pub/SelectMember'
  export default {
    data () {
      return {
        localList: [],  //  人员选择列表
        selectedLocalList: [],  //  已选择的人员选择列表
        disabledLocalList: []  //  本地禁用的人员列表
      }
    },
    props: {
      disabled: Boolean,
      isNative: Boolean,  //  是否使用钉钉应用本地的选择框
      indexTitle: String,
      selectTitle: String,
      userRsqIds: Array,    //  可选人
      selectedRsqIds: Array,  //  当前选中的人
      disabledRsqIds: Array //  不可选的人
    },
    computed: {
      nameConcat () {
        if (this.selectedLocalList.length <= 3) {
          return this.selectedLocalList.map(function (o) {
            return o.name
          }).join('、')
        } else {
          return this.selectedLocalList.slice(0, 4).map(function (o) {
            return o.name
          }).join('、') + '等' + this.selectedLocalList.length + '人'
        }
      },
      loginUser () {
        return this.$store.getters.loginUser
      },
      selectedItems () {
        return this.selectedLocalList.slice(this.selectedLocalList.length - 3)
      },
      memberCount () {
        return this.selectedLocalList.length <= 3
      },
      newMemberlessThree () {
        return this.newTime && this.memberCount
      },
      newMemberMoreThree () {
        return this.newTime && !this.memberCount
      }
    },
    watch: {
      userRsqIds (ids) {
        this.fetchUserIds(ids, 'localList')
      },
      selectedRsqIds (ids) {
        this.fetchUserIds(ids, 'selectedLocalList')
      },
      disabledRsqIds (ids) {
        this.fetchUserIds(ids, 'disabledLocalList')
      }
    },
    methods: {
      showMemberEdit (e) {
        if (this.disabled) {
          window.rsqadmg.execute('topTips', {message: '过去的任务不能编辑'})
          return
        }
        return this.isNative ? this.showNativeMemberEdit(e) : this.showWebMemberEdit(e)
      },
      showNativeMemberEdit () {
        var that = this
        var corpId = that.loginUser.authUser.corpId
//        console.log('提取之前内容是' + JSON.stringify(this.selectedLocalList))
        var selectedArray = util.extractProp(this.selectedLocalList, 'userId')
//        alert('提取之后内容是' + (selectedArray))
//        console.log('提取之后内容是' + (selectedArray))
        var disabledArray = util.extractProp(this.disabledLocalList, 'userId')
//        console.log('提取之后禁止内容是' + (selectedArray))
        window.rsqadmg.exec('selectDeptMember', {
          btnText: '确定',  //  选择器按钮文本，pc端需要的参数
          multiple: true, //  默认false，选择单人
          title: that.selectTitle, //  选择器标题，pc端需要的参数
          corpId: corpId,  //  加密的企业 ID，
          selectedIds: selectedArray,
          disabledIds: disabledArray || [], //  不能选的人
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
                var rsqIdArray = util.extractProp(userArray, 'rsqUserId')
                that.$emit('member-changed', rsqIdArray)
              })
          }
        })
      },
      showWebMemberEdit () {
        // 显示之前先将所有获得焦点的元素失去焦点
        if (document.activeElement) {
          document.activeElement.blur()
        }
        var that = this
        var corpId = that.loginUser.authUser.corpId
        SelectMember.show({
          memberList: this.localList,
          selectedList: this.selectedLocalList,
          disabledIdList: this.disabledLocalList,
          success (selList) {
            var idArray = util.extractProp(selList, 'emplId')
            that.$store.dispatch('fetchRsqidFromUserid', {corpId: corpId, idArray: idArray})
              .then(function (idMap) {
                that.selectedLocalList = util.getMapValuePropArray(idMap)
                that.$emit('member-changed', that.selectedLocalList)
              })
          },
          cancel () {
          }
        })
      },
      fetchUserIds (ids, targetListName) {
//        console.log('ids' + ids + Array.isArray(ids))
        if (!ids || ids.length === 0) {
          this[targetListName] = []
          return Promise.resolve()
        }
        var corpId = this.loginUser.authUser.corpId
        //  暂时去掉loader
//        window.rsqadmg.exec('showLoader')
        return this.$store.dispatch('fetchUseridFromRsqid', {corpId: corpId, idArray: ids})
          .then(idMap => {
//            console.log('----%o', idMap)
            this[targetListName] = util.getMapValuePropArray(idMap)
//            console.log('this.selectedLocalList' + JSON.stringify(this[targetListName]))
//            window.rsqadmg.exec('hideLoader')
          })
      }
    },
    mounted () {
//      console.log('传过来的选人id' + (this.selectedRsqIds))
//      this.fetchUserIds(this.selectedRsqIds, 'selectedLocalList')
    }
  }
</script>
