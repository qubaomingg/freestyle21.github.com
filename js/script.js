(function($, window, undefined){
	$(document).ready(function(){

		function MyMusic() {
			//私有变量，musicArr存储音乐地址，audioObject存储Audio对象。
			$that = this;
			this.musicArr = ['./music/BecauseWeCan.mp3', './music/WhatAreWords.mp3', './music/Recovery.mp3', './music/OnlyLove.mp3', './music/Angel.mp3',
						'./music/Home.mp3', './music/YouRaiseMeUp.mp3', './music/ByMySide.mp3', './music/huifuxidetong.mp3', './music/nidebeibao.mp3', 
						'./music/yangchong.mp3', './music/yirananni.mp3', './music/lingwu.mp3', './music/zhejiushiai.mp3', './music/wuwangxinan.mp3',
						'./music/diyifuren.mp3'];
			this.audioSet = {};	

		}
		MyMusic.prototype.initAudioSet = function() {
			//初始化audioSet对象，初始化后应该像这样:
			//Object {audio0: audio, audio1: audio, audio2: audio, audio3: audio, audio4: audio…}
			for (var i = 0; i < this.musicArr.length; i++) {
				this.audioSet['audio' + i] =  document.createElement('audio');
				this.audioSet['audio' + i].src = this.musicArr[i];
			};		
			this.learLoad();
			this.UpdateControl();
		}
		//控制加载顺序
		MyMusic.prototype.learLoad = function() {
			loadOne(0);
			function loadOne(num) {
				this.audio['audio' + num].load();
				this.audio['audio' + num].addEventListener('canplaythrough', callback = (function(now) {
					return function() {
						changeLiStatus(now);
						if( now <= 15) {
							loadOne(++now);	
						}
					}
				})(num));	
			}
			
		}
		//顺序播放 或取消顺序播放
		MyMusic.prototype.AutoPlay = function() {

			if(!this.audioSet) return;
			
			this.audioSet['audio1'].play();//进入的是时候默认播放第2首。
			$('.singMeta').text($('.nowPlay').text());
			$.each(this.audioSet, function(index, value) {
				//获取“audio13”后面的13
				var nownum = index.substring(index.length-2, index.length);
				var sigle = index.substring(index.length-1, index.length);
				nownum = isNaN(+nownum) ? sigle : nownum;//区分10以上和10以下。注意+是转换成数字

				var nextAudio = index == 'audio15' ? 'audio0' : 'audio' + ++nownum;
				var nextnum = nownum == '15' ? '0' : ''+nownum;
				$(value).bind('ended', voidCallback = (function(nextAudio, nextnum){
					return function() {
						updateClassNowPlay(nextnum);
						$that.audioSet[nextAudio].play();
					}
				})(nextAudio, nextnum));
			});
		}
		MyMusic.prototype.cancleAll = function() {
			$.each(this.audioSet, function(index, value) {
				$(value).unbind();
			});
		}
		//单曲循环 或取消
		MyMusic.prototype.SiglePlay = function() {
			if(!this.audioSet) return;
			$(this.audioSet['audio' + findNowPlay()]).bind('ended', function() {
				$that.audioSet['audio' + findNowPlay()].play();
			});
		}
		//随机播放 或取消
		MyMusic.prototype.RandomPlay = function() {

			if(!this.audioSet) return;
			$.each(this.audioSet, function(index, value) {
				var randomnum = parseInt(Math.random()*16);
				var nextAudio = 'audio' + randomnum;
				$(value).bind('ended', voidCallback = (function(nextAudio, nextnum){
					return function() {
						updateClassNowPlay(nextnum);
						$that.audioSet[nextAudio].play();
					}
				})(nextAudio, randomnum));
			});
		}
		//单击歌曲
		MyMusic.prototype.handleClick = function() {
			/*  $(selector).live(events, data, handler);                // jQuery 1.3+
				$(document).delegate(selector, events, data, handler);  // jQuery 1.4.3+
				$(document).on(events, selector, data, handler);  
			*/
			
			$('.musiclistContain li').live('click', function() {
				if($(this).hasClass('IamReady')) {
					alert('你的网速不给力哦，等等吧，精彩总在后面！')
					return false;
				}
				var thisIndex = $(this).attr('attr');
				$that.stopSing(findNowPlay());
				updateClassNowPlay(thisIndex);
				$that.audioSet['audio' + thisIndex].play();
				$('.singMeta').text('');//先清空
				$('.singMeta').text($('.nowPlay').text());
			});
		}
		//更新控制台显示
			
		MyMusic.prototype.UpdateControl = function() {
			//控制暂停和播放按钮
			//var $that = this;//注意到下面的window.setInterval的上下文对象变了。
			$.each([$('.pause a'),$('.play a')], function(index, value) {
				value.click(function() {

					if(!$that.audioSet['audio' + findNowPlay()].paused) {
						//如果在播放
						$('.play').show();
						$('.pause').hide();
						$that.audioSet['audio' + findNowPlay()].pause();
					}else {
						$('.pause').show();
						$('.play').hide();
						$that.audioSet['audio' + findNowPlay()].play();
					}
				});
			});
				//前一首后一首
			$.each([$('.prev a'),$('.next a')], function(index, value) {
				value.click(function() {
					var nownum = findNowPlay(),
						nownumPlus = nownum + 1,
						nownumReduce = nownum - 1;
					var nextnum = findNowPlay() === 15 ? 0 : nownumPlus,
						beforenum = findNowPlay() === 0 ? 15 : nownumReduce;

					$that.stopSing(nownum);
					if($(this).hasClass('nextSing')) {
						//下一首
						updateClassNowPlay(nextnum);
						$that.audioSet['audio' + nextnum].play();
					}else {
						updateClassNowPlay(beforenum);
						$that.audioSet['audio' + beforenum].play();
					}
				});
			});

				//随时更新时间和进度条
			window.setInterval(function() {
				
				if(!findNowPlay() && (findNowPlay() !== 0)) return; //如果返回0也要跳过。
				if($that.audioSet['audio' + findNowPlay()].paused) return;//如果没有播放，则不轮训
				var curtime = parseInt($that.audioSet['audio' + findNowPlay()].currentTime);
				var alltime =parseInt($that.audioSet['audio' + findNowPlay()].duration);
				
				var rate = curtime / alltime;
					//进度条
				$('#progressSlider .ui-slider-range-min').css('width', (290 * rate) + 'px');
				$('#progressSlider .ui-slider-handle').css({'left':rate * 100 + '%'});
					//时间
				var curmin = parseInt(curtime / 60);
				curmin = curmin > 9 ? curmin : '0' + curmin;

				var cursec = curtime % 60;
				cursec = cursec > 9 ? cursec : '0' + cursec;

				var allmin = parseInt(alltime / 60);
				allmin = allmin > 9 ? allmin : '0' + allmin;

				var allsec = alltime % 60;
				allsec = allsec > 9 ? allsec : '0' + allsec;

				if(isNaN(curmin) || isNaN(cursec) || isNaN(allsec) || isNaN(allsec)) {
					$('.curTime').text('00:00');
					$('.totalTime').text('00:00');	
				}else {
					$('.curTime').text(curmin + ':' +cursec);
					$('.totalTime').text(allmin + ':' +allsec);	
				}
			},500);
				//静音
			$('.volume .mute').click(function() {
				if($(this).hasClass('muted')){
					$that.audioSet['audio' + findNowPlay()].volume = 1;
					$('#volSlider .ui-slider-range-min').css('width', '73px');
					$('#volSlider .ui-slider-handle').css({'left':'73px'});
				}else {
					$that.audioSet['audio' + findNowPlay()].volume = 0;
					$('#volSlider .ui-slider-range-min').css('width', 0);
					$('#volSlider .ui-slider-handle').css({'left':0});
				}
				$(this).toggleClass('muted');
			});
				//播放模式
			$('.playmod a').click(function() {
				$('.playmod a').removeClass('select');
				$(this).toggleClass('select');
				var tmpTitle = $(this).attr('title');
				if( tmpTitle === '循环播放') {
					$that.cancleAll();
					$that.AutoPlay();
				}else if(tmpTitle === '单曲播放') {
					$that.cancleAll();
					$that.SiglePlay();
				}else {
					$that.cancleAll();
					$that.RandomPlay();
				}
			});
		}
		//处理进度条和音量的拖动事件
		MyMusic.prototype.bindProgress = function() {
			
			$('#progressSlider .ui-slider-handle').bind('mousedown',$that.proMouseDown);	
			$('#volSlider .ui-slider-handle').bind('mousedown',$that.VoiceMouseDOwn);
		}


		MyMusic.prototype.proMouseDown = function(event) {
			
			$(document).bind('mousemove',$that.proMouseMove);
	        $(document).bind('mouseup',$that.proMouseUp);	
		}
		
		MyMusic.prototype.proMouseUp = function (event){
			
		    $(document).unbind('mousemove',$that.proMouseMove);
			$(document).unbind('mouseup',$that.proMouseUp);
			event.stopPropagation();
			event.preventDefault();
		}
		MyMusic.prototype.proMouseMove = function(event) {
			var mousePos = mouseCoords(event); 
		    if( mousePos.x < 358) mousePos.x = 358;
			if( mousePos.x > 648) mousePos.x = 648;
			var rate = (mousePos.x - 358) / (648-358) * 100;
			$that.audioSet['audio' + findNowPlay()].currentTime = $that.audioSet['audio' + findNowPlay()].duration / 100 * rate;
			$('#progressSlider .ui-slider-range-min').css('width', (290 / 100 * rate) + 'px');
			$('#progressSlider .ui-slider-handle').css({'left':rate + '%'});

			event.stopPropagation();
			event.preventDefault();
		}

		MyMusic.prototype.VoiceMouseDOwn = function(event) {
			$(document).bind('mousemove',$that.VoiceMouseMove);
	        $(document).bind('mouseup',$that.VoiceMouseUp);	
		}
		MyMusic.prototype.VoiceMouseUp = function(e){
		    $(document).unbind('mousemove',$that.VoiceMouseMove);
			$(document).unbind('mouseup',$that.VoiceMouseUp);
			event.stopPropagation();
			event.preventDefault();
		}
		MyMusic.prototype.VoiceMouseMove = function(e){
			var mousePos = mouseCoords(e); 
		    
		    if( mousePos.x < 915) mousePos.x = 915;
			if( mousePos.x > 992) mousePos.x = 992;
			var leftValue = ((mousePos.x - 915) / (992-915))* 100;
			
			$that.audioSet['audio' + findNowPlay()].volume = leftValue / 100;
			$('#volSlider .ui-slider-range-min').css('width', (73 * leftValue /100) + 'px');
			$('#volSlider .ui-slider-handle').css({'left':leftValue + '%'});
			event.stopPropagation();
			event.preventDefault();
		}
		MyMusic.prototype.stopSing = function(index) {
			this.audioSet['audio' + index].pause();
			this.audioSet['audio' + index].currentTime = 0;
		}
		MyMusic.prototype.showWelTxt = function() {
			var strArr = ['人一辈子遇到人的总数是29,200,000', '而相遇的概率是29,200,000 / 6,000,000,000 = 0.00487....', '我相信你来到这里就是我们的缘分',
							'但.....不是所有有缘的人都能相遇', '熟悉的陌生人，留下你的脚印，我想认识你！'];
			var i = 0;
			reloadText(0);
			function reloadText(num) {
				var strTemp = '';
				var timeid = window.setInterval(function() {
					strTemp += strArr[num].charAt(i);
					i++;
					$('#about-top .large p').eq(num).text(strTemp);
					if(i >= strArr[num].length) {
						clearInterval(timeid);
						i = 0;
						if(num <= 3) {
							reloadText(num+1);
						}
					}
				},200);
			}

		}
		//helpers
		//给当前播放的li加class=nowplay然后更新当前播放的歌曲名称
		function updateClassNowPlay(nownum) {
			if(nownum > 7) {
				$('.musiclist li').removeClass('nowPlay');
				$('.musicTwo li').eq(nownum -8).addClass('nowPlay');
			}else {
				$('.musiclist li').removeClass('nowPlay').eq(nownum).addClass('nowPlay');	
			}
			$('.singMeta').text('');//先清空。
			$('.singMeta').text($('.nowPlay').text());
			
		}

		function findNowPlay() {
			var returnnum;
			$.each($('.musiclist li'), function(index, value) {
				if($(value).hasClass('nowPlay')) {
					returnnum = index;
				}
			});
			return returnnum;
		}
		
		function mouseCoords(ev) { 
			if(ev.pageX || ev.pageY){ 
				return {x:ev.pageX, y:ev.pageY}; 
			} 
			return { 
				x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
				y:ev.clientY + document.body.scrollTop - document.body.clientTop 
			}; 
		} 
		
		function changeLiStatus(num) {
			if(num > 7) {
				$('.musicTwo li').eq(num -8).removeClass('IamReady');	
			}else {
				$('.musiclist li').eq(num).removeClass('IamReady');
			}
		}
		window.onload = JustGo;
		function JustGo() {
			var newMusic = new MyMusic();
			newMusic.initAudioSet();
			newMusic.AutoPlay(true);
			newMusic.handleClick();
			newMusic.bindProgress();
			newMusic.showWelTxt();	
		}
		
	});

	//导航条的隐藏与出现
	$(window).on("scroll", function(){
		var windowScroll = $(window).scrollTop();
		if (windowScroll > ($(window).height() - 100)) {
			$("nav#main-nav").fadeIn(500);
		} else {
			$("nav#main-nav").fadeOut(500);
		}
	});
	$("#main-nav div.nav-item").on("click", function(e){
		var targetElement = $(e.target).attr('data-target'),
		targetElementOffset = $(targetElement).offset(),
		targetHeight = targetElementOffset.top - 58,
		windowOffsetTop = $(window).scrollTop(),
		scrollSpeed = Math.abs(windowOffsetTop - targetHeight) / 5;
		$('html,body').stop().animate({scrollTop: targetHeight}, scrollSpeed, "linear");
	});

	//响应快捷键
	$(document).keypress(function(event) {  
		//测试得到unicode码 空格32，右165 左162
		event = event || window.event;
		var code = event.which || event.keyCode;
		if(code == 110) {
			//下一曲
			$('.next .wg-button').trigger('click');
		}else if(code == 112){
			//上一曲
			$('.prev .wg-button').trigger('click');
		}else if(event.ctrlKey && code == 32){
			//空格
			$('.pause .wg-button').trigger('click');
		}
	});
	
})(jQuery, window);
