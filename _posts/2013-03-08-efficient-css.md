---
layout:     post
title:      翻译-高效的CSS
category: frontend
imgsrc: img/efficient-css.jpeg
description: 翻译的文章，高效的CSS。
---

## 译言：

&ensp;&ensp;&ensp;&ensp;逛微博的时候看到 [@程序员的那些事](http://weibo.com/u/2093492691) 推荐的一篇CSS的文章。细细看了下，写的很不错，就翻译过来，与诸前端们共享~
原文地址在[这里](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)，由于第一次翻译文章，有不准确的地方欢迎留言讨论~~

## 译文：

高效的CSS已经不是一个新的话题了，也不是我一个非得重拾的话题，但它却是我在Sky公司工作之时，所感兴趣的，关注已久的话题。

有很多人都忘记了，或在简单的说没有意识到，CSS在我们手中，既能很高效，也可以变得很低能。这很容易被忘记，尤其是当你意识到你会的太少，CSS代码效率很低的时候。

下面的规则只真正被应用到那些速度要求很高，有成百上千的DOM元素被绘制在页面上的大型网站。但是，实践出真理，这和你是在创建下一个Facebook，还是写一个本地的展示页面都没有关系，多知道一点总是好的。

### CSS选择器：

对我们大多数人来说，CSS选择器并不陌生。最基本的选择器是元素选择器(比如div),ID选择器(比如#header)还有类选择器(比如.tweet)。

一些的不常见的选择器包括伪类选择器(:hover)，很多复杂的CSS3和正则选择器，比如：first-child，[class ^= “grid-”].

CSS选择器具有高效的继承性，引用Steve Souders的话， CSS选择器效率从高到低的排序如下：

1. 	ID选择器 比如#header
2.	类选择器 比如.promo
3.	元素选择器 比如 div
4.	兄弟选择器 比如 h2 + p
5.	子选择器 比如 li > ul
6.	后代选择器 比如 ul a
7.	通用选择器 比如 *
8.	属性选择器 比如 [type = “text”]
9.	伪类/伪元素选择器 比如 a:hover

以上引用自[Steve Souders](http://stevesouders.com/)的Even Faster网站、

我们不得不提的是，纵使ID选择器很快、高效，但是它也仅仅如此。从Steve Souders的CSS Test我们可以看出[ID选择器](http://stevesouders.com/efws/CSS-selectors/CSScreate.php?n=1000&sel=%23id&body=background%3A+%23CFD&ne=1000)和[类选择器](http://stevesouders.com/efws/CSS-selectors/CSScreate.php?n=1000&sel=.class&body=background%3A+%23CFD&ne=1000)在速度上的差异很小很小。

在Windows系统上的Firefox 6上，我测得了一个简单类选择器的（reflow figure）重绘速度为10.9ms，而ID选择器为12.5ms，所以事实上ID比类选择器重绘要慢一点点。

ID选择器和类选择器在速度上的差异基本上没有关系。

在一个标签选择器(a)的测试上显示，它比类或ID选择器的速度慢了[很多](http://stevesouders.com/efws/CSS-selectors/CSScreate.php?n=1000&sel=a&body=background%3A+%23CFD&ne=1000)。在一个嵌套很深的后代选择器的测试上，显示数据为[440左右](http://stevesouders.com/efws/CSS-selectors/CSScreate.php?n=1000&sel=div+div+div+div+div+div+a&body=background%3A+%23CFD&ne=1000)！从这里我们可以看出ID/类选择器 和 元素/后代选择器中间的差异较大，但是相互之间的差异较小。

**注意：** 这些数据可能在不同计算机和浏览器中间的差异较大。强烈地建议大家在自己的机子上测试一下。

### 组合选择器

你可以有一个标准的选择器比如 #nav，来选择任何带有ID为"nav"的元素，或在你可以有一个组合选择器比如#nav a,来选择任何在ID为’nav’的元素里面的链接元素

此刻，我们读这些是从左到右的方式。我们是先找到#nav，然后从它的里面找其他元素。但是浏览器解析这些不是这样的：浏览器解析选择器是从右到左的方式。

在我们看来，#nav里面带了一个a，浏览器却是看到的a在#nav里面。这些细微的差异对选择器的效率有很大的影响，同时学这些差异也是很有价值的。

如果想要知道更多浏览器这样解析的原因，请看[Stack Overflow](http://stackoverflow.com/questions/5797014/why-do-browsers-match-CSS-selectors-from-right-to-left)上的讨论

浏览器从最右边的元素开始（它想要渲染的元素），然后用它的方式回溯DOM树比从DOM树的最高层开始选择向下寻找，甚至可能达不到最右边的选择器—关键的选择器要高效。

这些对CSS选择器的效率有很大的影响。

### 关键选择器

关键选择器，正如前面讨论的一样，是一个复杂的CSS选择器中最右边部分。它是浏览器最先寻找的。

现在我们回到讨论开始的地方，哪类选择器是最高效的？哪个是会影响选择器效率的关键选择器；写CSS代码的时候，关键选择器是能否高效的决定因素。
一个关键CSS选择器像这样：

	#content .intro {..}

是不是高效选择器比如类选择器天生就高效？浏览器会寻找.intro的实例（可能会很多），然后沿着DOM树向上查找，确定刚才找到的实例是否在一个带有ID为”content”的容器里面。

但是，下面的选择器就表现的不是那么好了：
	
	#content * {..}

这个选择器所做的是选择所有在页面上的单个元素（是每个单个的元素），然后去看看它们是否有一个 #content 的父元素。这是一个非常不高效选择器因为它的关键选择器执行开销太大了。

运用这些知识我们就可以在分类和选择元素的时候做出更好的选择。

假设你有一个复杂的页面，它相当巨大并且在你的一个很大很大的站点上。在那个页面上有成百上千甚至上万的 a 标签。它还有一个小的社交链接区域放在一个ID为#social的Ul里面。我们假设它们是Twitter，Facebook，Dribbble还有Google+的链接吧。在这个页面上我们有四个社交链接和成百上千的其他链接。
下面的这个选择器就自然的不是那么高效和合理了：
	
	#social a {…}

这里发生的情况是浏览器会在定位到#social区域下的四个链接之前得到页面上所有成千上万的链接。我们的关键选择器匹配了太多我们不感兴趣的其他元素。

为了补救我们可以给每个在社交链接区域的 a 增加一个更特殊、明确的选择器 .social-link ,
但是这好像有点违背我们的认知：当我们能用组合选择器的时候就不要放不必要的类标示在元素上。

这就是为什么我对选择器的性能如此感兴趣的原因了：必须在web 标准最佳实践和速度之间的保持平衡。

通常我们有：

	<ul id="social">
	    <li><a href="#" class="twitter">Twitter</a></li>
	    <li><a href="#" class="facebook">Facebook</a></li>
	    <li><a href="#" class="dribble">Dribbble</a></li>
	    <li><a href="#" class="gplus">Google+</a></li>
	</ul>

	

CSS:

<pre><code>
	#social a {}
</code></pre>
	
	

我们现在最好有：

	
	<ul id="social">
	    <li><a href="#" class="social-link twitter">Twitter</a></li>
	    <li><a href="#" class="social-link facebook">Facebook</a></li>
	    <li><a href="#" class="social-link dribble">Dribbble</a></li>
	    <li><a href="#" class="social-link gplus">Google+</a></li>
	</ul>


加上CSS：
	
<pre><code>
	#social .social-link {}
</code></pre>
	

这个新的关键选择器将会匹配更少的元素，这意味着浏览器能够很快的找到它们并渲染特定的样式，然后专注于下一件事。

另外，事实上我们可以用.social-link{}更清晰的选择，而不是过分限制它。阅读下一部分你会原因…

简单的重述一次，你的关键选择器会决定浏览器的工作量，因此，我们应该重视一下关键选择器

### 过度限制选择器

现在我们知道了什么是关键选择器，还有它是大部分工作的来源，但是我们可以更乐观一点。拥有一个明确的关键选择器最大的好处就是你可以避免使用过度限制选择器。一个过度限制选择器可能像：


<pre><code>
	html body .wrapper #content a {}
</code></pre>

	

这里的写的太多了，至少3个选择器是完全不需要的。它可以最多像这个样子：

<pre><code>
	#content a {}
</code></pre>

	

这会发生什么呢？
首先第一个意味着浏览器不得不寻找所有的 a 元素，然后检查他们是否在一个ID为”content”的元素中，然后如此循环直到HTML标签。这样造成了太多的我们不太想要的花费。了解了这个，我们得到一些更现实的例子：

<pre><code>
	#nav li a{}
</code></pre>
	

变成这个：


<pre><code>
	#nav a {}
</code></pre>	
	

我们知道如果a在li里面，它也必定在#nav里面，所有我们可以马上把li从选择器组中拿掉。然后，既然我们知道在页面中只有一个ID为nav的元素，那么它依附的元素就是完全没有关系得了，我们也可以拿掉ul

过度限制选择器使浏览器工作比它实际需要的更繁重，花费的时间更多。我们可以删掉不必需的限制，来使我们的选择器更简单和高效。

### 这些真的需要吗？

最短的答案是:或许不是。

最长的答案是：它取决于你正在搭建的站点。如果你正在为你的晋升而努力，那么就好好写出简单、高效的CSS代码吧，因为你可能不会感觉到它给你带来的改变。
如果你正在搭建下一个每个页面都以毫秒计算的Amazon网站，这样有时速度会很快，但有时可能不是。

浏览器将会在解析CSS的速度上变得更好，甚至在手机端。在一个网站上，你不太可能会觉察到一个低效的CSS选择器，但是….

### 但是

它确实发生了，浏览器还是不得不去做我们讨论的所有工作，无论它们变得多快。即使你不需要或者甚至不想实践任何一个，但是它都是我们值得学习的知识。请记住选择器可能会让你付出很大代价，你应该避免盯着一个看。这意味着如果你发现你自己在写像这样的：


<pre><code>
	div:nth-of-type(3) ul:last-child li:nth-of-type(odd) *{ font-weight:bold }
</code></pre>
	

这时，你可能就做错了。

现在，在高效选择器的世界我还是一个新人。所以如果我忘记了什么，或者你有需要补充的，请在评论里面留言。

### 更多高效选择器


我还不能完全介绍Steve Souders的网站和书籍，它们是如此之好，以至于值得你花更多时间来阅读和推荐。这个家伙只有他自己才了解自己！
