---
layout:     post
title:      邂逅Jekyll
category: frontend
description: Jekyll是一个简介的、特别针对博客平台的静态网站生成器。
imgsrc: img/yaan.gif
<!-- imgsrc: img/jekyll.png -->
---

## 1、认识Jekyll

Jekyll is a simple, blog aware, static site generator.。
It takes a template directory (representing the raw form of a website), runs it through Markdown or Textile and Liquid converters, and produces a static website suitable for any web server.


&ensp;&ensp;&ensp;&ensp;上面是摘自github上Jekyll的[说明](https://github.com/mojombo/jekyll).简单的说，Jekyll 是一个简洁的、特别针对博客平台的**静态网站生成器**。它使用一个模板目录作为网站布局的基础框架，并在其上运行 Textile 、 Markdown 或 Liquid 标记语言的转换器，最终生成一个完整的静态Web站点。jekyll+markdown+Liquid成为很简单，很舒服的写作方式。

一个典型的Jekyll站点通常具有如下结构：

![jekyllstruct](/img/jekyll/jekyllstruct.png)

###_config.yml

&ensp;&ensp;保存Jekyll配置的文件。虽然绝大部分选项可以通过命令行参数指定，但将它们写入配置文件可以使你在每次执行时不必记住它们。
比如里面写:

<pre><code>
	description:      "freestyle21\'s Blog"
</code></pre>

    

那么我们在源码中就可以通过下面这种方式去访问了：

<pre><code>
	site.description
</code></pre>

    

###_includes

该目录存放可以与_layouts和_posts混合、匹配并重用的文件。
用的不多，没有深入接触。。。

###_layouts

&ensp;&ensp;该目录存放用来插入帖子的网页布局模板。页面布局基于类似博客平台的“一个帖子接一个帖子”的原则，通过YAML前置数据定义。Liquid标签用于在页面上插入帖子的文本内容。这个用的特多，可以大大减少代码量。

###_posts

&ensp;&ensp;该目录下存放的可以说成是你的“动态内容”。这些文件的格式很重要，它们的命名模式必须遵循 year-month-date-title.markdown。每一个帖子的固定链接URL可以作弹性的调整，但帖子的发布日期和转换所使用的标记语言会根据且仅根据文件名中的相应部分来识别。

###_site

&ensp;&ensp;这里是Jekyll用以存放最终代码生成站点的根路径位置。也许把它加到你的.gitignore列表中会是个不错的主意。这个文件夹是Jekyll自动生成的，所以我们一般不用管。

###其他文件/目录

&ensp;&ensp;除了以上提到的文件之外，每一个其他的、不以下划线_开头的目录和文件都会被照原样传送到站点路径下。例如，你可以在网站根目录下面添加一个 css ,js,img目录，一个 favicon.ico ，等等等等。


##2、windows搭建Jekyll本地测试环境

&ensp;&ensp;你可以修改了代码，然后上传到github上面去，然后在刷新刷新看刚才改动的效果。不过如果能够坚持调试下来的不是大牛就是高富帅=-=。。于是在本地测试就师出有名了，改好了再上传到github上面，事半功倍。

&ensp;&ensp;看了好多别人写的博客，不过都没有一次成功的，为了方便同仁和自己，把自己的过程记录下来吧。。中间遇到好多问题，反正各种google、stackoverflow。做好过后，那些问题也都忘了怎么解决的了，所以事后写博客质量不是很好，=-=||..好了，少扯蛋，多做事：

##安装Jekyll

&ensp;&ensp;Jekyll使用Ruby编写的，所以要先配置Ruby环境，通过Ruby安装Jekyll。

&ensp;&ensp;下载RubyInstaller，(我下载的是[rubyinstaller-1.9.3-p194.exe](http://files.rubyforge.vm.bytemark.co.uk/rubyinstaller/rubyinstaller-1.9.3-p194.exe)

&ensp;&ensp;下载 DevKit(下载的是[DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe](http://cloud.github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)

 RubyInstaller安装开始的时候，有三个多选按钮，都选上~path神马的都会自动加上，不用担心。

解压DevKit，然后打开cmd，进入刚才的DevKit解压目录，输入以下命令：


<pre><code>
	Ruby dk.rb init
	Ruby dk.rn install
</code></pre>


&ensp;&ensp;DevKit是windows平台下编译和使用本地C/C++扩展包的工具。它就是用来模拟Linux平台下的make,gcc,sh来进行编译。但是这个方法目前仅支持通过RubyInstaller安装的Ruby。

下面就可以安装Jekyll了：

<pre><code>
	gem install Jekyll
</code></pre>
	

等待。。。这个时候不要关闭Git Bash。

最后，我们可以检查一下安装Jekyll成功没有：
	

<pre><code>
	Jekyll --version
</code></pre>
	

如果输出下面的结果就说明我们成功了。。

<pre><code>
	Jekyll 0.12.0
</code></pre>
	
	

接下来读者朋友可以把我的博客clone到本地，一般都clone到在C:\Users\Administrator这个目录下面：


<pre><code>
	git clone git://github.com./freestyle21/freestyle21.github.com.git
</code></pre>
	

然后进入刚才的目录里面：

<pre><code>
	cd freestyle21.github.com
</code></pre>

	

执行：


<pre><code>
	Jekyll --server --auto
</code></pre>

	

如下如：

![jekyllstruct](/img/jekyll/serverauto.png)

&ensp;&ensp;最后就是检验成果的时候了，在浏览器中输入：[localhost:4000](http://localhost:4000),就可以看到你的页面在本地跑起来了。。
这样以后调试就方便多了，在代码中修改后，只要ctrl+s保存一下，jekyll就会自动在浏览器里面更新了。。

一般都在github里面写代码的，很久没有在本地调试了，这几天有点想法，想把博客改变一下样子。但是这次居然jekyll居然不听话了，各种报错，然后就是不断的找错误。。

现在记录一下遇到的错误，以后不要在这里耽误时间了。

>问题：

<pre><code>
	Liquid error: incompatible character encodings: UTF-8 and IBM437”
</code></pre>

    
编码问题，直接在path里面添加：LC_ALL=en_US.UTF-8 和 LANG=en_US.UTF-8然后重启或者注销。

还是不行的话就将 convertible.rb 的第29行改为：
    

<pre><code>
	self.content = File.read(File.join(base, name), :encoding => "utf-8")
</code></pre>
        
        

>问题：


Liquid Exception: No such file or directory - python c:/Ruby193/lib/ruby/gems/1.9.1/gems/pygments.rb-0.3.7/lib/pygments/mentos.py in 2013-01-06-octopress.markdown

首先可以尝试一下更新Pygments，

 <pre><code>
把python里面的script目录加载path里面，然后就可以直接通过easy_install Pygments来安装了。
</code></pre>
        
        
 <pre><code>
其次Pygments是通过python来工作的，所以还要安装python。需要注意的是一定要把python的路径加到path下面。
</code></pre>
    
    


    




