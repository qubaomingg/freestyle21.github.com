---
layout: post
title: 从jQuery学到的皮毛
description: 最近学习了jQuery的源码，感触很深，记录之。
category: blog
imgsrc: data:image/gif;base64,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
<!-- imgsrc: img/dream.jpg -->
---

##前言

&nbsp;&nbsp;&nbsp;&nbsp;最近看了两遍jQuery源码，感觉只是看懂了jQuery的小部分小部分，不过仅此，就已经对john resig佩服的五体投地咯。。

下面附上这位帅哥的靓照，记住吧，是他改变了世界。


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![1](/img/jQueryCode/john-resig.png)


&nbsp;&nbsp;&nbsp;&nbsp;看的大多是实现的细节、技巧，整体的架构还是没有看出来。功力不够呀，还得慢慢修炼。jQuery真的是值得去读无数次的东西，每读一次，都会有不一样的收获。以后有空就多看看吧~

&nbsp;&nbsp;&nbsp;&nbsp;研读优秀框架的源码，是从初级jser进阶到中级jser的捷径，可以学到好多优秀代码的风格。从代码可以看出一个程序员的水平呀~

&nbsp;&nbsp;&nbsp;&nbsp;现在把自己看出来的一些帅呆了的技巧，细节记录下来，一起分享。

##jQuery的细节技巧
### **巧用条件运算符**

<pre><code>
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
</code></pre>	
	

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

<pre><code>
	// 简单的for-in（事件）  
	for ( type in events ) {  
	  
	} 
</code></pre>	
	
2、

	// 缓存length属性，避免每次都去查找length属性，稍微提升遍历速度  
	for ( var j = 0, l = arrow.length; j < l; j++ ) {  
	  
	}  

3、


<pre><code>
	// 不比较下标，直接判断元素是否为true（强制类型转换）  
	var elem;  
	for ( var i = 0; elems[i]; i++ ) {  
	    elem = elems[i];  
	    // ...  
	} 
</code></pre>	
	

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

<pre><code>
	//倒序遍历，有利于浏览器优化，稍微提升遍历速度  
	for ( var i = this.props.length, prop; i; ) {  
	    prop = this.props[ --i ];  
	    event[ prop ] = originalEvent[ prop ];  
	} 	
</code></pre>	
	

7、

<pre><code>
	// while检查下标i  
	var i = arr.length;  
	while( i-- ) {  
	    obj[ arr[i] ] = deferred[ arr[i] ];  
	}
</code></pre>	
	

### **通过闭包，返回前一作用域的参数**


<pre><code>
	//	闭包。返回的函数保持对guid的引用。
	function a(){
	    var guid = 1;
	    return function(){
	        return guid++;
	    }
	}
	var defer = a();
</code></pre>	
	

###  **一次实现多种方法**


<pre><code>
	if ( rfxtypes.test(val) ) {
		// 如果是toggle，则判断当前是否hidden，如果hidden则show，否则hide
		// 如果不是toggle，说明val是hide/show之一
		e[ val === "toggle" ? (hidden ? "show" : "hide") : val ]();

	} else {。。。}
</code></pre>	
	
	
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


<pre><code>
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
</code></pre>	
	

通过each方法，实现n多方法。到此，除了惊叹还是惊叹。

### **实例化jQuery对象**

先看代码：


<pre><code>
	jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	}
</code></pre>	
	

这里jQuery对象就是jQuery.fn.init对象

如果执行new jQeury(),生成的jQuery对象会被抛弃，最后返回 jQuery.fn.init对象;

因此可以直接调用jQuery( selector, context )，没有必要使用new关键字
还有一行代码如下：

<pre><code>
	jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype
</code></pre>	
	

所有挂载到jQuery.fn的方法，相当于挂载到了jQuery.prototype，即挂载到了jQuery 函数上（一开始的 jQuery = function( selector, context ) ），但是最后都相当于挂载到了 jQuery.fn.init.prototype，即相当于挂载到了一开始的jQuery 函数返回的对象上，即挂载到了我们最终使用的jQuery对象上。

这里的init函数里面执行了，我们平时接触具多的选择器。简单分析如下：


<pre><code>
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
</code></pre>	
	


### **jQuery 巧妙避免ReferenceError**
在源码中，经常看到这样的代码：

<pre><code>
	args = args || [];
</code></pre>	
	

这样可以确保args可用，一个避免null，underfined造成的ReferenceError的常见技巧。
比如我们还可以看到这样的：


<pre><code>
	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	}//这里和上面的条件运算符效果差不多。

	name = jQuery.cssProps[ origName ] || origName;
</code></pre>	
	

在很多需要传入选项对象的函数中，如果用户自己传入，就用用户传进的；如果用户没有传值，则用开发者默认的参数。这样的代码很帅气有木有！

##jQuery的实现框架


<pre><code>
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
</code></pre>	
	


## 结语

&nbsp;&nbsp;&nbsp;&nbsp;以上分析，都只是jQuery的一些皮毛，还有很多很多没有发现，以后有时间，有机会再研究咯~

&nbsp;&nbsp;&nbsp;&nbsp;总之每看一次，都会有很大的收获，成长。

&nbsp;&nbsp;&nbsp;&nbsp;最近状态不好，做事效率很低。以后看书码代码的时候，要关了qq，微博，河畔。。。


&nbsp;&nbsp;&nbsp;&nbsp;离开用心，新的开始。虽然很多不舍，但必须面对，做出选择。对于有些人，应该就是永远不见，有些人，真舍不得。

&nbsp;&nbsp;&nbsp;&nbsp;做喜欢的事，做好喜欢的事。加油，fs21~~





