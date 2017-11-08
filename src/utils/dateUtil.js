import moment from 'moment'

export default {
  /**
   * date的周次偏移offset之后所在周的第一天，offset为0或者不传值表示当前周
   * @param date
   * @param offset
   * @returns {Date}
   */
  firstDayOfWeek (date, offset) {
    offset = offset || 0
    // console.log('clearTime之前的date是' + date)
    date = this.clearTime(date)
    // console.log('clearTime之后的date是' + date)
    var day = date.getDay()
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset * 7 - day)
  },
  /**
   * date的月份偏移offset之后所在月的第一天。如果需要返回date所在月份，则offset可以不传值。
   * @param date
   * @param offset
   * @returns {Date}
   */
  firstDayOfMonth (date, offset) {
    offset = offset || 0
    date = this.clearTime(date)
    var month = date.getMonth()  //  6
    var year = date.getFullYear()  //  2016
    var margin = month + offset  //  11
    var newMonth = (12 + margin % 12) % 12  //  0
    var yearAdded = Math.floor(margin / 12)

    return new Date(year + yearAdded, newMonth, 1)
  },
  /**
   * date的月份偏移offset之后所在月的最后一天，如果需要返回date所在月份，则offset可以不传值。
   * @param date
   * @param offset
   * @returns {Date}
   */
  lastDayOfMonth (date, offset) {
    offset = offset || 0
    var firstDay = this.firstDayOfMonth(this.clearTime(date), offset)
    return new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
  },
  /**
   * 清除时间，即返回当前日期的凌晨的时间
   * @param date
   * @returns {Date}
   */
  clearTime (date) {
    return new Date(date.setHours(0, 0, 0, 0))
  },
  /**
   * 判断两个date是否相同，注意不比较时间，只比较日期
   * @param date1
   * @param date2
   * @returns {boolean}
   */
  isSameDate (date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
  },
  /**
   * 获取focusDate所在周的一周的所有date
   * @param focusDate
   * @returns {Array}
   */
  getWeekDays (focusDate) {
    var firstDay = this.firstDayOfWeek(focusDate, 0)
    var fullYear = firstDay.getFullYear()
    var month = firstDay.getMonth()
    var startDate = firstDay.getDate()
    var days = []

    for (var j = 0; j < 7; j++) {
      var newDate = new Date(fullYear, month, startDate + j)
      days.push({date: newDate})
    }
    return days
  },
  /**
   * 获取focusDate所在的月包括月初所在周和月末所在周的的所有date，以二维数组的方式表示
   * options.type: single/range/discrete，分别表示单日期，日期范围，离散日期
   * options.selectNumDate: Array类型，日期的具体值。单日期则只包含一个日期元素的getTime值。日期范围则包含起止日期。离散日期则包含离散的日期元素
   * @param focusDate
   */
  getMonthDays (focusDate) {
    var arr = []
    var initDate = this.firstDayOfWeek(this.firstDayOfMonth(focusDate))

    var end = false
    while (!end) {
      var weekArr = []
      var year = initDate.getFullYear()
      var month = initDate.getMonth()
      var date = initDate.getDate()
      for (var i = 0; i < 7; i++) {
        var thisDate = new Date(year, month, date + i)
        var obj = {
          date: thisDate,
          isFocused: this.isSameDate(focusDate, thisDate),
          isSelected: false,
          isInMonth: thisDate.getMonth() === focusDate.getMonth()
        }

        weekArr.push(obj)
      }
      arr.push(weekArr)

      initDate = new Date(year, month, date + 7)
      if (initDate.getMonth() !== focusDate.getMonth()) {
        end = true
      }
    }
    return arr
  },
  /**
   * 格式化输出日期
   * single类型：直接输出arr中的单日期，如“xx月xx日”
   * discrete类型：输出多个日期，并以“ ”空格分隔
   * range类型，输出两个日期，以“-”分隔
   * @param type
   * @param arr
   */
  formatDateDisplay (type, arr) {
    if (!type || !arr) {
      return ''
    }
    var funFormat = mills => {
      var d = new Date(mills)
      return (d.getMonth() + 1) + '月' + (d.getDate()) + '日'
    }
    switch (type) {
      case 'single':
      case 'discrete':
        return arr.map(funFormat).join(' ')
      case 'range':
        return arr.map(funFormat).join('-')
      default:
        return ''
    }
  },
  dateText2Num (text) {
    text = text.replace(/[-/]/g, '')
    var year = parseInt(text.substr(0, 4))
    var month = parseInt(text.substr(4, 2)) - 1
    var day = parseInt(text.substr(6, 2))
    // return '' + year + month + day
    var date = new Date(year, month, day)
    return date.getTime()
  },
  dateNum2Text (num, sep) {
    sep = sep || ''
    var date = new Date(num)
    return date.getFullYear() + sep + (this.padLeft(date.getMonth() + 1)) + sep + (this.padLeft(date.getDate()))
  },
  padLeft (num) {
    return (num > 9 ? '' : '0') + num
  },
  /**
   * 转换方法，将后台的dates/itemStartDate/itemEndDate的数据结构转换成前台的type selectDateArray的数据结构
   * 新增type为'repeat'类型
   * repeatParams.repeatType
   * repeatParams.repeatBaseTime
   * 返回值如下：
   */
  backend2frontend ({dates, startDate, endDate, isCloseRepeat, repeatType, repeatBaseTime}) {
    var type, arr
    if (!isCloseRepeat && repeatType) {
      type = 'repeat'
      arr = repeatBaseTime.split(',').map(this.dateText2Num)
    } else if (dates) {
      type = 'discrete'
      arr = dates.split(',').map(this.dateText2Num)
    } else if (startDate && endDate) {
      if (startDate === endDate) {
        type = 'single'
        arr = [this.dateText2Num(startDate)]
      } else {
        type = 'range'
        arr = [
          this.dateText2Num(startDate),
          this.dateText2Num(endDate)
        ]
      }
    } else {
      type = null
      arr = null
    }
    return {
      dateType: type,
      repeatType: repeatType,
      dateResult: arr,
      currentDate: arr ? new Date(arr[0]) : null
    }
  },
  /**
   * 判断dateNum是否在dateStruct选择的日期范围内，逻辑如下：
   * dateStruct.dateType为null：如果dateNum为0，则表示在范围内，其他值均不在范围内
   * dateStruct.dateType为single：如果dateNum等于dateStruct.dateResult中的任意值，则返回true
   * dateStruct.dateType为discrete：如果dateNum等于dateStruct.dateResult中的任意值，则返回true
   * dateStruct.dateType为range：如果dateNum大于等于dateStruct.dateResult[0]同时小于等于dateStruct.dateResult[1]，则返回true
   * @param dateNum
   * @param dateStruct
   */
  isInDateStruct (dateNum, dateStruct) {
    if (dateStruct.dateType == null) {
      return dateNum === 0
    }
    if (dateStruct.dateType === 'range') {
      return dateNum >= dateStruct.dateResult[0] && dateNum <= dateStruct.dateResult[1]
    }
    if (dateStruct.dateType === 'single' || dateStruct.dateType === 'discrete') {
      for (var i = 0; i < dateStruct.dateResult.length; i++) {
        if (dateNum === dateStruct.dateResult[i]) {
          return true
        }
      }
      return false
    }
  },
  /**
   * 转换方法，将前台的type/selectDateArray的格式转换为后台的dates/itemStartDate/itemEndDate格式
   */
  frontend2backend ({dateType, dateResult, repeatType, sep}) {
    if (dateType === 'none' || dateResult.length === 0) {
      dateType = ''
    }
    sep = sep || '/'
    var result
    switch (dateType) {
      case 'repeat'://  repeat类型，默认startDate和endDate与single相同
        // console.log(dateResult.length)
        if (dateResult.length === 0) {
          var dateText = this.dateNum2Text(new Date().getTime(), sep)
        } else {
          dateText = this.dateNum2Text(dateResult[0], sep)
        }
        result = {dates: null, startDate: dateText, endDate: dateText}
        break
      case 'single':
        var singleText = this.dateNum2Text(dateResult[0], sep)
        result = {dates: null, startDate: singleText, endDate: singleText}
        break
      case 'discrete':
        var that = this
        var joinText = dateResult.map(val => {
          return that.dateNum2Text(val)
        }).join(',')
        result = {dates: joinText, startDate: null, endDate: null}
        break
      case 'range':
        result = {dates: null, startDate: this.dateNum2Text(dateResult[0], sep), endDate: this.dateNum2Text(dateResult[1], sep)}
        break
      default:
        result = {dates: null, startDate: null, endDate: null}
        break
    }
    return result
  },
  monthName (date) {
    var array = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    return array[date.getMonth()]
  },
  dayName (date) {
    var index = date
    if (date instanceof Date) {
      index = date.getDay()
    }
    var array = ['日', '一', '二', '三', '四', '五', '六']
    return array[index]
  },
  repeatCycleName (code) {
    var map = {
      noRepeat: '不重复',
      userRepeat: '自定义重复',
      everyDay: '每天重复',
      everyWeek: '每周重复',
      everyMonth: '每月重复',
      everyYear: '每年重复',
      weekday: '工作日重复（周一至周五）'
    }
    return map[code]
  },
  /**
   * 将todo设置的重复转换成文字描述
   * @param type：重复类型："everyDay", "everyWeek", "everyMonth", "everyYear"
   * @param baseTimeArr, 重复的时间值组成的数组，以字符串表示"20170931"
   */
  repeatDayText (type, baseTimeArr) {
    var text
    switch (type) {
      case 'everyDay':
        text = '每天'
        break
      case 'everyWeek':
        text = '每周' + baseTimeArr.map(val => {
          const mills = this.dateText2Num(val)
          return this.dayName(new Date(mills))
        }).join('、')
        break
      case 'everyMonth':
        text = '每月' + baseTimeArr.map(val => {
          return val.substr(6, 2)
        }).join('、') + '日'
        break
      case 'everyYear':
        text = '每年' + baseTimeArr.map(val => {
          const d = new Date(this.dateText2Num(val))
          return (d.getMonth() + 1) + '月' + d.getDate() + '号'
        }).join('、')
        break
      default:
        text = ''
        break
    }
    return text
  },
  /**
   * 将重复及日期转换为显示的文字
   * @param t
   */
  repeatDate2Text (t) {
    if (!t.dates && !t.startDate && !t.endDate) {
      return ''
    }
    var parsed = this.backend2frontend({
      dates: t.dates,
      startDate: t.startDate,
      endDate: t.endDate,
      isCloseRepeat: t.isCloseRepeat,
      repeatType: t.repeatType,
      repeatBaseTime: t.repeatBaseTime
    })
    var result
    // console.log('parsed是' + JSON.stringify(parsed))
    if (parsed.dateType === 'repeat') {
      result = this.repeatDayText(t.repeatType, t.repeatBaseTime.split(','))
      if (t.isLastDate) {
        result += ',最后一天'
      }
      result += '重复'
    } else {
      result = this.formatDateDisplay(parsed.dateType, parsed.dateResult)
    }
    return result
  },
  /**
   * 获取延期日期的方法，由大磊哥帮助提供
   * @param model
   * @param atDate
   * @param inWindow
   * @returns {*}
   */
  getDelayDays (model, atDate, inWindow) { // YYYYMMDD
    const dates = model['dates']
    const today = moment().format('YYYYMMDD')
    const fd = model['pFinishedTime'] ? moment(model['pFinishedTime'], 'YYYY-MM-DD').format('YYYYMMDD') : null
    let endDate = model['endDate']
    if (model['isRepeatTodo']) {
      return false
    }
    if (!model['pIsDone']) {
      if (atDate !== today) {
        return false
      }
    } else {
      if (!inWindow) {
        return false
      }
    }
    if (dates) { // 离散日期
      const args = dates.split(',')
      const lastDateStr = args[args.length - 1]
      endDate = moment(lastDateStr, 'YYYY/MM/DD').format('YYYYMMDD')
    } else {
      endDate = endDate ? moment(endDate, 'YYYY-MM-DD').format('YYYYMMDD') : null
    }
    if (!endDate) {
      return false
    }
    if (!model['pIsDone']) {
      if (endDate < today) {
        return moment(today, 'YYYYMMDD').diff(moment(endDate, 'YYYYMMDD'), 'days')
      } else {
        return false
      }
    } else {
      if (endDate < fd) {
        return moment(fd, 'YYYYMMDD').diff(moment(endDate, 'YYYYMMDD'), 'days')
      } else {
        return false
      }
    }
  },
  getStandardTime (date) {
    // console.log('进来DATe是' + date)
    var str = ''
    var year = date.getFullYear()
    if (date.getMonth() + 1 >= 10) {
      var month = date.getMonth() + 1
    } else {
      month = '0' + (date.getMonth() + 1)
    }
    var day = date.getDate()
    if (day < 10) {
      day = '0' + day
    }
    // console.log('出来DATe是' + year + month + day)
    return str + year + month + day
  }
}
