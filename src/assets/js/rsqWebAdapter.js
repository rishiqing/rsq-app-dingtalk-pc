function rsqChk(fun, p){
  if(typeof fun == 'function'){
    fun.apply(null, p);
  }
}
function rsqNvl(orgVal, defValue){
  return null === orgVal || undefined === orgVal ? defValue : orgVal;
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
/**
 * adapter模板
 */
rsqAdapterManager.register({
  auth: function(params){
    var sign = {
      rsqUsername: '13269316295',
      rsqSecret: 'li19921006'
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
    rsqwork.setTitle({title: params.title});
  },
  setOptionButtons: function(params){
    rsqwork.setOptionButtons({
      btns:params.btns,
      success: function(res){
        // var clickedBtnData =  res; //{key:"用来标识按钮",name:"按钮名"},根据key来确定点击了哪个按钮
        rsqChk(params.success, [res]);
      }
    });
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
  showLoader: function(params){},
  /**
   * 隐藏加载库
   * @param params.onSuccess
   * @param params.onFail
   */
  hideLoader: function(params){},
  /**
   * actionsheet
   * @param params.title
   * @param params.cancelButton
   * @param params.otherButtons
   * @param params.onSuccess
   * @param params.onFail
   */
  actionsheet: function(params){},
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
  picker: function(params){
    rsqwork.picker({
      title: params.title, //标题名称
      items: params.items, //下拉选择各选项名称和值
      defaultValue: params.defaultValue, //默认选中的值，必须跟items中的value匹配，否则默认选中第一条
      success: function(res) {
        rsqChk(params.success, [res]);
      }
    });
  },
  datePicker: function(params){
    rsqwork.datePicker({
      init: params.init, //默认显示时间
      success: function(res) {
        if(res.date){
          res.time = res.date.getTime();
        }
        rsqChk(params.success, [res]);
        // var result = res; //控件选中的时间，格式根据format定
        // var time = res.time; //控件选中的时间的时间戳,当日+选择的时分秒的时间戳
      }
    });
  },
  disableBounce: function(){
  }
});
