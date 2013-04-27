---
layout: post
title: Javascript中的各种括号
description: 最近看ECMAScript262时，看了好多括号，索性一下弄清楚完。
category: frontend
<!-- imgsrc: img/justing.jpg -->
imgsrc: img/yaan.gif
---

&nbsp;&nbsp;&nbsp;平时总是遇到很多小括号跟在函数后面，没有机会深究。正如丁小倪所说，前端是一个涉足很深的职业，一个标签或一个属性都可以引申出很多东西。对每一个细节都要认真对待。

最近刚好在看ECMAScript262，又遇到这些问题。整理一下：

##引入

先上一段代码：


<pre><code>
	alert(foo);
	function foo(x) {
	  alert(x);
	}(1); 
	foo(10);
</code></pre>
	

这里的(1)有点不懂。第一个alert（）把foo打印出来，里面没有(1)！
他上面解释的是Group Operation.

google了一下Group Operation：a means of controlling precedence(优先级) of evaluation in expressions.

难道只是改变优先级？把括号去了只剩下1，结果也没有变化。所以，(1)应该和foo没有关系，即使放在很远的地方。是不是*1之类的呢？

##深入

再看两个表达式：


<pre><code>
	function () {   ... }();
	function foo() {   ... }();
</code></pre>


在全局代码（程序级别）中这样定义函数，解释器会以函数声明来处理，函数声明必须有name，否则编译器会报错。它看到了是以function开始的。 在第一个中，会抛出语法错误，原因是既然是个函数声明，则缺少函数名了（一个函数声明其名字是必须的）。
第二个中，看上去已经有了名字了（foo），应该会正确执行。然而，这里还是会抛出语法错误 —— **组操作符内部缺少表达式。** 这里要注意的是，这个例子中，函数声明后面的()会被当组操作符来处理，而非函数调用的()。不过如果给他加上void就不一样了哦。
最常规例子：


<pre><code>
	(function(){
	    alert("cftea");
	})();
</code></pre>
	

这个可以理解为：


<pre><code>
	function foo(){
    	alert(1);
	}
	foo();
</code></pre>
	
这里只是让function先执行，也就是上面说的优先级吧。
还有可能的用法：


<pre><code>
	(function(){
	    alert("cftea");
	})();
	(function(){
	    alert("cftea");
	}());
	void function(){
	    alert("cftea");
	}()
</code></pre>
	

以上的括号，或者void的作用只是告诉编译器把函数当成FE（函数表达式）来处理而已
函数表达式中的函数名称在哪保存，可以去看下ECMAScript262-5中函数的部分。

##括号对上下文作用域的影响

<pre><code>
	function Foo() {
	    var a = 123;
	    this.a = 456;
	    (function() {
	        alert(a); // 123
	        alert(this.a); // undefined
	    })();
	}
	var f = new Foo();
</code></pre>
	
这里var a给Foo的活动对象增加了一个变量，this.a给Foo的base值增加了一个属性。
注意，在匿名函数中，this永远指向global。只有this指向global，他们之间的变量相互独立，都是相当于块级作用域的东西。

	
<pre><code>
	function Foo() {
	    var a = 123;
	    this.a = 456;
	    (function() {
	        alert(a); // 123
	        alert(this.a); // undefined
	        this.b = 789;
	    })();
	    (function() {
	        alert(this.b); // 789
	    })();
	}
	var f = new Foo();
	(function() {
	    alert(this.b); // 789
	})();
</code></pre>
	
这说明用两个小括号括起来的都是位于一个执行上下文中的，都是在global中。
下面这里查找不到b变量，因为和前面的var b不是同一个，在不懂得”块级作用域里面“，查找不到后就在原型里面找，最终找到属性。


<pre><code>
	function Foo() {
	    (function() {
	        this.b = 789;
	    })();
	    (function() {
	        alert(this.b); // 789
	        var b = 0;
	        alert(b); // 0
	    })();
	}
	var f = new Foo();
	(function() {
	    alert(this.b); // 789
	    alert(b); // 789
	})();
</code></pre>
	

