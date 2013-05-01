---
layout: post
title: 淘宝UED的前端招聘测试题
description: 实现一个鼠标点击后产生的特殊效果。。
category: frontend
<!--imgsrc: img/ued.jpg-->
imgsrc: data:image/gif;base64,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
---
## 引言

&nbsp;&nbsp;&nbsp;&nbsp;最近考试完了，总算有时间做自己喜欢的事情，最嗨皮的是三天学了一学期的，居然全过了，(～ o ～)~zZ，关于上课和学习，从来都不觉得课堂上能够学到能用了，还是自己看最靠谱。。

&nbsp;&nbsp;&nbsp;&nbsp;中午吃完饭后习惯性的浏览收藏夹里面的博客。不过似乎要过年了，F2Eer都变懒了~
taobaoUED有了更新，这个团队都是走在业界的前沿，每次都是最先尝试别人不愿意试的技术，赞~\(≧▽≦)/~。
时光星球那个做的很炫，用SVG画的那些小星星，js控制的opacity。不过性能感觉略低，CPU从来没有下40%；还有下面还报了unsafe Javascript的错误，应该是父窗口有把Domain,protocol,port之类的改了，然后子窗口得不到父窗口的句柄。不过总体上还是很赞的~
顺着首页进去，招聘的flash很简洁，很有新意~直接跳过交互和视觉，看了下前端的招聘。

小测试是这样的：就是把以前的radio变成图片。

![question](/img/taobaoUED/question.jpg)

码代码之前先分析一下：

&nbsp;&nbsp;&nbsp;&nbsp;radio不能加背景或图片，所以要实现上面这个效果，只能通过js控制dom样式来实现；要保证后端的同学能够得到用户的点击结果，所以带有radio的form又是不能少的，所有这里我们把它隐藏了。稍有难度的就是点击过后的红色边框效果，右下角有一个红色的勾。第一反应是把外围的红色看成一幅图，当成外围div的background。不过这样有一个问题，就是图片会把父div右下角勾挡住。最后决定把右下角的勾单独当成一个图片，然后定位到带有红色border的img右下角。当然也可以用svg或canvas来画出右下角的勾，不过这样兼容性又是各种蛋疼，先还是把图片的实现吧。
## 实现
下面是具体实现：


	<form action = "./test2.html" method = 'post' name ='userColorForm' class='userColorForm'>
	    <fieldset>
	        <legend>MyValue</legend>    
	        <div class = 'radioColorParent'>
	            <input class = 'radioColor' type = "radio" name =  "userColor" value = "brown" checked> 棕色
	            <input class = 'radioColor' type = "radio" name = "userColor" value = "yellow"> 黄色
	            <input class = 'radioColor' type = "radio" name = "userColor" value = "purplishRed"> 紫红色
	        </div>
	                                                                                                       
	        <div class = 'picColor'> 
		        <div class = 'picColorImgParent'> 
		          <img class = 'picColorImg' src = "1.jpg" alt = "">                  
		          <img class = 'picColorTriangle' src="picColorTriangle.png" alt="">
		        </div>
		        <div class = 'picColorImgParent'> 
		          <img class = 'picColorImg' src = "1.jpg" alt = "">   
		          <img class = 'picColorTriangle'src="picColorTriangle.png" alt="">
		          </div>
		        <div class = 'picColorImgParent'> 
		         <img class = 'picColorImg' src = "3.jpg" alt = "">          
		         <img class = 'picColorTriangle'src="picColorTriangle.png" alt="">
		        </div>
	        </div>
	    	<input type="submit" value='submit'>
		</fieldset>
	</form>
	

以上就是实现基本的html代码，把几个为radio的input隐藏了。

<pre><code>
	css：
	.userColorForm fieldset{
	      border: none;
	}
	.userColorForm legend{
	      display: none;
	}
	                                                                           
	.radioColorParent{
	      display: none;
	}
	.picColor{
	      overflow: hidden;
	}
	div.picColorImgParent{
	      float: left;
	      padding-left: 10px;
	      cursor: pointer;
	      position: relative;
	}
	.picColorImg{
	      width: 32px;
	      height: 32px;
	      border: 1px #c8c9cd solid;
	}
	img.picColorSelect{
	      border: 2px #c40008 solid;
	      border-top: 1px #c40008 solid;
	}
	.picColorTriangle{
	      position: absolute;
	      bottom: 4px;
	      right: 0px;
	      display: none;
	}
</code></pre>
	
把radio的input隐藏了，然后设置点边框。
贴下js代码：
	

<pre><code>
	$(document).ready(function(){
    	var UserColorSelect = function(){};
    	UserColorSelect.prototype = {
       		init: function(obj){
	            this._obj = obj;
	              this._obj.eq(0).find('img').eq(0)
	                    .addClass('picColorSelect');                            
	                    this._obj.eq(0).find('img').eq(1).css('display', 'inline-block');
        	},
	        //传入一个div对象，然后对他的两个img元素进行操作。
	        changeStyle: function(){
	          if(this._obj){
	            this._obj.click(function(){
	             var $OldParent = $('.picColorSelect').parent();
	             if($OldParent !== this){
	                  //处理上一个picColorSelect
	                     $OldParent.find('img').eq(0)
	                          .removeClass('picColorSelect');
	                                                                                                          
	                     $OldParent.find('img').eq(1)
	                          .css('display','none');
	                  //更新现在点的。
	                       $(this).find('img').eq(0)
	                            .addClass('picColorSelect');
	                       $(this).find('img').eq(1)
	                            .css('display','inline-block');    
	              }
	             });
	            }
	        },
	        updateRadio:function(){
	          if(this._obj){
	              this._obj.click(function(){
	                var whichNum = $(this).index();
	                  $('.radioColor').eq(whichNum)
	                      .attr('checked','true');
	               });
	          }
	        }
		}
                                                                                 
	  	usercolorselect = new UserColorSelect();
		usercolorselect.init($('.picColorImgParent'));
		usercolorselect.changeStyle();
		usercolorselect.updateRadio();
	});        
</code></pre>
	

&nbsp;&nbsp;&nbsp;&nbsp;上面的js代码中有一点需要注意，就是在点击事件中，一定要判断当前的div和上一个picColorSelect Div是否一样，可以节约一点点时间和空间。当然if（this._obj）是为了防止代码被乱拷，然后就不知怎么就崩了。。
在test2.html中可以看到传过去的值是正确的：

![final](/img/taobaoUED/final.jpg)


兼容性方面，用的jquery，基本上没有什么问题；css中没有margin，自然也灭有ie6下的双边距。最后再ie6,7,8都测了，都没有问题~
 
最后代码都放在了[github](https://github.com/freestyle21/taobaoUEDTest)上面，欢迎吐槽~

