---
layout: post
title: 关于js修改三种css样式的方法
description: 用$('#myimg').style.left居然不能获取left属性，解释原因！
category: frontend
imgsrc: img/3way.jpg

---

&nbsp;&nbsp;&nbsp;&nbsp;晚上随便写了一个demo，要用js通过特定的方式来修改图片的定位，还有width和height等，完成预想的动画。

##遇到的问题是：

最开始在.css文件里面设置了图片的position：absolute；left等属性，现在想要把他的left设置为left -=left+temp；即要获取元素的left。

之前没有细想，每次都是$("img").style.left就可以了，不过这次alert出来的居然是空字符串。
现在想想 .style获取的应该是标签的style属性，然后依次获取其他子属性。所以.style.只能获取行内样式。。于是想方设法的去搞到.css里面的属性。

##深入

**怎么才能获取 head中style的css 或者 .css文件中的属性呢？**
	
IE中使用的是obj.currentStyle方法，FF是用的是getComputedStyle 方法。

<pre><code>
	function getDefaultStyle(obj,attribute){ 
		return obj.currentStyle ? obj.currentStyle[attribute]
		    : document.defaultView.getComputedStyle(obj,false)[attribute];   
	}
</code></pre>


或者：


<pre><code>
	function getDefault(obj){ 
 		 return obj.currentStyle ?  obj.currentStyle
        	:document.defaultView.getComputedStyle(obj,false);   
	}
</code></pre>
	

例子：
使用javascript更改某个css class的属性... 

<pre><code>
    .orig { 
        display: none; 
    } 
</code></pre>
	

你想要改变把他的display属性由none改为inline。 
解决办法： 在IE里： 
	
<pre><code>
	document.styleSheets[0].rules[0].style.display = "inline";
</code></pre>
	

在firefox里：
	
<pre><code>
	document.styleSheets[0].cssRules[0].style.display = "inline";
</code></pre>
	

讨论： 可以做一个函数来搜索特定名字的style对象： 
	
	function getstyle(sname) { 
	    for (var i=0;i< document.styleSheets.length;i++) { 
	        var rules; 
	        if (document.styleSheets[i].cssRules) { 
	            rules = document.styleSheets[i].cssRules; 
	        } else { 
	            rules = document.styleSheets[i].rules; 
	        } 
	        for (var j=0;j< rules.length;j++) { 
	            if (rules[j].selectorText == sname) { 
	                return rules[j].style; 
	            } 
	        } 
	    } 
	}
	
然后只要： 

<pre><code>
	getstyle(".orig").display = "inline";
</code></pre>
	

##总结：

前面说的是怎样查询或修改外链的.css，不过，不行的是，我们不能这样做。
在ie和firefox里面确实可以实现，不过我们不提倡。

在chrome里面的cssRules会是null，stackoverflow里面说的是跨域，不过也不存在吧，。
所以，最好的方式还是直接修改dom里面的属性。
 
弄了一晚上，算是弄得比较明白了。有些细节要去追究一下，才能得到更多的东西。虽然自己想要的没有得到，不过却可以得到很多收获。
