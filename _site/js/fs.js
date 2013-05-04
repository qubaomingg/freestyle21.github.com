(function(S){			
	 S.use('dom,node,anim',function(S,DOM,Event,Anim){
	 	//宽度适应
		var divSum= S.all('.article').length,
			realWidth = divSum % 2 ? (divSum / 2 + 1) * 450 : (divSum / 2) * 450;
		DOM.css('#artHori', 'width', realWidth + 'px');
		DOM.css('.rightMsg', 'height', DOM.css('body','height'));
		//页面用户交互
		//article hover
		S.Event.add('.article','mouseenter mouseleave',function(ev){
			var num = DOM.index(this,'.article');
            if(ev.type == 'mouseenter'){
            	DOM.removeClass(DOM.children(this, 'img'), 'article_hoverOut');
            	DOM.addClass(DOM.children(this, 'img'), 'article_hoverIn');
            	S.all('.artDetail').item(num).stop(true,true).fadeToggle();
                
            }else if(ev.type == 'mouseleave'){
                DOM.addClass(DOM.children(this, 'img'), 'article_hoverOut');
                DOM.removeClass(DOM.children(this, 'img'), 'article_hoverIn');
                S.all('.artDetail').item(num).stop(true,true).fadeToggle();
            }
        });
		//点击进入读文章页面
		S.Event.on('.artDetail', 'click', function() {
			DOM.children(DOM.parent(this, 'div'), '.postsite')[0].click();
		});
		//点击左右
		S.Event.on('#leftArrow a', 'click', function() {
			var artHori = S.one('#artHori');
			var nowMargin = parseInt(artHori.css('marginLeft'));
			if(nowMargin >= 0 ) return false;
			else {
				new S.Anim(artHori, {'marginLeft':(nowMargin + 900) + 'px'},0.5,'backIn').run();
			}
			return false;		
		});
		S.Event.on('#rightArrow a', 'click', function() {
			var artHori = S.one('#artHori');

			var nowMargin = parseInt(artHori.css('marginLeft'));
			console.log(nowMargin);
			if(nowMargin <= (-realWidth + 900) ) return false;
			else {
				new S.Anim(artHori, {'marginLeft':(nowMargin - 900) + 'px'},0.5,'backIn').run();
			}
			return false;		
		});
		//留言高度的调节
		var isMsg = false, //反转变量。防止没有留言界面而出现缓动
			rightMsg = S.one('.rightMsg');
		var tmpHeight = parseInt(rightMsg.css('height'));
		rightMsg.css('height', -tmpHeight + 'px');
		//点击读书
		S.Event.add('.book','mouseenter mouseleave',function(ev){
            if(ev.type == 'mouseenter'){
                S.one('.tip').stop(true,true).fadeToggle();
            }else if(ev.type == 'mouseleave'){
                S.one('.tip').stop(true,true).fadeToggle();
            }
        });
        //点击留言，动画开始
        S.Event.on('.msg','click',function(){
            new S.Anim(rightMsg, {'top':'0px','right':'0px'},0.5,'backIn').run();
            new S.Anim('.topMsg', {'top':'0px','left':'0%'},0.5,'backIn').run();
            new S.Anim('#mainbody', {'top':'45px','left':'-360px'},0.5,'backIn').run();
            isMsg = true;
            return false;
        });

        //点击其他，动画复原
        S.Event.delegate('#mainbody','click',function(){return true},function() {
        	if( isMsg ) {
        		new S.Anim(rightMsg, {'right': '-300px','top':-tmpHeight +'px','right':'-360px'},0.5,'backIn').run();
	            new S.Anim('.topMsg', {'top': '-26px','left':'100%','top':'-46px'},0.5,'backIn').run();
	            new S.Anim('#mainbody', {'top':'0px','left':'0px'},0.5,'backIn').run();
	            isMsg = false;
        	}
        });
        
	});
})(KISSY);
//等图片，样式文件都加载好了再加载动画。
//mp3加载策略,点击惊喜按钮后才加载第一首音乐，当第一首歌可以播放了后才加载后一首，以此类推。
//在播放第一首的时候加载其他的。
window.onload = function() {
	(function(S) {
		var DOM = S.DOM, Event = S.Event;
		var nowplay = 0;
		var hasBuffer = false;
		var musicArr = ['./music/ByMySide.mp3', './music/yangchong.mp3','./music/WhatAreWords.mp3','./music/yirananni.mp3'],
			audioSet = {};
		function bufferOneMusic(num) {
			audioSet['audio' + num] =  document.createElement('audio');
			audioSet['audio' + num].src = musicArr[num];
			audioSet['audio' + num].volume = 0.5;

			audioSet['audio' + num].load();
			audioSet['audio' + num].addEventListener('canplaythrough', callback = (function(now) {
				return function() {
					if(now == 0) {
						AutoPlay(0);
						bufferOneMusic(now + 1);
					}
					if( now < (musicArr.length - 1)) {
						bufferOneMusic(now + 1);
					}
				}
			})(num));
			hasBuffer = true;
		}
		function AutoPlay(begin) {
			if(audioSet['audio' + begin].readyState === 4 ) {
				audioSet['audio' + begin].play();	
				audioSet['audio' + begin].ended = function() {
					alert('wanle!');
				}
				audioSet['audio' + begin].addEventListener('ended', function() {
					if(begin < (musicArr.length - 1)){
						AutoPlay(begin + 1);
						nowplay = begin +1;
					}else {
						AutoPlay(0);
						nowplay = 0;
					}
				});
			}else {
				if(begin >= (musicArr.length - 1)) begin = -1;
				arguments.callee(begin + 1);
			}
		}
		function Stop() {
			audioSet['audio' + nowplay].pause();
		}
		S.Event.on('.surprise', 'click', function() {
			if(DOM.text(this) == '惊喜') {
				DOM.text(this,'停止');
				if(nowplay >= musicArr.length) {
					nowplay = 0;
				}
				if(!hasBuffer) {
					bufferOneMusic(nowplay);
				}else {
					AutoPlay(nowplay);
				}	
				
			}else {
				DOM.text(this, '惊喜');
				Stop();
			}
			return false;
		});
	})(KISSY);
}

