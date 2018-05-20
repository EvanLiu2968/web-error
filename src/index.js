/*!
 *  Author: https://www.evanliu2968.com.cn
 *  Github: https://github.com/EvanLiu2968/web-error
 *  MIT Licensed.
 */
;(function (root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if(typeof define === 'function' && define.amd)
    define([], factory)
  else if(typeof exports === 'object')
    exports["WebError"] = factory()
  else
    root["WebError"] = factory()
})(this, function() {
  var Luban = {}
  if(typeof window === 'undefined') return Luban;
  
  Luban.settings = {
    vconsole:'//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',
    onError: null
  }

  Luban.store = []

  var methodList = ['log', 'info', 'warn', 'debug', 'error'];
  methodList.forEach(function(item) {
    var method = console[item];

    console[item] = function() {
      Luban.store.push({
        logType: item,
        logs: arguments
      });

      method.apply(console, arguments);
    }
  });

  // Luban.logs = []
  Luban.config = function(config){
    for(var i in config){
      if(config.hasOwnProperty(i)){
        Luban.settings[i] = config[i]
      }
    }


    var parameter = getParameter('vconsole')

    if(parameter) {
      if (parameter === 'show') {
        Luban.vConsole(true)
      } else {
        Luban.vConsole(false)
      }
    }
  }

  Luban.vConsole = function(show){
    loadScript(Luban.settings.vconsole, function() {

      //support vconsole3.0
      if (typeof vConsole === 'undefined') {
        vConsole = new VConsole({
          defaultPlugins: ['system', 'network', 'element', 'storage'],
          maxLogNumber: 5000
        })
      }

      var i = 0,
        len = Luban.store.length

      for (; i < len; i++) {
        var item = Luban.store[i]
        //prevent twice log
        item.noOrigin = true
        vConsole.pluginList.default.printLog(item)
      }

      if(show) {
        try {
          vConsole.show()
        } catch (e) {

        }

        window.addEventListener('load', function () {
          vConsole.show()
        })
      }
    })
  }


  window.onerror = function(msg, url, line, col, error) {
    console.log(arguments)
    var newMsg = msg

    if (error && error.stack) {
      newMsg = processStackMsg(error)
    }

    if (isOBJByType(newMsg, "Event")) {
      newMsg += newMsg.type ?
        ("--" + newMsg.type + "--" + (newMsg.target ?
          (newMsg.target.tagName + "::" + newMsg.target.src) : "")) : ""
    }

    newMsg = (newMsg + "" || "").substr(0,500)

    var errorInfo = {
      msg: newMsg,
      target: url,
      rowNum: line,
      colNum: col,
      time: new Date().getTime()
    }

    // Luban.logs.push(errorInfo)

    if (msg.toLowerCase().indexOf('script error') > -1) {
      console.error('Script Error: See Browser Console for Detail')
    } else {
      console.error(newMsg)
    }

    var settings = Luban.settings
    if(typeof settings.onError === 'function'){
      settings.onError.call(Luban, errorInfo)
    }
  }


  function loadScript(src, callback){
    var s,
      r,
      t
    r = false
    s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = src
    s.onload = s.onreadystatechange = function() {
      //console.log( this.readyState ); //uncomment this line to see which ready states are called.
      if ( !r && (!this.readyState || this.readyState == 'complete') )
      {
        r = true
        callback()
      }
    }
    t = document.getElementsByTagName('script')[0]
    t.parentNode.insertBefore(s, t)
  }

  function getParameter(n) {
    var m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)')),
      result = !m ? '' : decodeURIComponent(m[1])
    return result ||getParameterByName(n)
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }

  function  isOBJByType(o, type) {
    return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]"
  }

  function processStackMsg (error) {
    var stack = error.stack
      .replace(/\n/gi, "")
      .split(/\bat\b/)
      .slice(0, 9)
      .join("@")
      .replace(/\?[^:]+/gi, "")
    var msg = error.toString()
    if (stack.indexOf(msg) < 0) {
      stack = msg + "@" + stack
    }
    return stack
  }

  function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")

    if(arr=document.cookie.match(reg))
      return unescape(arr[2])
    else
      return null
  }

  Luban.getCookie = getCookie
  Luban.getParameter= getParameter
  Luban.loadScript = loadScript

  return Luban
});
