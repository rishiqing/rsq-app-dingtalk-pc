<template>
  <div class="wrap-priority" @click="changeMenuState">
    <i class="icon2-four-quadrant priority-icon"></i>
    <span class="priority">优先级</span>
    <span class="section-name">{{sectionName}}</span>
    <ul class="priority-menu" v-show="this.menuState">
      <li class="priority-name" @click="changeSection($event)">
        <span class="section-name">重要紧急</span>
        <i class="icon2-selected select" v-show="this.sectionName === '重要紧急'"></i>
      </li>
      <li class="priority-name" @click="changeSection($event)">
        <span class="section-name">重要不紧急</span>
        <i class="icon2-selected select" v-show="this.sectionName === '不重要紧急'"></i>
      </li>
      <li class="priority-name" @click="changeSection($event)">
        <span class="section-name">不重要紧急</span>
        <i class="icon2-selected select" v-show="this.sectionName === '重要不紧急'"></i>
      </li>
      <li class="priority-name" @click="changeSection($event)">
        <span class="section-name">不重要不紧急</span>
        <i class="icon2-selected select" v-show="this.sectionName === '不重要不紧急'"></i>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .priority-menu{
    /*position: absolute;*/
    width: 100px;
    top:0;
    left:0;
    right: 0;
    margin: 0;
    list-style: none;
  }
  .priority-name{
    height: 20px;
  }
  .section-name {
    font-size: 12px;
    margin-left: 15px;
  }
  .select,.priority-icon{
    font-size: 14px;
  }
  .priority{
    font-size: 12px;

  }
  .wrap-priority{
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;
    background-color: white;
    padding-left: 15px;
    border-bottom:1px solid gray ;
    cursor: pointer;
  }

</style>
<script>
  export default {
    data () {
      return {
        menuState: false
      }
    },
    computed: {
      sectionName () {
        if (this.item.pContainer === 'IE') {
          return '重要紧急'
        } else if (this.item.pContainer === 'UE') {
          return '重要不紧急'
        } else if (this.item.pContainer === 'IU') {
          return '不重要紧急'
        } else if (this.item.pContainer === 'UU') {
          return '不重要不紧急'
        }
      }
    },
    props: {
      newCheckable: Boolean,
      isCheckable: Boolean,
      itemTitle: String,
      itemChecked: Boolean,
      disabled: Boolean,
      isEdit: Boolean,
      item: Object
    },
    methods: {
      changeSection (e) {
        if (e.target.innerText === '重要紧急') {
          var pContainer = 'IE'
        } else if (e.target.innerText === '不重要紧急') {
          pContainer = 'IU'
        } else if (e.target.innerText === '重要不紧急') {
          pContainer = 'UE'
        } else if (e.target.innerText === '不重要不紧急') {
          pContainer = 'UU'
        }
        this.$store.dispatch('changePriority', {id: this.item.id, pContainer: pContainer}).then(
          () => {
          }
        )
//        console.log(e.target)
      },
      changeMenuState () {
        this.menuState = !this.menuState
      },
      changeItemTitle (value, e) {
        this.$emit('changeTitle', value, e)
      },
      IsDisabled (e) {
        if (this.disabled) {
          e.target.blur()
          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
        }
      },
      inputBlur (value) {
        this.$emit('text-blur', value)
      },
      inputChange (value) {
        this.$emit('text-change', value)
      },
      clickCheckOut () {
        if (this.disabled) {
          window.rsqadmg.execute('toast', {message: '过去的任务不能编辑'})
          return
        }
        this.$emit('click-checkout', !this.itemChecked)
      }
    }
  }
</script>
