---
layout: post
title: 浅谈JavaScript的语言特性
description: Javascript语言特性，闭包，作用域链，上下文，函数。
category: frontend
imgsrc: data:image/gif;base64,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
<!-- imgsrc: img/JavaScript.jpg -->
---

## 前言 ##
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在JavaScript中，作用域、上下文、闭包、函数等算是精华中的精华了。对于初级jser来说，是进阶必备。对于前端攻城师来说，只有静下心来，理解了这些精华，才能写出优雅的代码。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本文旨在总结容易忘记的重要知识，不会讲基本的概念。如果对基本知识不太熟悉，就去翻下[权威指南][guide]吧~

参考文章如下(建议读者朋友用chrome看这些文章吧，不然的话会错过很多精彩哦~)：

[http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)
[http://benalman.com/news/2010/11/immediately-invoked-function-expression/](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
[http://dmitrysoshnikov.com/ecmascript/javascript-the-core/](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/)

## 语言特性

### 函数表达式  ###
* * *
先看代码段：


<pre>
	<code> 
		var f = function foo(){
		    return typeof foo; // foo是在内部作用域内有效
		};
		// foo在外部用于是不可见的
		typeof foo; // "undefined"
		f(); // "function"
	</code>
</pre>


这里想说一点的就是，在函数表达式中的foo，只能在函数内部引用，外面是不能引用的。

### json ###
* * *

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;很多JavaScript开发人员都错误地把JavaScript对象字面量(Object Literals)称为JSON对象(JSON Objects)。
JSON是设计成描述数据交换格式的，它也有自己的语法，这个语法是JavaScript的一个子集。


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "prop": "val" } 这样的声明有可能是JavaScript对象字面量，也有可能是JSON字符串，取决于什么上下文使用它。如果是用在string上下文(用单引号或双引号引住，或者从text文件读取)的话，那它就是JSON字符串，如果是用在对象字面量上下文中，那它就是对象字面量。


<pre><code> 
 	// 这是JSON字符串
	var foo = '{ "prop": "val" }';
	 
	// 这是对象字面量
	var bar = { "prop": "val" };
</code></pre>

还有一点需要知道的是，JSON.parse用来将JSON字符串反序列化成对象，JSON.stringify用来将对象序列化成JSON字符串。

**老版本的浏览器不支持这个对象，但你可以通过json2.js来实现同样的功能。**

### 原型 ###
* * *

<pre><code> 
	function Animal (){  
		// ...
	}
	function cat (){  
	    // ...
	}  
	cat.prototype = new Animal();//这种方式会继承构造函数里面的。
	cat.prototype = Animal.prototype;//这种方式不会继承构造函数里面的。

	//还有一个重要的细节需要注意的就是一定要维护自己的原型链,新手总会忘记这个！
	cat.prototype.constructor = cat;
</code></pre>
	
	
如果我们彻底改变函数的prototype属性（通过分配一个新的对象），那原始构造函数的引用就是丢失，这是因为我们创建的对象不包括constructor属性：

<pre><code> 
	function A() {}
	A.prototype = {
	  x: 10
	};
 
	var a = new A();
	alert(a.x); // 10
	alert(a.constructor === A); // false!
</code></pre>
	

让我们一起看下MDN上关于constructor的[解释](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/constructor)吧：

prototype：Returns a reference to the Object function that created the instance's prototype. 

因此，对函数的原型引用需要手工恢复：


<pre><code>
	function A() {}
	A.prototype = {
	  constructor: A,
	  x: 10
	};
 
	var a = new A();
	alert(a.x); // 10
	alert(a.constructor === A); // true
</code></pre>
	

然而，提交prototype属性不会影响已经创建对象的原型（只有在构造函数的prototype属性改变的时候才会影响到)，就是说新创建的对象才有有新的原型，而已创建对象还是引用到原来的旧原型（这个原型已经不能被再被修改了）。


<pre><code>
	function A() {}
	A.prototype.x = 10;
	 
	var a = new A();
	alert(a.x); // 10
	 
	A.prototype = {
	  constructor: A,
	  x: 20
	  y: 30
	};
	 
	// 对象a是通过隐式的[[Prototype]]引用从原油的prototype上获取的值
	alert(a.x); // 10
	alert(a.y) // undefined
	 
	var b = new A();
	 
	// 但新对象是从新原型上获取的值
	alert(b.x); // 20
	alert(b.y) // 30
</code></pre>
	
	
因此，“动态修改原型将影响所有的对象都会拥有新的原型”是错误的，新原型仅仅在原型修改以后的新创建对象上生效。

这里的主要规则是：对象的原型是对象的创建的时候创建的，并且在此之后不能修改为新的对象，如果依然引用到同一个对象，可以通过构造函数的显式prototype引用，对象创建以后，只能对原型的属性进行添加或修改。


### 变量对象 ###
* * *

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在函数执行上下文中，VO(variable object)是不能直接访问的，此时由活动对象(activation object)扮演VO的角色。
活动对象是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。arguments属性的值是Arguments对象：


<pre><code>
	function foo(x, y, z) {
	  // 声明的函数参数数量arguments (x, y, z)
	  alert(foo.length); // 3

	  // 真正传进来的参数个数(only x, y)
	  alert(arguments.length); // 2
	 
	  // 参数的callee是函数自身
	  alert(arguments.callee === foo); // true
	}
</code></pre>
	

当进入执行上下文(代码执行之前)时，VO里已经包含了下列属性：

1. 函数的所有形参(如果我们是在函数执行上下文中)；
2. 所有函数声明(FunctionDeclaration, FD)；
3. 所有变量声明(var, VariableDeclaration)；


另一个经典例子：

<pre><code>
	alert(x); // function
	 
	var x = 10;
	alert(x); // 10
	 
	x = 20;
	 
	function x() {};
	 
	alert(x); // 20
</code></pre>
	

根据规范函数声明是在当进入上下文时填入的; 在进入上下文的时候还有一个变量声明“x”，那么正如我们在上面所说，**变量声明在顺序上跟在函数声明和形式参数声明之后**，而且在这个进入上下文阶段，变量声明不会干扰VO中已经存在的同名函数声明或形式参数声明。



变量相对于简单属性来说，变量有一个特性(attribute)：{DontDelete},这个特性的含义就是不能用delete操作符直接删除变量属性。


<pre><code>
	a = 10;
	alert(window.a); // 10
	alert(delete a); // true
	alert(window.a); // undefined

	var b = 20;
	alert(window.b); // 20
	alert(delete b); // false
	alert(window.b); // still 20。b is variable,not property!
	
	var a = 10; // 全局上下文中的变量
	 
	(function () {
	  var b = 20; // function上下文中的局部变量
	})();
	alert(a); // 10
	alert(b); // 全局变量 "b" 没有声明.
</code></pre>	

### this
* * *

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。如果调用括号()的左边是引用类型的值，this将设为引用类型值的base对象（base object），在其他情况下（与引用类型不同的任何其它属性），这个值为null。不过，实际不存在this的值为null的情况，因为当this的值为null的时候，其值会被隐式转换为全局对象。
	

<pre><code>
	(function () {
	  alert(this); // null => global
	})();
</code></pre>


在这个例子中，我们有一个函数对象但不是引用类型的对象（它不是标示符，也不是属性访问器），相应地，this值最终设为全局对象。


<pre><code>
	var foo = {
	    bar: function () {
	      alert(this);
	    }
	};
	 
	foo.bar(); // Reference, OK => foo
	(foo.bar)(); // Reference, OK => foo
	 
	(foo.bar = foo.bar)(); // global
	(false || foo.bar)(); // global
	(foo.bar, foo.bar)(); // global
</code></pre>
	

问题在于后面的三个调用，在应用一定的运算操作之后，在调用括号的左边的值不在是引用类型。

1. 第一个例子很明显———明显的引用类型，结果是，this为base对象，即foo。
2. 在第二个例子中，组运算符并不适用，想想上面提到的，从引用类型中获得一个对象真正的值的方法，如GetValue。相应的，在组运算的返回中———我们得到仍是一个引用类型。这就是this值为什么再次设为base对象，即foo。
3. 第三个例子中，与组运算符不同，赋值运算符调用了GetValue方法。返回的结果是函数对象（但不是引用类型），这意味着this设为null，结果是global对象。
4. 第四个和第五个也是一样——逗号运算符和逻辑运算符（OR）调用了GetValue 方法，相应地，我们失去了引用而得到了函数。并再次设为global。


正如我们知道的，局部变量、内部函数、形式参数储存在给定函数的激活对象中。

<pre><code>
	function foo() {
	   function bar() {
	      alert(this); // global
	   }
	   bar(); // the same as AO.bar()
	}
</code></pre>
	

活动对象总是作为this返回，值为null——（即伪代码的AO.bar()相当于null.bar()）。这里我们再次回到上面描述的例子，this设置为全局对象。


### 作用域链 ###

通过函构造函数创建的函数的[[scope]]属性总是唯一的全局对象。

一个重要的例外，它涉及到通过函数构造函数创建的函数。


<pre><code>
	var x = 10;
	function foo() {
	   var y = 20;
	   function barFD() { // 函数声明
	      alert(x);
	      alert(y);
	   }
	   var barFn = Function('alert(x); alert(y);');
	   barFD(); // 10, 20
	   barFn(); // 10, "y" is not defined
	}
	foo();
</code></pre>
	
还有：

<pre><code>
	var x = 10, y = 10;
	 
	with ({x: 20}) {
	 
	  var x = 30, y = 30;
	 //这里的 x = 30 覆盖了x = 20；
	  alert(x); // 30
	  alert(y); // 30
	}
	 
	alert(x); // 10
	alert(y); // 30
</code></pre>
	

在进入上下文时发生了什么？标识符“x”和“y”已被添加到变量对象中。此外，在代码运行阶段作如下修改：

1. x = 10, y = 10;
2. 对象{x:20}添加到作用域的前端;
3. 在with内部，遇到了var声明，当然什么也没创建，因为在进入上下文时，所有变量已被解析添加;
4. 在第二步中，仅修改变量“x”，实际上对象中的“x”现在被解析，并添加到作用域链的最前端，“x”为20，变为30;
5. 同样也有变量对象“y”的修改，被解析后其值也相应的由10变为30;
6. 此外，在with声明完成后，它的特定对象从作用域链中移除（已改变的变量“x”－－30也从那个对象中移除），即作用域链的结构恢复到with得到加强以前的状态。
7. 在最后两个alert中，当前变量对象的“x”保持同一，“y”的值现在等于30，在with声明运行中已发生改变。

### 函数 ###

关于圆括号的问题

让我们看下这个问题：‘ 为何在函数创建后的立即调用中必须用圆括号来包围它？’，答案就是：表达式句子的限制就是这样的。

按照标准，表达式语句不能以一个大括号 { 开始是因为他很难与代码块区分，同样，他也不能以函数关键字开始，因为很难与函数声明进行区分。即，所以，如果我们定义一个立即执行的函数，在其创建后立即按以下方式调用：
	
<pre><code>
	function () {
	  ...
	}();
	 
	// 即便有名称
	 
	function foo() {
	  ...
	}();
</code></pre>	
	

我们使用了函数声明，上述2个定义，解释器在解释的时候都会报错，但是可能有多种原因。

如果在全局代码里定义（也就是程序级别），解释器会将它看做是函数声明，因为他是以function关键字开头，第一个例子，我们会得到SyntaxError错误，是因为函数声明没有名字（我们前面提到了函数声明必须有名字）。

第二个例子，我们有一个名称为foo的一个函数声明正常创建，但是我们依然得到了一个语法错误——没有任何表达式的分组操作符错误。在函数声明后面他确实是一个分组操作符，而不是一个函数调用所使用的圆括号。所以如果我们声明如下代码：

<pre><code>
	// "foo" 是一个函数声明，在进入上下文的时候创建
	alert(foo); // 函数
	function foo(x) {
	   alert(x);
	}(1); // 这只是一个分组操作符，不是函数调用！
	foo(10); // 这才是一个真正的函数调用，结果是10
</code></pre>	
	


创建表达式最简单的方式就是用分组操作符括号，里边放入的永远是表达式，所以解释器在解释的时候就不会出现歧义。在代码执行阶段这个的function就会被创建，并且立即执行，然后自动销毁（如果没有引用的话）

<pre><code>
	(function foo(x) {
	    alert(x);
	})(1); // 这才是调用，不是分组操作符
</code></pre>	
	

上述代码就是我们所说的在用括号括住一个表达式，然后通过（1）去调用。

注意，下面一个立即执行的函数，周围的括号不是必须的，因为函数已经处在表达式的位置，解析器知道它处理的是在函数执行阶段应该被创建的FE，这样在函数创建后立即调用了函数。


<pre><code>
	var foo = {
	  	bar: function (x) {
	    	return x % 2 != 0 ? 'yes' : 'no';
	 	}(1)
	};
	 
	alert(foo.bar); // 'yes'
</code></pre>	
	

就像我们看到的，foo.bar是一个字符串而不是一个函数，这里的函数仅仅用来根据条件参数初始化这个属性——它创建后并立即调用。

	因此，”关于圆括号”问题完整的答案如下：
	当函数不在表达式的位置的时候，分组操作符圆括号是必须的——也就是手工将函数转化成FE。
	如果解析器知道它处理的是FE，就没必要用圆括号。

自由变量：

<pre><code>
	function testFn() {
	   var localVar = 10;//对于innerFn函数来说，localVar就属于自由变量。
	   function innerFn(innerParam) {
	      alert(innerParam + localVar);
	   }
	   return innerFn;
	}
</code></pre>	
	

闭包的静态作用域：

<pre><code>
	var z = 10;
	
	function foo() {
	  alert(z);
	}
	
	foo(); // 10 – 使用静态和动态作用域的时候
	
	(function () {
	  var z = 20;
	  foo(); // 10 – 使用静态作用域, 20 – 使用动态作用域
	})();
	
	// 将foo作为参数的时候是一样的
	(function (funArg) {
	    var z = 30;
	    funArg(); // 10 – 静态作用域, 30 – 动态作用域
	})(foo);
</code></pre>	



**理论**：因为作用域链，使得所有的函数都是闭包（与函数类型无关： 匿名函数，FE，NFE，FD都是闭包）。

**从实践角度**：以下函数才算是闭包：

* 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）

* 在代码中引用了自由变量


## 最后： ##

ECMAScript是一种面向对象语言，支持基于原型的委托式继承。


[guide]:http://book.douban.com/subject/10549733/
