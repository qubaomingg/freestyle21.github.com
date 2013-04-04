---
layout: post
title: 淘宝UED的前端招聘测试题
description: 实现一个鼠标点击后产生的特殊效果。。
category: frontend
imgsrc: img/ued.jpg
---
## 引言

&nbsp;&nbsp;&nbsp;&nbsp;最近考试完了，总算有时间做自己喜欢的事情，最嗨皮的是三天学了一学期的，居然全过了，(～ o ～)~zZ，关于上课和学习，从来都不觉得课堂上能够学到能用了，还是自己看最靠谱。。

&nbsp;&nbsp;&nbsp;&nbsp;中午吃完饭后习惯性的浏览收藏夹里面的博客。不过似乎要过年了，F2Eer都变懒了~
taobaoUED有了更新，这个团队都是走在业界的前沿，每次都是最先尝试别人不愿意试的技术，赞~\(≧▽≦)/~。
时光星球那个做的很炫，用SVG画的那些小星星，js控制的opacity。不过性能感觉略低，CPU从来没有下40%；还有下面还报了unsafe Javascript的错误，应该是父窗口有把Domain,protocol,port之类的改了，然后子窗口得不到父窗口的句柄。不过总体上还是很赞的~
顺着首页进去，招聘的flash很简洁，很有新意~直接跳过交互和视觉，看了下前端的招聘。

小测试是这样的：就是把以前的radio变成图片。

![question](/images/taobaoUED/question.jpg)

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
把radio的input隐藏了，然后设置点边框。
贴下js代码：
	
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

&nbsp;&nbsp;&nbsp;&nbsp;上面的js代码中有一点需要注意，就是在点击事件中，一定要判断当前的div和上一个picColorSelect Div是否一样，可以节约一点点时间和空间。当然if（this._obj）是为了防止代码被乱拷，然后就不知怎么就崩了。。
在test2.html中可以看到传过去的值是正确的：

![final](/images/taobaoUED/final.jpg)
兼容性方面，用的jquery，基本上没有什么问题；css中没有margin，自然也灭有ie6下的双边距。最后再ie6,7,8都测了，都没有问题~
 
最后代码都放在了[github](https://github.com/freestyle21/taobaoUEDTest)上面，欢迎吐槽~

