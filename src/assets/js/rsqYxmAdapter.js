function rsqChk(fun, p){
  if(typeof fun == 'function'){
    fun.apply(null, p);
  }
}
function rsqNvl(orgVal, defValue){
  return null === orgVal || undefined === orgVal ? defValue : orgVal;
}
/**
 * adapter模板
 */
rsqAdapterManager.register({
  auth: function(params){
    rsqAdapterManager.execute('sign', {success: function(user){

      rsqAdapterManager.ajax.post(rsqConfig.apiServer + 'task/j_spring_security_check', {
        j_username: user.rsqUsername, j_password: user.rsqSecret, _spring_security_remember_me: true
      }, function(result){
        var resJson = JSON.parse(result);
        if(resJson.success){
          rsqChk(params.success, [resJson, user]);
        }else{
          alert('验证失败：username:' + user.rsqUsername + ',password:' + user.rsqSecret);
          rsqChk(params.error, [resJson]);
        }
      });
    }, error: function(err){
      rsqadmg.log(JSON.stringify(err));
    }});
  },
  sign: function(params){
    var currentUrl = window.location.href.split('#')[0];
    rsqAdapterManager.ajax.get(rsqConfig.authServer + 'sign/index', {
      requestUrl: currentUrl
    }, function(resSign){
      var sign = JSON.parse(resSign);
      rsqAdapterManager.execute('init', {
        debug: true,
        "signature": sign.signature,
        "nonce": sign.nonce,
        "timestamp": sign.timestamp,
        "appKey": sign.appKey,
        success: function(){
          rsqChk(params.success, [sign.user]);
        },
        error: function(err){
          rsqChk(params.error, [err]);
        }
      });
    });
  },
  init: function(params){
    yxwork.init({
      debug: params.debug,
      "signature": params.signature,
      "nonce": params.nonce,
      "timestamp": params.timestamp,
      "appKey": params.appKey
    });
    yxwork.ready(function(res){
      rsqChk(params.success, [res]);
    });
    yxwork.error(function(err){
      rsqChk(params.error, [err]);
    });
  },
  autoLogin: function(params){

  },
  log: function(params){
    yxwork.log(params.message,'yx')
  },
  setTitle: function(params){
    yxwork.setTitle({
      title: params.title //要设置的标题栏文本
    });
  },
  setOptionButtons: function(params){
    yxwork.setOptionButtons({
      btns:params.btns, //name为空会调用失败;如果btns为空数组,则会清掉自定义按钮
      hideMore: rsqNvl(params.hideMore, true), //默认true,自定义按钮的时候隐藏右上角‘更多’按钮
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
    yxwork.alert({
      title: params.title, //标题(PC不支持)
      message: params.message, //提示内容
      buttonName: params.buttonName || '知道了', //按钮名称，默认为“知道了”
    });
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
    yxwork.confirm({
      message: params.message, //提示内容
      confirmName: params.confirmName || '确定', //确定按钮名称，默认为“确定”
      cancelName: params.cancelName || '取消', //取消按钮名称，默认为“取消”
      success: function(){
        rsqChk(params.success, []);
      },
      cancel: function(){
        rsqChk(params.cancel, []);
      }
    });
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
    yxwork.toast({
      message: params.message, //提示内容
    });
  },
  selectMember: function(params){
    yxwork.selectMember({
      title: params.title, //选择器标题，pc端需要的参数
      btnText: params.btnText,  //选择器按钮文本，pc端需要的参数
      multiple: !!params.multiple, //默认false，选择单人
      maximum: params.maximum || -1,  //可选择人数的上限，默认-1不限制人数
      selectedIds:params.selectedIds, //已选联系人openid
      success: function(res){
        rsqChk(params.success, [res]);
      }
    });
  },
  picker: function(params){
    yxwork.dropdownMenu({
      title: params.title, //标题名称
      items: params.items, //下拉选择各选项名称和值
      defaultValue: params.defaultValue, //默认选中的值，必须跟items中的value匹配，否则默认选中第一条
      success: function(res) {
        rsqChk(params.success, [res]);
      }
    });
  },
  datePicker: function(params){
    yxwork.datepicker({
      init: params.init, //默认显示时间
      success: function(res) {
        if(res.time){
          res.date = new Date(res.time);
        }
        rsqChk(params.success, [res]);
        // var result = res; //控件选中的时间，格式根据format定
        // var time = res.time; //控件选中的时间的时间戳,当日+选择的时分秒的时间戳
      }
    });
  }
});
