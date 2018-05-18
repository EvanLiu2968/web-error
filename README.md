
## web-error 

library for error monitoring and reporting, user problem localization features

> 部分参考实现 [AlloyLever](https://github.com/AlloyTeam/AlloyLever)

* error monitoring and remote reporting, it can be configured free.
* support for [vConsole](https://github.com/WechatFE/vConsole) error display.

## Install

```
npm install **
```

## Usage

```js
WebError.config({
  cdn:'//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',  //vconsole CDN address
  reportUrl: "//a.qq.com",  //Error reporting address
  reportPrefix: 'qun',    //An error reporting msg prefix is generally used to differentiate business types
  reportKey: 'msg',        //Error reporting msg prefix key, user reporting system receives storage msg
  otherReport: {              //Other information to be reported
    uin: 491862102
  }
})
```

the library will listen to `window.onerror` and save the error information, and report to reportUrl, you can also call vConsole and display errors and related logs.

## DEMO

[https://EvanLiu2968.github.io/web-error/](https://EvanLiu2968.github.io/web-error/)

# License

[MIT](http://opensource.org/licenses/MIT)
