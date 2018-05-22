
## web-sophon 

> Sophon comes from The Trisolaris of Centaurus.
<img style="display:block;margin:0 auto" src="http://img.netbian.com/file/2017/1030/9ac3e08c2ee27ad2db304cb979b83724.jpg">

* error monitoring and remote reporting, it can be configured free.
* support for [vConsole](https://github.com/WechatFE/vConsole) error display.

## Install

```bash
npm install web-sophon
```
download the git repository, or use the online [https://evanliu2968.github.io/web-sophon/lib/sophon.min.js](https://evanliu2968.github.io/web-sophon/lib/sophon.min.js)

## Usage

```js
const Sophon = require('web-sophon')
Sophon.config({
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

[https://EvanLiu2968.github.io/web-sophon/](https://EvanLiu2968.github.io/web-sophon/)

资料参考
- [AlloyLever](https://github.com/AlloyTeam/AlloyLever)
- [window onerror 各浏览器下表现总结](https://segmentfault.com/a/1190000011041164)

# License

[MIT](http://opensource.org/licenses/MIT)
