<template>
  <li class="list" :class="{ 'isDisplay': !more}">
      <div v-if="item.type==9" class="comentrecord">
        <i class="icon-description icon"></i>
        <span class="content">{{item.commentContent}}</span>
        <div class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</div>
        <p class="child-item">{{item.idOrContent}}</p>
      </div>
      <div v-else>
        <div v-if="item.type==5" class="comentrecord">
          <i class="icon-check icon"></i>
          <span class="content">{{item.commentContent}}</span>
          <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
        </div>
        <div v-else>
          <div v-if="item.type==7" class="comentrecord">
            <i class="icon-format_list_bulleted icon"></i>
            <span class="content">{{item.commentContent}}</span>
            <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
            <p class="child-item">{{item.idOrContent}}</p>
          </div>
          <div v-else>
            <div v-if="item.type==17" class="comentrecord">
              <i class="icon-format_list_bulleted icon"></i>
              <span class="content">{{item.commentContent}}</span>
              <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
            </div>
            <div v-else>
              <div v-if="item.type==10" class="comentrecord">
               <i class="icon-format_list_bulleted icon"></i>
                <span class="content">{{item.commentContent}}</span>
                <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
              </div>
              <div v-else>
                <div v-if="item.type==8" class="comentrecord">
                 <i class="icon-description icon"></i>
                  <span class="content">{{item.commentContent}}</span>
                  <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                  <p class="child-item">{{item.idOrContent.substring(3,item.idOrContent.length-4)}}</p>
                </div>
                <div v-else>
                  <div v-if="item.type==1" class="comentrecord">
                    <i class="icon-add_circle icon"></i>
                    <span class="content">{{item.commentContent}}</span>
                    <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                  </div>
                  <div v-else>
                    <div v-if="item.type==6" class="comentrecord">
                      <i class="icon-check_box_outline_blank icon"></i>
                      <span class="content">{{item.commentContent}}</span>
                      <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                    </div>
                    <div v-else>
                      <div v-if="item.type==2" class="comentrecord">
                        <i class="icon-insert_invitation icon"></i>
                        <span class="content">{{item.commentContent}}</span>
                        <span class="time">{{item.dateCreated.substring(5,7)}}月{{item.dateCreated.substring(8,16)}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </li>
</template>
<style scoped>
  .list{
    display: flex;
    align-items: center;
    line-height: 0.7rem;
    border-bottom: none;
    margin-top:10px;
    /*padding-left: 0.4rem;*/
  }
  .comentrecord{
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 20px;
    flex-wrap: wrap;
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
    /*width: 30px;*/
    /*text-align: left;*/
    /*font-size: 16px;*/
    /*color:#ACACAC;*/
  }
  .time{
    font-size: 10px;
    color:#999999;
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
