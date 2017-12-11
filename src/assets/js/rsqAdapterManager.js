(function(win){
  win.rsqSpace = win.rsqSpace || {};
  var mgrObj = {},
    funNameList = [
      'auth', 'sign',
      'init',
      'log',
      'disableBounce',
      'setTitle', 'setOptionButtons', 'selectDeptMember', 'selectMember',
      'alert',
      'confirm',
      'prompt',
      'showLoader',
      'hideLoader',
      'actionsheet','openLink',
      'toast', 'picker', 'datePicker', 'timePicker', 'deleteUserCache',
      'notify','pickConversation', 'getItem', 'setItem', 'deleteItem',
      'checkVersion', 'upgradeVersion'
    ];
  function register(adapter){
    extend(mgrObj, adapter);
  }
  function extend(orgObj, newObj){
    for(var key in newObj){
      if(newObj.hasOwnProperty(key) && ~funNameList.indexOf(key)){
        orgObj[key] = newObj[key];
      }
    }
  }
  function execute(funName, params){
    if(typeof mgrObj[funName] === 'function'){
      return mgrObj[funName].call(null, params);
    }else{
      console.error('the function ' + funName + ' you registered is not valid, so it has not been set');
      return null
    }
  }

  var ajax = {};
  ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
      return new XMLHttpRequest();
    }
    var versions = [
      "MSXML2.XmlHttp.6.0",
      "MSXML2.XmlHttp.5.0",
      "MSXML2.XmlHttp.4.0",
      "MSXML2.XmlHttp.3.0",
      "MSXML2.XmlHttp.2.0",
      "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
      try {
        xhr = new ActiveXObject(versions[i]);
        break;
      } catch (e) {
      }
    }
    return xhr;
  };

  ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
      async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
      if (x.readyState == 4) {
        if(x.status == 200){
          callback(x.responseText)
        }else{
          alert('http error:' + x.status);
        }
      }
    };
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    if (method == 'POST') {
      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
  };

  ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
  };

  ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
  };


  win.rsqadmg = win.rsqAdMg = win.rsqAdapterManager = win.rsqSpace.adapterManager = {
    log: function(message){
      rsqadmg.execute('log', {message: message});
    },
    register: register,
    exec: execute,
    execute: execute,
    ajax: ajax
  };

})(window);
