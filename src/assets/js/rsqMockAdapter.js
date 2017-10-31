function rsqChk(fun, p){
  if(typeof fun == 'function'){
    fun.apply(null, p);
  }
}
function rsqNvl(orgVal, defValue){
  return null === orgVal || undefined === orgVal ? defValue : orgVal;
}
function padLeft(num){
  return (num > 9 ? '' :'0') + num;
}
function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
//写cookies

function setCookie(name,value)
{
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name)
{
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

  if(arr=document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return null;
}

//删除cookies
function delCookie(name)
{
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
rsqadmg.store = {
  app: getJsonFromUrl()
};
/**
 * adapter模板
 */
rsqAdapterManager.register({
  auth: function(params){
    // var sign = {
    //   rsqUsername: 'www123@qq.com',
    //   rsqSecret: '123456'
    // };
    var sign = {
      rsqUsername: 'KGcPR_1484054002748@dingtalk.rishiqing.com',
      rsqSecret: 'YcCTVA'
    };
    rsqAdapterManager.ajax.post(rsqConfig.apiServer + 'task/j_spring_security_check', {
      j_username: sign.rsqUsername, j_password: sign.rsqSecret, _spring_security_remember_me: true
    }, function(result){
      var resJson = JSON.parse(result);
      if(resJson.success){
        rsqChk(params.success, [resJson, {}]);
      }else{
        alert('验证失败：username:' + sign.rsqUsername + ',password:' + sign.rsqSecret);
        rsqChk(params.error, [resJson]);
      }
    });
  },
  sign: function(params){
    rsqChk(params.success, []);
  },
  init: function(params){
    rsqChk(params.success, []);
  },
  log: function(params){
    console.log(params.message);
  },
  setTitle: function(params){
    document.title = params.title
  },
  setOptionButtons: function(params){
  },
  /**
   * alert提示框
   * @param params.title
   * @param params.message
   * @param params.buttonName
   * @param params.onSuccess
   * @param params.onFail
   */
  alert: function(params){
    window.alert(params.message);
  },
  /**
   * confirm提示框
   * @param params.title
   * @param params.message
   * @param params.buttonLabels
   * @param params.onSuccess
   * @param params.onFail
   */
  confirm: function(params){
    if(window.confirm(params.message)){
      rsqChk(params.success);
    }
  },
  /**
   * prompt提示框
   * @param params.title
   * @param params.message
   * @param params.buttonLabels
   * @param params.onSuccess
   * @param params.onFail
   */
  prompt: function(params){},
  /**
   * 显示加载框
   * @param params.text
   * @param params.showIcon
   * @param params.onSuccess
   * @param params.onFail
   */
  showLoader: function(params){
    console.log('temp---showLoader')
  },
  /**
   * 隐藏加载库
   * @param params.onSuccess
   * @param params.onFail
   */
  hideLoader: function(params){
    console.log('temp---hideLoader')
  },
  /**
   * actionsheet
   * @param params.title
   * @param params.cancelButton
   * @param params.otherButtons
   * @param params.onSuccess
   * @param params.onFail
   */
  actionsheet: function(params){
    var div = document.createElement('div')
    div.setAttribute('style', 'position:fixed;bottom:0;left:0;right:0;background:#e8e8e8;font-size:14px;')
    params.buttonArray.forEach(function(val, index){
      var p = document.createElement('p')
      p.setAttribute('data-index', index)
      p.innerHTML = val
      div.appendChild(p)
      p.addEventListener('click', function(e){
        rsqChk(params.success, [{buttonIndex: index}])
      })
    })
    var cancel = document.createElement('p')
    cancel.innerHTML = '取消'
    cancel.addEventListener('click', function(e) {
      document.body.removeChild(div)
    })
    div.appendChild(cancel)
    document.body.appendChild(div)
  },
  /**
   * toast
   * @param params.text
   * @param params.showIcon
   * @param params.duration
   * @param params.delay
   * @param params.onSuccess
   * @param params.onFail
   */
  toast: function(params){
    console.log('toast not implemented... message is:' + params.message);
  },
  selectDeptMember: function(){},
  selectMember: function(){},
  picker: function(params){
  },
  datePicker: function(params){},
  timePicker: function(params){},
  disableBounce: function(params){},
  notify: function(params){},
  pickConversation: function(params){},
  getItem: function(params){
    rsqChk(params.success, [{value: localStorage.getItem(params.name)}])
  },
  setItem: function(params){
    localStorage.setItem(params.name, params.value)
    rsqChk(params.success, [{}])
  },
  removeItem: function(params){
    localStorage.removeItem(params.name)
    rsqChk(params.success, [{}])
  }
});
