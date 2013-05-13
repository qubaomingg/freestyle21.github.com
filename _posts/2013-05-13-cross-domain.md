---
layout: post
title:  前端跨域方式总结和实践
description: 实践各种跨域方式，包括动态script,jsonp,CORS,postMessage等。
category: frontend
imgsrc: img/cross.jpg
---

面试的时候问了跨域，之前知道几种方式，不过没有深入。既然面试官都问了，那么估计在实践中也会很多吧。总结学习学习！后面和同学讨论后，再问了下google，发现跨域的方式真的好多。


本文意在总结和实践各种跨域方式，然后对比每种的优缺点，希望找到最佳实践方案。


很好的一篇文章，推荐之：[http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html](http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html)


通过这篇文章知道了，域名／协议／端口只要其中之一不同都不能跨域，另外二级域名之间也不能跨。跨域的解决 ,有句经典的话就是，凡是有src属性的东东，都可以用来跨域。比如img，iframe，script等。


如果练习的话，本机配置虚拟主机的教程在以前的[一篇文章](http://freestyleboy21.blog.163.com/blog/static/20840624120133139420259/?COLLCC=726912607&)。

<br>

# 跨域之动态script

这里，要首先弄清楚，我们跨域的目的是什么？


我理解的是，跨域就是a.com要访问b.com的数据，包括变量，对象等。弄清楚后就可以开始实践这种动态script的方式了。


在127.0.0.2的test.js中，我们要把传递给127.0.0.1/test.php 的数据封装好，我这里简单一个例子。

	// 127.0.0.2/test.js
	(function() {
		var b_myinfo = {
			'name' : 'fs21',
			'sex'  : 'male',
			'old'  : '21',
			'from' : 'uestc'
		}
		a_handler(b_myinfo);


	})();

如果在php中，则可以用echo $_GET('callback')."($data);";来调用回调函数。

另外在127.0.0.1/test.php中：

![1](/img/cross/1.png)

请注意上面判断script加载完毕的方式。还有加载完了后的销毁，释放内存。


这样在我们访问127.0.0.1/test.php时，结果如下：

![2](/img/cross/2.png)

<br>

### 传说中的神器，jsonp

上面的方式是两个域我们都可以控制，在一个域中配置好数据接口，另一个域来动态使用。


其实另一个域也第三方的。下面的例子调用百度翻译，写一个简单的单词查询demo。test.html如下：

![3](/img/cross/3.png)

就是获取输入框的内容，动态配置script的src，然后把查询的返回过来。


注意上面src的最后一个回调函数。还有这个回调函数的作用域问题。


结果如下：

![4](/img/cross/4.png)

<br>


# 跨域之document.domain + iframe

这种方式主要用在主域相同而子域不同的情况，由于不好模拟，就不折腾了，等以后有需求了，在来弄吧。核心代码如下：

	//a.b.com/c.html
	document.domain = 'b.com';
	var iframe = document.createElement('iframe');
	iframe.src = 'http://e.b.com/f.html';
	iframe.style.display = 'none';
	iframe.onload = function() {
	    var doc = iframe.contentDocument || iframe.contentWindow.document;
	    //这里操纵f.html
	    var fH1 = doc.getElementsByTagName('h1')[0];
	    .....
	}

	//e.b.com/f.html 
	document.domain = 'b.com

<br>


# 跨域之window.name

这个方法早在08年的时候，克军和怿飞就写了博文介绍这这个方法。只怪生的太迟，不能跟上步伐。。站在巨人肩膀上的前提是学习前人的知识经验。

先解释这个方法的原理。这种方法的核心是frame的window.name属性可以存不少数据，当内部location变化时name不变。


由三个页面组成，127.0.0.1/test.php｜127.0.0.1/proxy.html｜127.0.0.2/index.php


我要做的是从第一个访问第三个中的数据。在/test.php中创建一个frame，src指向index.php,如果直接访问frame中的window.name会提示跨域错误，所以第二个proxy.html就上场了，proxy.html内容为空，但是和test.php在同一个域。我们判断如果把index.php加载完成后就把frame的src改成proxy.html，现在访问就不会提示跨域错误了，而且刚才说过，frame的window.name不会变！

代码如下：//test.php

![5](/img/cross/5.png)

	 //index.php
	<script>
	   window.name = 'i am from 127.0.0.2 !';
	</script>

当访问127.0.0.1/test.php时返回如下：

![6](/img/cross/6.png)

这里有点需要注意，即使是IP和域名互相对应，也不能互相通信，他们之间也算跨域。因为这个原因，调了好久。上面的localhost/proxy.html那行最开始写成了http://127.0.0.1/proxy.html,这样是不能通信的。


<br>


#跨域之HTML5 postMessage

这种跨域方式比较新，而且api简单，容易上手，缺点就是浏览器支持不够，目前就那么几个比较潮的支持。不过相信，不过多久就会成为主流的跨域方式～


下面的目标是两个域互相对话。先给效果图：

![7](/img/cross/7.png)

用iframe的目的是为了方便我们看到，不然还得两个来回转换。其实可以不用iframe的哈！


代码如下:// 127.0.0.1 test.php


![8](/img/cross/8.png)

 //127.0.0.2 index.php

![9](/img/cross/9.png)

如大家所看，HTML5的PostMessage核心代码就postMessage和onmessage。相信不用解释都能懂啦～

<br>

   
# 跨域之flash

现在的flash已经不只是一个动画，更多的有了数据交互，与外界互动，那么跨域也是必须要面对的问题。


由于对flash不太熟悉，只能从网上找点例子，看看原理，这里大致解释一下，如果有熟悉的朋友，欢迎交流指教。
大致原理就是利用flash API中的LocalConnecttion这个类，在需要通信的两个域中各嵌套一个SWF，然后互相交换数据。


别人说的，数据量限制40kb，数据快。没有实践，先记着吧。


用这种方式跨域通信比较复杂，需要两个SWF，个人感觉实用性不强。

<br>


# 跨域之CORS 

CORS的全称是Cross-Origin Resource Sharing，中文名字叫做“跨域资源共享”。目前在W3C的文档中还是草案，不过浏览器支持情况还是很乐观，IE8(不是XHR而是XDR）以上的IE，chrome 4.0以上，firefox 3.5以上都支持。参见caniuse.com


最开始的时候是在高级程序设计上看到的，不过没有仔细研究。这次弄跨域，果断一起弄了。


其实CORS和XHR差不多，唯一的差别就是CORS需要服务器支持。之前在XHR的写法是：

	xhr.open('GET‘，’test.php',true);

这里的test.php都是在同域名下，一般用相对地址。而我们的CORS写法是：

	xhr.open('GET','freestyle21.cn',true);

差别就是url变成不同域了！但是。。直接这样访问肯定是不行的，要报Origin is not allowed by Access-Control-Allow-Origin.的错误。CORS的解决方案是在服务器端该Header头部：

	header("Access-Control-Allow-Origin：＊"); 

这样再次访问就可以了。对，CORS就这么简单！


下面照例写个demo。http://127.0.0.1/test.php

![10](/img/cross/10.png)

// 127.0.0.2/index.php

	header("Access-Control-Allow-Origin:http://localhost"); 
	<div>i am from http://127.0.0.2/index.php</div>

现在访问127.0.0.1／test.php结果如下：

![11](/img/cross/11.png)

# 总结

通过动态script跨域，就是相当与引入一个外部的js文件而已，只不过这个文件带回来了一些有用的数据。

通过jsonp跨域，实质是HTTP的GET方式请求，把参数或者回调函数传入url，然后在服务端做好相应的接口，返回给回调函数。见过别人做个的另一各种相似的方式是把参数给hash值，另一边通过轮询判断hash的变化，然后利用location.hash使用这个参数。这种方式都感觉略不完美，数据放在url上很不安全，而且会产生历史记录，数量有限

总的来说，目前最简单有效的方式是jsonp，如果在受信任的双方传递数据，它是最佳的选择。
在上面的例子中同样看到了CORS和postMessage的高效，在可预见的几年内，势必会成为主流。

ps：这篇文章边实践边写，写的比较久，断断续续的。因为博客的代码效果不是很好，所以直接截图了。





























