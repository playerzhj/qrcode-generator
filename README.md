# qrcode-generator
--------------------

一个简单的能够生成二维码的chrome浏览器插件。插件能够根据鼠标右键点击的目标动态判断需要生成二维码的内容，可以是当前页面url、选中的文字、指定链接。

## 为什么要使用qrcode-generator

在下面情况下，有它真好！  

*  需要将一段经典的笑话通过移动设备分享给朋友时
*  欣赏一篇美文，正巧要去wc时
*  ...

## 使用方法

1. git clone git@github.com:playerzhj/qrcode-generator.git
2. 打开chrome浏览器，进入扩展页（地址栏中输入chrome://extensions/）
3. 点击`load unpacked extension`选择刚克隆出来的文件夹
4. 右键点击浏览器的空白页，就会弹出包含**展现当前页面地址的二维码**功能项
5. go.go.go.

## 使用到的技术

* `chrome extension` [开发指南](https://developer.chrome.com/extensions/index)
* CSS3 动画编辑生成 [生成地址](http://ecd.tencent.com/css3/tools.html)

## 注意点

* qrcode-generator只包含前端部分，二维码图片的具体生成请自行搭建服务器，可参考[phpqrcode](http://phpqrcode.sourceforge.net/)

## TODO

* 采用前端js生成二维码的方式代替server端生成，去除对网络环境的依赖，可参看[qrcode.js](http://davidshimjs.github.io/qrcodejs/)




