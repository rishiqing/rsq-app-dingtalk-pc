export default {
  /**
   * 环境变量
   */
  env: {
    // version: {name: 'rsq-app-version', value: window.rsqConfig.version},
    //  是否在页面上添加nav元素，只有当页面添加了nav元素，且isShowNav为true的时候才会显示nav
    isAddNav: false,
    isShowNav: false,
    //  是否显示引导页
    isShowGuide: false
  },
  /**
   * 默认字段设置
   */
  defaultValue: {},
  /**
   * 系统使用到的model
   */
  sys: {
    //  当前路由的路径
    currentPath: ''
    // appId: window.rsqadmg.store.app.appid
  },
  /**
   * 当前登录的用户，基本结构如下：
   * {
   *   rsqUser: {},  日事清相关的用户数据
   *   appUser: {}  第三方用户信息
   * }
   */
  loginUser: null,
  /**
   * 公司成员相关
   */
  staff: {
    //  公司成员的主列表，注意只有当公司人员发生变动的情况下才修改此列表
    list: null
  },
  /**
   *  收纳箱页面基础数据结构
   */
  inbox: {
    //  收纳箱日程列表
    items: null
  },
  /**
   * 日程页面基础数据结构
   */
  schedule: {
    //  当前日历选中的日期
    strCurrentDate: null,
    //  当前的日程列表
    items: null,
    //   { id: 1,
    //     pTitle: '哈哈',
    //     pIsDone: false,
    //     pContainer: 'UE',
    //     date: 26,
    //     pNote: '',
    //     subTodos: [
    //     {id: 11, name: '妇女我发呢我', pIsDone: false},
    //     {id: 12, name: '黑丰富', pIsDone: false},
    //     {id: 13, name: '粉丝分his', pIsDone: true},
    //     {id: 17, name: '突然好痛', pIsDone: true}
    //     ],
    //     comments: [
    //       {id: 1212, commentContent: '尔特人', type: 0},
    //       {id: 1232, commentContent: '覠', type: 0}
    //     ]
    //   },
    //   {id: 2,
    //     pTitle: '我的',
    //     pIsDone: false,
    //     pContainer: 'UE',
    //     date: 26,
    //     pNote: '',
    //     subTodos: [
    //       {id: 11, name: '请问', pIsDone: false},
    //       {id: 12, name: '让他', pIsDone: false},
    //       {id: 13, name: 'ui', pIsDone: true},
    //       {id: 17, name: '不能', pIsDone: true}
    //     ]},
    //   {id: 3,
    //     pTitle: '哈哈佛山市',
    //     pIsDone: false,
    //     pContainer: 'UE',
    //     date: 26,
    //     pNote: '',
    //     subTodos: [
    //       {id: 12, name: '健康', pIsDone: false},
    //       {id: 13, name: '哦怕', pIsDone: true},
    //       {id: 17, name: '阿三', pIsDone: true}
    //     ],
    //     comments: [
    //       {id: 122, commentContent: '健康', type: 0},
    //       {id: 122, commentContent: '健康范文芳', type: 0}
    //     ]
    //   },
    //   {id: 4,
    //     pTitle: '哈哈佛山市',
    //     pIsDone: false,
    //     pContainer: 'UE',
    //     date: 26,
    //     pNote: '',
    //     subTodos: [
    //       {id: 12, name: '付个首付是健康', pIsDone: false},
    //       {id: 13, name: '额为哦怕', pIsDone: true}
    //     ],
    //     comments: [
    //       {id: 1212, commentContent: '粉色发', type: 0},
    //       {id: 1232, commentContent: '废物', type: 0}
    //     ]
    //   },
    //   {id: 6, pTitle: '还是ffdd啥', pIsDone: true, pContainer: 'IU', date: 21, subTodos: [{id: 13, name: '执行', pIsDone: true}]},
    //   {id: 7, pTitle: '还是ffdd啥', pIsDone: false, pContainer: 'IE', date: 26, subTodos: [{id: 13, name: '的v', pIsDone: true}]},
    //   {id: 8, pTitle: '还范德萨vddsffsrgsfds是ffdd啥', pIsDone: true, pContainer: 'IE', date: 26, subTodos: []},
    //   {id: 4, pTitle: '还是发送方式ffdd啥', pIsDone: false, pContainer: 'UU', date: 26, subTodos: []},
    //   {id: 4, pTitle: '还是郭德纲的啥', pIsDone: false, pContainer: 'UU', date: 26, subTodos: []}
    // ],
    titleArray: [
      {重要紧急: '重要紧急'},
      {重要不紧急: '重要不紧急'},
      {不重要紧急: '不重要紧急'},
      {不重要不紧急: '不重要不紧急'}
    ]
  },
  /**
   * 日程与收纳箱公共的数据对象
   */
  todo: {
    // 当前的todoItem，可能是收纳箱中的，也可能是日程中的
    currentTodo: {
      subTodos: [
        // {id: 11, name: '妇女我发呢我', pIsDone: false},
        // {id: 12, name: '黑丰富', pIsDone: false},
        // {id: 13, name: '粉丝分his', pIsDone: true},
        // {id: 17, name: '突然好痛', pIsDone: true}
      ],
      comments: []
    },
    //  用于处理重复的任务修改时，需要用户选择“仅修改当前日程”、“修改当前以及以后日程”、“修改所有重复日程”
    currentTodoRepeat: {},
    //  重复相关的字段是否修改过，目前的条件是如果title/note/subTodos修改过，认为修改过
    isRepeatFieldEdit: false
  },
  /**
   * 组件之间需要共享的临时数据
   */
  pub: {
    /**
     * 在设置提醒的时候，暂存时间页面的数据
     * {
     *   "clock":{"startTime":"15:50","endTime":"15:55","alwaysAlert":true}
     *  }
     */
    currentTodoTime: {},
    /**
     * 在设置重复的时候，暂存日期页面的数据
     * {
     *   dates: null,
     *   startDate: null,
     *   endDate: null,
     *   repeatType: null,
     *   repeatBaseTime: null
     * }
     */
    currentTodoDate: new Date(),
    month: '',
    year: ''
  },
  //  --------缓存相关--------
  /**
   * 日程缓存的列表，以日期作为key值
   */
  dateTodosCache: {},
  /**
   * openid对应的rsqid的缓存
   */
  openidCache: {},
  /**
   * rsqid对应的openid的缓存
   */
  rsqidCache: {},
  /**
   * 每一天是否含有todo的cache，以date.getTime()的Number类型作为key值，true和false作为value值
   */
  dayHasTodoCache: {},
  replyId: null,
  replyName: null
}
