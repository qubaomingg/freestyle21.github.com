---
layout: post
title: 学会使用chrome的F12
description: 用了几年chrome，只是知道一些大体的简单应用，本文将教会你前端人常用的调试技能。
category: frontend
imgsrc: img/chrome.jpg
---

&nbsp;&nbsp;&nbsp;&nbsp;学习前端以来，chrome一直都是最忠实的朋友，至于firefox和opera等都是传说中的东西，觉得他们的调试功能不太好看（不是不好=；=）。。所以，还是最钟情于chrome~

用F12开发者工具从来都是用那里两个东西，Elements，Resources还有Sources，console这几个。其他的都不咋用。

折腾了一晚上F12，总结一下学到的东西，最有意思的是性能分析的神马东西了。。（刚完的一个项目就是因为加载时间耗了好久，早就想好好学下咯）

+	Network工具

chrome很智能，他会自动记录各个文件请求返回和等待的时间（貌似大名鼎鼎的firebug也有），不过点击过后需要刷新一下页面。

![1](/img/chromef12/1.jpg)
![2](/img/chromef12/2.jpg)

上面的4.3s就是从第一个请求道页面全部渲染结束所花费的时间。

+	Timeline

注意这个Timeline的标签页不是指网络请求的时间响应情况哦（这个在Network标签页里查看），这个Timeline指的js执行时间、页面元素渲染时间：

![3](/img/chromef12/3.jpg)

在上面点击后再点击红色的圆圈就可以了。

+	Profiles

![4](/img/chromef12/4.jpg)


这个工具可以分析js中每个函数执行的时间百分比。

提供了三种：javascript cpu 性能测试 （显示javascript占用了多少CPU）

css选择器性能测试（显示处理CSS选择器占用的CPU）

堆栈快照 （显示javascript对象的内存占用情况）

使用步骤如下：点击javascript cpu profile然后run。


后面的学会了在更新~
