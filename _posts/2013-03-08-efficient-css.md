---
layout:     post
title:      翻译-高效的CSS
category: frontend
imgsrc: data:image/gif;base64,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
<!-- imgsrc: img/efficient-css.jpeg -->
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
