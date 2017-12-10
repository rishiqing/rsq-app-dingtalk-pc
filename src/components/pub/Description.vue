<template>
  <div>
    <div id="noteEditable" contenteditable="true" class="desp editor-style"
         ref="description"
         name="note" rows="5"
         placeholder="添加任务描述..."
         @focus="inputFocus"
         @input="inputChange"
         @blur="postDesp"
        >
      添加任务描述...
    </div>
    <!--<div v-show="this.despState">-->
      <!--<button @click="postDesp">确定</button>-->
      <!--<button @click="hideButton">取消</button>-->
    <!--</div>-->
  </div>
</template>
<style>
  button{
    font-size: 15px;
  }
  .desp{
    line-height: 36px;
    padding-left: 15px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #666666;
  }
</style>
<script>
  export default {
    name: 'desp',
    // 定义数据
    data () {
      return {
        noteChangeTimes: 0,  // 用来标记note变化的次数，只有第一次改变的时候才被watch监控
        DEFAULT_NOTE: this.pNote,
        isBlank: true,    // 标记是否为空
        despState: false
      }
    },
    computed: {
      pNote () {
        return this.$store.state.todo.currentTodo.pNote
      },
      oldPNote () {
        return this.$store.state.todo.currentTodo.pNote
      },
      id () {
        return this.$store.state.todo.currentTodo.id
      },
      subtodos () {
        return this.$store.state.todo.currentTodo.subTodos
      },
      title () {
        return this.$store.state.todo.currentTodo.pTitle
      }
    }, // 定义事件
    methods: {
      hideButton () {
        this.despState = false
        this.$refs.description.innerText = this.pNote
      },
      postDesp () {
//        console.log('post进俩了')
        var noteElement = document.getElementById('noteEditable').innerHTML
        var params = {pNote: noteElement}
        params['id'] = this.id
        params['oldPNote'] = this.oldPNote
        params['oldPTitle'] = this.title
        params['subtodo'] = this.subtodos
        this.$store.dispatch('postdesp', params).then(() => {
          if (!noteElement) {
            document.getElementById('noteEditable').innerHTML = '添加任务描述...'
          }
          this.despState = false
          this.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED', params)
        })
      },
      inputFocus () {
//        console.log('进来了inputFocus')
        if (this.isBlank) {
          this.despState = true
          var noteElement = document.getElementById('noteEditable')
//          console.log(noteElement.innerText)
//          console.log(noteElement.innerText === '添加任务描述...')
          if (noteElement.innerText === '添加任务描述...') {
            noteElement.innerHTML = ''
          }
//          this.isBlank = false
        }
      },
      inputChange () {
//        console.log('进来了inputChange')
        var noteElement = document.getElementById('noteEditable')
        this.newItemNote = noteElement.innerHTML
        // this.$dispatch('text-change', this.newItemNote)
      },
      inputBlur () {
        var noteElement = document.getElementById('noteEditable')
        var inputHTML = noteElement.innerHTML
        this.newItemNote = inputHTML
        this.itemNote = this.newItemNote
        if (inputHTML) {
          this.isBlank = false
        } else {
          this.isBlank = true
          noteElement.innerHTML = this.DEFAULT_NOTE
        }
//        var that = this
        var params = {pNote: this.newItemNote}
        this.$store.dispatch('postdesp', params).then(() => {
//          that.$store.commit('TD_CURRENT_TODO_REPEAT_EDITED', params)
        })
      }
//      blur (value) {
//        // 向服务器发送请求
//        console.log(value)
//      }
    },
    watch: {
      'itemNote': function (newValue) {
        if (typeof newValue === 'undefined') {
          return
        }
        if (this.noteChangeTimes === 0 && newValue) {
          this.noteChangeTimes += 1
          var noteElement = document.getElementById('noteEditable')
          this.newItemNote = newValue
          noteElement.innerHTML = newValue
          this.isBlank = false
        }
      }
    },
    mounted () {
      var noteElement = document.getElementById('noteEditable')
      if (this.pNote) {
        noteElement.innerHTML = this.pNote
      }
    }
  }
</script>

