<template>
  <div class="wrap-member" @click="showWebMemberEdit">
    <i class="icon2-member member-icon"></i>
    <span class="member">执行人</span>
    <!--<span class="now" :class="{'edit-padding-left':editTime,'new-padding-right':newItem}">{{timeValue}}</span>-->
  </div>
</template>
<style>
  .member-icon{
    font-size: 14px;
  }
  .member{
    font-size: 12px;
  }
  .wrap-member{
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:1px solid gray ;
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
      loginUser () {
        return this.$store.getters.loginUser
      },
      selectedItems () {
        return this.selectedLocalList.slice(this.selectedLocalList.length - 3)
      },
      nameConcat () {
        return this.selectedLocalList.map(function (o) {
          return o.name
        }).join('、')
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
        if (!ids || ids.length === 0) {
          this[targetListName] = []
          return Promise.resolve()
        }
        var corpId = this.loginUser.authUser.corpId
        //  暂时去掉loader
//        window.rsqadmg.exec('showLoader')
        return this.$store.dispatch('fetchUseridFromRsqid', {corpId: corpId, idArray: ids})
          .then(idMap => {
            this[targetListName] = util.getMapValuePropArray(idMap)
//            window.rsqadmg.exec('hideLoader')
          })
      }
    }
  }
</script>
