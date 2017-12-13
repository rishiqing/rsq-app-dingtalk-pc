<template>
  <li class="list" :class="{ 'isDisplay': !more}">
      <template v-if="item.type==9" class="comentrecord">
        <div class="wrap-comment-record">
          <i class="icon-description icon"></i>
          <span class="content margin-detail">{{item.commentContent}}</span>
          <div class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</div>
        </div>
        <p class="child-item">{{item.idOrContent}}</p>
      </template>
      <template v-else>
        <template v-if="item.type==5" class="comentrecord">
          <div class="wrap-comment-record">
            <i class="icon-check icon"></i>
            <span class="content margin-detail">{{item.commentContent}}</span>
            <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
          </div>
        </template>
        <template v-else>
          <template v-if="item.type==7" class="comentrecord">
            <div class="wrap-comment-record">
              <i class="icon-format_list_bulleted icon"></i>
              <span class="content margin-detail">{{item.commentContent}}</span>
              <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
            </div>
            <p class="child-item">{{item.idOrContent}}</p>
          </template>
          <template v-else>
            <template v-if="item.type==17" class="comentrecord">
              <div class="wrap-comment-record">
                <i class="icon-format_list_bulleted icon"></i>
                <span class="content margin-detail">{{item.commentContent}}</span>
                <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
              </div>
            </template>
            <template v-else>
              <template v-if="item.type==10" class="comentrecord">
                <div class="wrap-comment-record">
                  <i class="icon-format_list_bulleted icon"></i>
                  <span class="content margin-detail">{{item.commentContent}}</span>
                  <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                </div>
              </template>
              <template v-else>
                <template v-if="item.type==8" class="comentrecord">
                  <div class="wrap-comment-record">
                    <i class="icon-description icon"></i>
                    <span class="content margin-detail">{{item.commentContent}}</span>
                    <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                  </div>
                  <p class="child-item">{{item.idOrContent.substring(3,item.idOrContent.length-4)}}</p>
                </template>
                <template v-else>
                  <template v-if="item.type==1" class="comentrecord">
                    <div class="wrap-comment-record">
                      <i class="icon-add_circle icon"></i>
                      <span class="content margin-detail">{{item.commentContent}}</span>
                      <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                    </div>
                  </template>
                  <template v-else>
                    <template v-if="item.type==6" class="comentrecord">
                      <div class="wrap-comment-record">
                        <i class="icon-check_box_outline_blank icon"></i>
                        <span class="content margin-detail">{{item.commentContent}}</span>
                        <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                      </div>
                    </template>
                    <template v-else>
                      <template v-if="item.type==2" class="comentrecord">
                        <div class="wrap-comment-record">
                          <i class="icon-insert_invitation icon"></i>
                          <span class="content margin-detail">{{item.commentContent}}</span>
                          <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                        </div>
                      </template>
                    </template>
                  </template>
                </template>
              </template>
            </template>
          </template>
        </template>
      </template>
  </li>
</template>
<style scoped>
  .wrap-comment-record{
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 20px;
    flex-wrap: wrap;
    position: relative;
  }
  .list{
    /*display: flex;*/
    /*align-items: center;*/
    /*line-height: 0.7rem;*/
    border-bottom: none;
    margin-top:10px;
    list-style: none;
    /*padding-left: 0.4rem;*/
  }
  .comentrecord{
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 20px;
    flex-wrap: wrap;
    position: relative;
  }
  .isDisplay{
    display: none;
  }
  .photo{
    display: inline-block;
  }
  .content,.child-item{
    color: #999999;
    font-size: 13px;
  }
  .child-item{
    margin-left: 1rem;
    margin-bottom: 0;
    background-color: lightyellow;
    width: 84%;
  }
  .content{
    margin-left: 3px;
    /*width:50px;*/
  }
  .icon{
    font-size: 14px;
    color:#8C8C8C;
    /*width: 30px;*/
    /*text-align: left;*/
    /*font-size: 16px;*/
    /*color:#ACACAC;*/
  }
  .time{
    font-size: 10px;
    color:#999999;
    position: absolute;
    right: 10px;
    top:5px;
    /*display: inline-block;*/
    /*width: 2.133rem;*/
  }
</style>
<script>
//  import Avatar from 'com/pub/TextAvatar'
  export default {
    data () {
      return {
      }
    },
    computed: {
      loginUser () {
        return this.$store.state.loginUser
      }
    },
    props: {
      item: Object,
      more: Boolean
    },
    components: {
//      'avatar': Avatar
    },
    methods: {
    }
  }
</script>
