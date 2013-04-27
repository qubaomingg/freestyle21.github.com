$(function() {

	function fs() {}
	fs.prototype.applyHeight = function(){
		
	};
	fs.prototype.artShow = function() {
		//宽度适应
		var divSum = $('.article').size();
		var realWidth = divSum % 2 ? (divSum / 2 + 1) * 450 : (divSum /2) * 450;
		$('#artHori').css('width',realWidth + 'px');
		$('.rightMsg').css('height',$('body').css('height'));
		//hover事件
		$('.article').hover(function() {
			var num = $('.article').index(this);
			$(this).find('img').css({
				'transition':'all 0.5s ease-in-out',
				'-webkit-transition':'all 0.5s ease-in-out',
				'-o-transition':'all 0.5s ease-in-out',
				'-ms-transition':'all 0.5s ease-in-out',
				'transform':'scale(1.2,1.2)',
				'-webkit-transform':'scale(1.2,1.2)',
				'-o-transform':'scale(1.2,1.2)',
				'-ms-transform':'scale(1.2,1.2)'
			});
			$('.artDetail').eq(num).stop().fadeIn();
		},
		function() {
			var num = $('.article').index(this);
			$(this).find('img').css({
				'transition': 'all 0.5s ease-in-out',
				'-moz-transition': 'all 0.5s ease-in-out',
				'-webkit-transition': 'all 0.5s ease-in-out',
				'-o-transition': 'all 0.5s ease-in-out',
				'transform':'scale(1,1)',
				'-o-transform': 'scale(1,1)',
				'-ms-transform': 'scale(1,1)',
				'-webkit-transform':'scale(1,1)',
				'-moz-webkit-transform':'scale(1,1)'
			});
			$('.artDetail').eq(num).stop().fadeOut();	
		});
		//点击进入读文章页面
		$('.artDetail').click(function() {
			$(this).parent().find('.postsite')[0].click();
		});
		//左右	
		$('.leftArrow a').click(function() {

			var nowMargin = parseInt($('#artHori').css('marginLeft'));
			if(nowMargin >= 0 ) return false;
			else {
				$('#artHori').stop(true,true).animate({
					'marginLeft':(nowMargin + 900) + 'px'
				},500,'easeInBack');
			}
			return false;
		});

		$('.rightArrow a').click(function() {
			var nowMargin = parseInt($('#artHori').css('marginLeft'));
			if(nowMargin <= (-realWidth + 900)) return false;
			else {
				$('#artHori').stop(true,true).animate({
					'marginLeft':(nowMargin - 900) + 'px'
				},500,'easeInBack');
			}
			return false;
		});
	}
	fs.prototype.msg = function() {
		//rightMsg top根据高度设定
		var tmpHeight = parseInt($('.rightMsg').css('height'));
		$('.rightMsg').css('top', - tmpHeight + 'px');
		var isMsg = false; //反转变量。防止没有留言界面而出现缓动

		//点击读书
		$('.book').hover(function() {
			$('.tip').stop(true,true).fadeIn();
		},function() {
			$('.tip').stop(true,true).fadeOut();
		});
		
		//点击留言，动画开始
		$('.msg').click(function() {
			$('.rightMsg').animate({
				'top':'0px',
				'right': '0px'
			},500,'easeInOutCubic');
			$('.topMsg').animate({
				'top':'0px',
				'left': '0%'
			},500,'easeInOutCubic');
			$('#mainbody').animate({
				'top':'45px',
				'left':'-360px'
			},500,'easeInOutCubic');
			isMsg = true;
			return false;
		});
		//点击其他回复动画。
		$('#mainbody').live('click',function() {
			if(isMsg) {
				$('.rightMsg').animate({
					'right': '-300px'
					},50,'easeOutCirc', function() {
						$(this).animate({
							'top': -tmpHeight +'px'
						},50,'easeOutCirc',function() {
							$(this).css('right','-360px');
						});
					}
				);
				$('.topMsg').animate({
					'top': '-26px'
					},50,'easeOutCirc', function() {
						$(this).animate({
							'left': '100%'	
						},50, 'linear',function() {
							$(this).css('top','-46px');
						});
					}
				);
				$('#mainbody').animate({
					'top':'0px',
					'left':'0px'
				},800,'easeOutCirc');
				isMsg = false;
			}
		});
	}
	var myfs = new fs();
	myfs.artShow();
	myfs.msg();
});
//等图片，样式文件都加载好了再加载动画。
//mp3加载策略,点击惊喜按钮后才加载第一首音乐，当第一首歌可以播放了后才加载后一首，以此类推。
//在播放第一首的时候加载其他的。
window.onload = function() {
	var nowplay = 0;
	var hasBuffer = false;
	var musicArr = ['./music/WhatAreWords.mp3','./music/yirananni.mp3',
					 './music/OnlyLove.mp3', './music/yangchong.mp3', './music/wuwangxinan.mp3',
					 './music/Angel.mp3', './music/Home.mp3', './music/YouRaiseMeUp.mp3', 
					 './music/Recovery.mp3', './music/ByMySide.mp3', './music/BecauseWeCan.mp3', 
					 './music/huifuxidetong.mp3', './music/nidebeibao.mp3','./music/lingwu.mp3', 
					 './music/zhejiushiai.mp3', './music/diyifuren.mp3'],
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
			$(audioSet['audio' + begin]).bind('ended', function() {
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
	$('.surprise').click(function() {
		if($(this).text() == '惊喜') {
			$(this).text('停止');
			if(nowplay >= musicArr.length) {
				nowplay = 0;
			}
			if(!hasBuffer) {
				bufferOneMusic(nowplay);
			}else {
				AutoPlay(nowplay);
			}	
			
		}else {
			$(this).text('惊喜');
			Stop();
		}
		return false;
		
	});
}

