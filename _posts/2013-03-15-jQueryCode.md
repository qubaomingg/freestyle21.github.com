---
layout: post
title: 从jQuery学到的皮毛
description: 最近学习了jQuery的源码，感触很深，记录之。
category: blog
---

##前言

&nbsp;&nbsp;&nbsp;&nbsp;最近看了两遍jQuery源码，感觉只是看懂了jQuery的小部分小部分，不过仅此，就已经对john resig佩服的五体投地咯。。

下面附上这位帅哥的靓照，记住吧，是他改变了世界。


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![1](/images/jQueryCode/john-resig.png)


&nbsp;&nbsp;&nbsp;&nbsp;看的大多是实现的细节、技巧，整体的架构还是没有看出来。功力不够呀，还得慢慢修炼。jQuery真的是值得去读无数次的东西，每读一次，都会有不一样的收获。以后有空就多看看吧~

&nbsp;&nbsp;&nbsp;&nbsp;研读优秀框架的源码，是从初级jser进阶到中级jser的捷径，可以学到好多优秀代码的风格。从代码可以看出一个程序员的水平呀~

&nbsp;&nbsp;&nbsp;&nbsp;现在把自己看出来的一些帅呆了的技巧，细节记录下来，一起分享。

##jQuery的细节技巧
### **巧用条件运算符**

	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).r出现eplace( trimRight, "" );
	}

这里用了一个条件运算符，如果String.trim存在的话就用，不存在就用自己实现的trim函数。在jQuery的源码中，用了大量的这种技巧,比如：

	data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				!jQuery.isNaN( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
	for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {}



多用点这种技巧，就不用满屏幕都是if & else 了。代码会变得简洁，轻巧。

### **jQuery的循环遍历技巧**

下面列出一些自己看出的、常见的、平时代码中常用的循环技巧

1、	
	// 简单的for-in（事件）  
	for ( type in events ) {  
	  
	} 
2、
	// 缓存length属性，避免每次都去查找length属性，稍微提升遍历速度  
	for ( var j = 0, l = arrow.length; j < l; j++ ) {  
	  
	}  

3、
	// 不比较下标，直接判断元素是否为true（强制类型转换）  
	var elem;  
	for ( var i = 0; elems[i]; i++ ) {  
	    elem = elems[i];  
	    // ...  
	} 

4、
	// 遍历动态数组（事件），不能缓存length属性，j++之前先执行j--
	for ( j = 0; j < eventType.length; j++ ) {  
	eventType.splice( j--, 1 );  
	}  
	for ( var i = 1; i < results.length; i++ ) {  
	    if ( results[i] === results[ i - 1 ] ) {  
	        results.splice( i--, 1 );  
	    }  
	}  
这个细节要注意哈，稍不注意就会在这里折腾很久。动态数组不能缓存！

5、
	// 迭代过程中尽可能减少遍历次数（事件），从pos开始
	for ( j = pos || 0; j < eventType.length; j++ ) {  
	  
	} 


6、
	//倒序遍历，有利于浏览器优化，稍微提升遍历速度  
	for ( var i = this.props.length, prop; i; ) {  
	    prop = this.props[ --i ];  
	    event[ prop ] = originalEvent[ prop ];  
	} 	

7、
	// while检查下标i  
	var i = arr.length;  
	while( i-- ) {  
	    obj[ arr[i] ] = deferred[ arr[i] ];  
	}

### **通过闭包，返回前一作用域的参数**

	//	闭包。返回的函数保持对guid的引用。
	function a(){
	    var guid = 1;
	    return function(){
	        return guid++;
	    }
	}
	var defer = a();

###  **一次实现多种方法**

	if ( rfxtypes.test(val) ) {
		// 如果是toggle，则判断当前是否hidden，如果hidden则show，否则hide
		// 如果不是toggle，说明val是hide/show之一
		e[ val === "toggle" ? (hidden ? "show" : "hide") : val ]();

	} else {。。。}
	
条件运算符 + 关联数组 一次实现三种方法，帅呆了！不过貌似这种方法平时用的不多。

同样的思想还有一处：

	jQuery.each(["live", "die"], function( i, name ) {
		jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {
			
			if ( name === "die" && !types &&
						origSelector && origSelector.charAt(0) === "." ) {

				context.unbind( origSelector );

				return this;
			}
			//....
			return this;
		};
	});

一次性实现两个方法。。

	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	    "change select submit keydown keypress keyup error").split(" "), function( i, name ) {
	    // Handle event binding
	    jQuery.fn[ name ] = function( data, fn ) {
	       return arguments.length > 0 ?
	           this.bind( name, data, fn ) :
	           this.trigger( name );
	    };
	    // 将事件名注册（添加）到jQuery.attrFn，当遇到对同名属性的操作时，转换为对事件接口的调用
	    if ( jQuery.attrFn ) {
	       jQuery.attrFn[ name ] = true;
	    }
	});

通过each方法，实现n多方法。到此，除了惊叹还是惊叹。

### **实例化jQuery对象**

先看代码：

	jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	}

这里jQuery对象就是jQuery.fn.init对象

如果执行new jQeury(),生成的jQuery对象会被抛弃，最后返回 jQuery.fn.init对象;

因此可以直接调用jQuery( selector, context )，没有必要使用new关键字
还有一行代码如下：

	jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype

所有挂载到jQuery.fn的方法，相当于挂载到了jQuery.prototype，即挂载到了jQuery 函数上（一开始的 jQuery = function( selector, context ) ），但是最后都相当于挂载到了 jQuery.fn.init.prototype，即相当于挂载到了一开始的jQuery 函数返回的对象上，即挂载到了我们最终使用的jQuery对象上。

这里的init函数里面执行了，我们平时接触具多的选择器。简单分析如下：

	//如果传入一个DOM元素。。包装成jQuery对象，直接返回。
	if ( selector.nodeType ) {
		this.context = this[0] = selector;
		this.length = 1;
		return this;
	}
	//如果传入一个字符串
		//如果字符串时一个类似"<a>hello</a>"样子的，直接生成。
		//传入ID，直接document.getElementById()，然后包装成jQuery对象。
	//选择器表达式，find...
	//如果传入函数，则为ready开始.


### **jQuery 巧妙避免ReferenceError**
在源码中，经常看到这样的代码：

	args = args || [];

这样可以确保args可用，一个避免null，underfined造成的ReferenceError的常见技巧。
比如我们还可以看到这样的：

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	}//这里和上面的条件运算符效果差不多。

	name = jQuery.cssProps[ origName ] || origName;

在很多需要传入选项对象的函数中，如果用户自己传入，就用用户传进的；如果用户没有传值，则用开发者默认的参数。这样的代码很帅气有木有！

##jQuery的实现框架

	(function( window, undefined ) {	
	    // 构造jQuery对象
		var jQuery = function( selector, context ) {
		        return new jQuery.fn.init( selector, context, rootjQuery );
		    }
		// 工具函数 Utilities
		// 异步队列 Deferred
		// 浏览器测试 Support
		// 数据缓存 Data
		// 队列 queue
		// 属性操作 Attribute
		// 事件处理 Event
		// 选择器 Sizzle
		// DOM遍历
		// DOM操作
		// CSS操作
		// 异步请求 Ajax
		// 动画 FX
		// 坐标和大小
		window.jQuery = window.$ = jQuery;

	})(window);


## 结语

&nbsp;&nbsp;&nbsp;&nbsp;以上分析，都只是jQuery的一些皮毛，还有很多很多没有发现，以后有时间，有机会再研究咯~

&nbsp;&nbsp;&nbsp;&nbsp;总之每看一次，都会有很大的收获，成长。

&nbsp;&nbsp;&nbsp;&nbsp;最近状态不好，做事效率很低。以后看书码代码的时候，要关了qq，微博，河畔。。。


&nbsp;&nbsp;&nbsp;&nbsp;离开用心，新的开始。虽然很多不舍，但必须面对，做出选择。对于有些人，应该就是永远不见，有些人，真舍不得。

&nbsp;&nbsp;&nbsp;&nbsp;做喜欢的事，做好喜欢的事。加油，fs21~~





