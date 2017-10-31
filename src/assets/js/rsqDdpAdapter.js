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

    return decodeURIComponent(arr[2]);
  else
    return null;
}

//删除cookies
function deleteCookie(name)
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
 * adapter钉钉适配，参加钉钉jssdk文档
 * @link https://open-doc.dingtalk.com/docs/doc.htm
 */
rsqAdapterManager.register({
  auth: function(params){
    //  先取签名
    // alert('before sign----');
    rsqadmg.execute('sign', {
        success: function(res){
          // alert('after sign----' + JSON.stringify(res));
          // var json = JSON.stringify(res);
          // 再进行jssdk初始化
          rsqadmg.execute('init', {
            agentId: res.agentId,
            "corpId": rsqadmg.store.app.corpid,
            "timeStamp": res.timeStamp,
            "nonceStr": res.nonce,
            "signature": res.signature,
            success: function(authUser){
              // alert('after init----' + JSON.stringify(authUser));

              // var authUser = authResult.user;
              //  从authServer获取到用户数据后进行登录
              rsqAdapterManager.ajax.post(rsqConfig.apiServer + 'task/j_spring_security_check', {
                j_username: authUser.rsqUsername, j_password: authUser.rsqPassword, _spring_security_remember_me: true
              }, function(result){
                var resJson = JSON.parse(result);
                if(resJson.success){
                  rsqChk(params.success, [resJson, authUser]);
                }else{
                  rsqChk(params.error, [resJson]);
                }
              });
            },
            error: function(authResult){
              rsqChk(params.error, [authResult]);
            }
          });
        }
      }
    );
  },
  sign: function(params){
    var currentUrl = window.location.href.split('#')[0];
    var pa = rsqadmg.store.app;
    rsqAdapterManager.ajax.get(rsqConfig.authServer + 'get_js_config', {
      url: currentUrl,
      corpid: pa.corpid,
      appid: pa.appid
    }, function(resSign){
      var resJson = JSON.parse(resSign);
      rsqChk(params.success, [resJson]);
    });
  },
  init: function(params){
    DingTalkPC.config({
      "agentId": params.agentId,
      "corpId": rsqadmg.store.app.corpid,
      "timeStamp": params.timeStamp,
      "nonceStr": params.nonceStr,
      "signature": params.signature,
      jsApiList: [
        'runtime.info',
        'biz.chat.pickConversation',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'device.notification.showPreloader',
        'device.notification.hidePreloader',
        'device.notification.toast',
        'device.notification.actionSheet',
        'biz.navigation.setTitle',
        'biz.navigation.setMenu',
        'biz.util.chosen',
        'biz.util.datepicker',
        'biz.customContact.choose',
        'biz.customContact.multipleChoose',
        'biz.chat.open',
        'biz.util.open',
        'biz.user.get',
        'biz.contact.choose',
        'biz.telephone.call',
        'biz.ding.post']
    });
    DingTalkPC.ready(function(res){

      var appdata = rsqadmg.store.app;
      var cookieName = appdata.appid + '-' + appdata.corpid + '-userId';

      //  执行删除cookie，后续在app中删除cookie
      // rsqadmg.exec('deleteUserCache', {
      //   name: cookieName
      // });

      var userCookie = getCookie(cookieName);

      //  从cookie中获取
      if(userCookie){
        //  直接从authServer获取到用户数据
        rsqAdapterManager.ajax.get(rsqConfig.authServer + 'staff/userId', {
          corpid: appdata.corpid, appid: appdata.appid, userid: userCookie
        }, function(result){
          var resJson = JSON.parse(result);
          if(resJson.errcode && resJson.errcode != '0'){
            rsqChk(params.error, [resJson]);
          }else{
            rsqChk(params.success, [resJson.user]);
          }
        });
      }else{
        //  如果cookie中不存在用户信息，则调用authCode请求
        DingTalkPC.runtime.permission.requestAuthCode({
          corpId: appdata.corpid, //企业id
          onSuccess: function (info) {
            var url = rsqConfig.authServer + 'staff/authCode';
            rsqAdapterManager.ajax.get(url, {
              appid: appdata.appid,
              corpid: appdata.corpid,
              code: info.code
            }, function(resSign){
              var authResult = JSON.parse(resSign);
              if(authResult.errcode && authResult.errcode != '0'){
                rsqChk(params.error, [authResult]);
              }else{
                setCookie(cookieName, authResult.user.userId);
                rsqChk(params.success, [authResult.user]);
              }
            });
          },
          onFail: function (err) {
            alert('requestAuthCode fail: ' + JSON.stringify(err));
          }
        });
      }
    });
    DingTalkPC.error(function(err){
      alert('DingTalkPC error: ' + JSON.stringify(err));
    });
  },
  deleteUserCache: function(params){
    deleteCookie(params.name);
  },
  autoLogin: function(params){

  },
  log: function(params){
    console.log(params.message)
  },
  setTitle: function(params){

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
    DingTalkPC.device.notification.alert({
      message: params.message,
      title: params.title || '提示',//可传空
      buttonName: params.buttonName || "收到",
      onSuccess : function(res) {
        rsqChk(params.success, [res]);
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
      }
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
    var btn1 = params.confirmName || '确定';
    var btn2 = params.cancelName || '取消';
    DingTalkPC.device.notification.confirm({
      message: params.message,
      title: "提示",
      buttonLabels: [btn2, btn1],
      onSuccess : function(result) {
        //onSuccess将在点击button之后回调
        /*
         {
         buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始
         }
         */
        if(0 == result.buttonIndex){
          rsqChk(params.cancel, []);
        }else if(1 == result.buttonIndex){
          rsqChk(params.success, []);
        }
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
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
  showLoader: function(params){

  },
  /**
   * 隐藏加载库
   * @param params.onSuccess
   * @param params.onFail
   */
  hideLoader: function(params){
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
    DingTalkPC.device.notification.actionSheet({
      title: "请选择", //标题
      cancelButton: '取消', //取消按钮文本
      otherButtons: params.buttonArray,
      onSuccess : function(result) {
        rsqChk(params.success, [result]);
        /*{
         buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1
         }*/
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
        rsqChk(params.error, err);
      }
    });
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
    DingTalkPC.device.notification.toast({
      icon: '', //icon样式，有success和error，默认为空 0.0.2
      duration: 1,
      text: params.message, //提示信息
      onSuccess : function(result) {
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
      }
    })
  },
  selectDeptMember: function(params){
    var maximum = params.maximum == -1 ? 1500 : params.maximum;
    DingTalkPC.biz.contact.choose({
      startWithDepartmentId: -1, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
      multiple: params.multiple, //是否多选： true多选 false单选； 默认true
      users: params.selectedIds, //默认选中的用户列表，userid；成功回调中应包含该信息
      disabledUsers:params.disabledIds || [],//['10001', '10002', ...],// 不能选中的用户列表，员工userid
      corpId: rsqadmg.store.app.corpid, //企业id
      max: maximum, //人数限制，当multiple为true才生效，可选范围1-1500
      limitTips:"超出人数限制", //超过人数限制的提示语可以用这个字段自定义
      isNeedSearch:true, // 是否需要搜索功能
      title : params.title, // 如果你需要修改选人页面的title，可以在这里赋值
      local: true, // 是否显示本地联系人，默认false
      onSuccess: function(data) {
        rsqChk(params.success, [data]);
        //onSuccess将在选人结束，点击确定按钮的时候被回调
        /* data结构
         [{
         "name": "张三", //姓名
         "avatar": "http://g.alicdn.com/avatar/zhangsan.png" //头像图片url，可能为空
         "emplId": '0573', //userid
         },
         ...
         ]
         */
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
        rsqChk(params.error, data);
      }
    });
  },
  selectMember: function(params){
    DingTalkPC.biz.customContact.multipleChoose({
      title: params.title, //标题
      users: params.userIds,//一组员工userid
      corpId: params.corpId,//加密的企业 ID，
      isShowCompanyName: true,   //true|false，默认为 false
      selectedUsers: params.selectedIds,
      disabledUsers: params.disabledIds || [], //不能选的人
      onSuccess: function(data) {
        alert(JSON.stringify(data));
        rsqChk(params.success, [data]);
        /* data结构
         [{
         "name": "张三", //姓名
         "avatar": "http://g.alicdn.com/avatar/zhangsan.png" //头像图片url，可能为空
         "emplId": '0573', //userid，[<font color=red>获取成员详情接口</font>](https://open-doc.dingtalk.com/doc2/detail.htm?&articleId=104979&docType=1#s12)

         },
         ...
         ]
         */
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
        rsqChk(params.error, data);
      }
    });
  },
  picker: function(params){
    // var items = params.items.map(function(item){
    //   return {
    //     key: item.name,
    //     value: item.value
    //   }
    // });
    var buttons = params.items.map(function(item){
      return item.name;
    });
    DingTalkPC.device.notification.actionSheet({
      title: "选择", //标题
      cancelButton: '取消', //取消按钮文本
      otherButtons: buttons,
      onSuccess : function(result) {
        /*{
         buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1
         }*/
        rsqChk(params.success, [{
          name: buttons[result.buttonIndex],
          value: params.items[result.buttonIndex].value
        }]);
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
      }
    });
  },
  datePicker: function(params){
    var newDate = new Date(params.init);
    var formatVal = newDate.getFullYear() + '-' + padLeft(newDate.getMonth() + 1) + '-' + newDate.getDate();
    DingTalkPC.biz.util.datepicker({
      format: 'yyyy-MM-DingTalkPC',
      value: formatVal, //默认显示
      onSuccess : function(res) {
        res.result = res.value;
        var arr = res.value.split('-');
        var d = new Date(parseInt(arr[0]), parseInt(arr[1])-1, parseInt(arr[2]));
        res.date = d;
        res.time = d.getTime();
        rsqChk(params.success, [res]);
      },
      onFail : function(err) {
        alert(JSON.stringify(err));
      }
    })
  }
});
