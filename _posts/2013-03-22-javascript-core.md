---
layout: post
title: 浅谈JavaScript的语言特性
description: Javascript语言特性，闭包，作用域链，上下文，函数。
category: frontend
imgsrc: img/JavaScript.jpg
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

	 var f = function foo(){
	     return typeof foo; // foo是在内部作用域内有效
	  };
	  // foo在外部用于是不可见的
	  typeof foo; // "undefined"
	  f(); // "function"

这里想说一点的就是，在函数表达式中的foo，只能在函数内部引用，外面是不能引用的。

### json ###
* * *

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;很多JavaScript开发人员都错误地把JavaScript对象字面量(Object Literals)称为JSON对象(JSON Objects)。
JSON是设计成描述数据交换格式的，它也有自己的语法，这个语法是JavaScript的一个子集。


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ "prop": "val" } 这样的声明有可能是JavaScript对象字面量，也有可能是JSON字符串，取决于什么上下文使用它。如果是用在string上下文(用单引号或双引号引住，或者从text文件读取)的话，那它就是JSON字符串，如果是用在对象字面量上下文中，那它就是对象字面量。

	// 这是JSON字符串
	var foo = '{ "prop": "val" }';
	 
	// 这是对象字面量
	var bar = { "prop": "val" };

还有一点需要知道的是，JSON.parse用来将JSON字符串反序列化成对象，JSON.stringify用来将对象序列化成JSON字符串。

**老版本的浏览器不支持这个对象，但你可以通过json2.js来实现同样的功能。**

### 原型 ###
* * *

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
	
如果我们彻底改变函数的prototype属性（通过分配一个新的对象），那原始构造函数的引用就是丢失，这是因为我们创建的对象不包括constructor属性：

	function A() {}
	A.prototype = {
	  x: 10
	};
 
	var a = new A();
	alert(a.x); // 10
	alert(a.constructor === A); // false!

让我们一起看下MDN上关于constructor的[解释](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/constructor)吧：

prototype：Returns a reference to the Object function that created the instance's prototype. 

因此，对函数的原型引用需要手工恢复：

	function A() {}
	A.prototype = {
	  constructor: A,
	  x: 10
	};
 
	var a = new A();
	alert(a.x); // 10
	alert(a.constructor === A); // true

然而，提交prototype属性不会影响已经创建对象的原型（只有在构造函数的prototype属性改变的时候才会影响到)，就是说新创建的对象才有有新的原型，而已创建对象还是引用到原来的旧原型（这个原型已经不能被再被修改了）。

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
	
因此，“动态修改原型将影响所有的对象都会拥有新的原型”是错误的，新原型仅仅在原型修改以后的新创建对象上生效。

这里的主要规则是：对象的原型是对象的创建的时候创建的，并且在此之后不能修改为新的对象，如果依然引用到同一个对象，可以通过构造函数的显式prototype引用，对象创建以后，只能对原型的属性进行添加或修改。


### 变量对象 ###
* * *

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在函数执行上下文中，VO(variable object)是不能直接访问的，此时由活动对象(activation object)扮演VO的角色。
活动对象是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。arguments属性的值是Arguments对象：

	function foo(x, y, z) {
	  // 声明的函数参数数量arguments (x, y, z)
	  alert(foo.length); // 3

	  // 真正传进来的参数个数(only x, y)
	  alert(arguments.length); // 2
	 
	  // 参数的callee是函数自身
	  alert(arguments.callee === foo); // true
	}

当进入执行上下文(代码执行之前)时，VO里已经包含了下列属性：

1. 函数的所有形参(如果我们是在函数执行上下文中)；
2. 所有函数声明(FunctionDeclaration, FD)；
3. 所有变量声明(var, VariableDeclaration)；


另一个经典例子：

	alert(x); // function
	 
	var x = 10;
	alert(x); // 10
	 
	x = 20;
	 
	function x() {};
	 
	alert(x); // 20

根据规范函数声明是在当进入上下文时填入的; 在进入上下文的时候还有一个变量声明“x”，那么正如我们在上面所说，**变量声明在顺序上跟在函数声明和形式参数声明之后**，而且在这个进入上下文阶段，变量声明不会干扰VO中已经存在的同名函数声明或形式参数声明。



变量相对于简单属性来说，变量有一个特性(attribute)：{DontDelete},这个特性的含义就是不能用delete操作符直接删除变量属性。

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


### this
* * *

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。如果调用括号()的左边是引用类型的值，this将设为引用类型值的base对象（base object），在其他情况下（与引用类型不同的任何其它属性），这个值为null。不过，实际不存在this的值为null的情况，因为当this的值为null的时候，其值会被隐式转换为全局对象。
	

	(function () {
	  alert(this); // null => global
	})();


在这个例子中，我们有一个函数对象但不是引用类型的对象（它不是标示符，也不是属性访问器），相应地，this值最终设为全局对象。

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

问题在于后面的三个调用，在应用一定的运算操作之后，在调用括号的左边的值不在是引用类型。

1. 第一个例子很明显———明显的引用类型，结果是，this为base对象，即foo。
2. 在第二个例子中，组运算符并不适用，想想上面提到的，从引用类型中获得一个对象真正的值的方法，如GetValue。相应的，在组运算的返回中———我们得到仍是一个引用类型。这就是this值为什么再次设为base对象，即foo。
3. 第三个例子中，与组运算符不同，赋值运算符调用了GetValue方法。返回的结果是函数对象（但不是引用类型），这意味着this设为null，结果是global对象。
4. 第四个和第五个也是一样——逗号运算符和逻辑运算符（OR）调用了GetValue 方法，相应地，我们失去了引用而得到了函数。并再次设为global。


正如我们知道的，局部变量、内部函数、形式参数储存在给定函数的激活对象中。

	function foo() {
	   function bar() {
	      alert(this); // global
	   }
	   bar(); // the same as AO.bar()
	}

活动对象总是作为this返回，值为null——（即伪代码的AO.bar()相当于null.bar()）。这里我们再次回到上面描述的例子，this设置为全局对象。


### 作用域链 ###

通过函构造函数创建的函数的[[scope]]属性总是唯一的全局对象。

一个重要的例外，它涉及到通过函数构造函数创建的函数。

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
还有：

	var x = 10, y = 10;
	 
	with ({x: 20}) {
	 
	  var x = 30, y = 30;
	 //这里的 x = 30 覆盖了x = 20；
	  alert(x); // 30
	  alert(y); // 30
	}
	 
	alert(x); // 10
	alert(y); // 30

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
		
	function () {
	  ...
	}();
	 
	// 即便有名称
	 
	function foo() {
	  ...
	}();

我们使用了函数声明，上述2个定义，解释器在解释的时候都会报错，但是可能有多种原因。

如果在全局代码里定义（也就是程序级别），解释器会将它看做是函数声明，因为他是以function关键字开头，第一个例子，我们会得到SyntaxError错误，是因为函数声明没有名字（我们前面提到了函数声明必须有名字）。

第二个例子，我们有一个名称为foo的一个函数声明正常创建，但是我们依然得到了一个语法错误——没有任何表达式的分组操作符错误。在函数声明后面他确实是一个分组操作符，而不是一个函数调用所使用的圆括号。所以如果我们声明如下代码：

	// "foo" 是一个函数声明，在进入上下文的时候创建
	alert(foo); // 函数
	function foo(x) {
	   alert(x);
	}(1); // 这只是一个分组操作符，不是函数调用！
	foo(10); // 这才是一个真正的函数调用，结果是10


创建表达式最简单的方式就是用分组操作符括号，里边放入的永远是表达式，所以解释器在解释的时候就不会出现歧义。在代码执行阶段这个的function就会被创建，并且立即执行，然后自动销毁（如果没有引用的话）

	(function foo(x) {
	    alert(x);
	})(1); // 这才是调用，不是分组操作符

上述代码就是我们所说的在用括号括住一个表达式，然后通过（1）去调用。

注意，下面一个立即执行的函数，周围的括号不是必须的，因为函数已经处在表达式的位置，解析器知道它处理的是在函数执行阶段应该被创建的FE，这样在函数创建后立即调用了函数。


	var foo = {
	  	bar: function (x) {
	    	return x % 2 != 0 ? 'yes' : 'no';
	 	}(1)
	};
	 
	alert(foo.bar); // 'yes'

就像我们看到的，foo.bar是一个字符串而不是一个函数，这里的函数仅仅用来根据条件参数初始化这个属性——它创建后并立即调用。

	因此，”关于圆括号”问题完整的答案如下：
	当函数不在表达式的位置的时候，分组操作符圆括号是必须的——也就是手工将函数转化成FE。
	如果解析器知道它处理的是FE，就没必要用圆括号。

自由变量：

	function testFn() {
	   var localVar = 10;//对于innerFn函数来说，localVar就属于自由变量。
	   function innerFn(innerParam) {
	      alert(innerParam + localVar);
	   }
	   return innerFn;
	}

闭包的静态作用域：

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


**理论**：因为作用域链，使得所有的函数都是闭包（与函数类型无关： 匿名函数，FE，NFE，FD都是闭包）。

**从实践角度**：以下函数才算是闭包：

* 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）

* 在代码中引用了自由变量


## 最后： ##

ECMAScript是一种面向对象语言，支持基于原型的委托式继承。


[guide]:http://book.douban.com/subject/10549733/
