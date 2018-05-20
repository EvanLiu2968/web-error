
## web-error 

* error monitoring and remote reporting, it can be configured free.
* support for [vConsole](https://github.com/WechatFE/vConsole) error display.

## Install

```bash
npm install **
```
download the git repository, or use the online [https://evanliu2968.github.io/web-error/lib/weberror.min.js](https://evanliu2968.github.io/web-error/lib/weberror.min.js)

## Usage

```js
WebError.config({
  vconsole:'https://s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',
  onError: function(errorInfo){
    // you can report it to remote server, follow as demo
    console.log(errorInfo)
    // report test
    var src = "http://www.baidu.com?error=" + errorInfo.msg
    var otherReport = {
      pixel: window.devicePixelRatio,
      platform: window.navigator.platform,
      userAgent: window.navigator.userAgent,
      t: errorInfo.time
    };
    for (var i in otherReport) {
      if (otherReport.hasOwnProperty(i)) {
        src += '&' + i + '=' + otherReport[i]
      }
    }
    new Image().src = src
  }
})
```

the library will listen to `window.onerror` and save the error information, and report to reportUrl, you can also call vConsole and display errors and related logs.

## DEMO

[https://EvanLiu2968.github.io/web-error/](https://EvanLiu2968.github.io/web-error/)

资料参考
- [AlloyLever](https://github.com/AlloyTeam/AlloyLever)
- [window onerror 各浏览器下表现总结](https://segmentfault.com/a/1190000011041164)

# License

[MIT](http://opensource.org/licenses/MIT)
