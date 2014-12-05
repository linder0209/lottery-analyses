#Lottery-Analyses 彩票分析系统

该项目是一个免费彩票分析系统

##相关技术
* 项目管理：Grunt Bower Yeoman
* 书写代码辅助工具： emment（快速书写html代码，前身是 zen coding）
* 制定通用、简单的html 、css 和 javascript 规范，可以参考[这里](http://codeguide.bootcss.com/)
* CSS：基于Bootstrap运用less快速开发构建css，掌握常用的css3，并且能用css3工具快速生成code
* Javascript：基于Node.js能熟练构建项目(express, mongoose),  Angular, jQuery
* Javascript 第三方库（包括jQuery插件）
* Javascript模块化管理开发：选用Require.js
* 检测Javascript代码工具：JSHint，可以发现代码错误、查找代码潜在的问题以及不规范的写法。
* Html：会多用一些html5相关技术
* 数据库： Mongodb
* 单元测试：grunt + karma + Jasmine，基于Angular 测试
* 端到端（e2e）测试：protractor
* 性能优化技术


##项目安装、打包、运行，测试等

### 项目运行
前提是安装了最新版的nodejs（\>0.10.x）和mongodb数据库

```
npm install -g bower
npm install -g grunt-cli
npm install
bower install
grunt server
```
### 单元测试
```
grunt test
```
### 端到端（e2e）测试
```
npm install -g protractor
webdriver-manager update // 在项目当前目录下运行
npm run protractor
```
注意端到端测试前，请确保项目是在启动中，参见上面的 ***项目运行***

### 打包编译
```
grunt build
```

## 意见和建议以及bug

如果你有好的意见和建议，可以点击[这里](https://github.com/linder0209/lottery-analyses/issues/new)发表你的看法，
当然你也可以在[这里](https://github.com/linder0209/lottery-analyses/issues/new)提交bug。

## License

请看 [LICENSE 文件](https://github.com/linder0209/lottery-analyses/blob/master/LICENSE.md)
