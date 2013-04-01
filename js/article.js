$(function() {
	$(window).on("scroll", function(){
		var windowScroll = $(window).scrollTop();
		console.log(windowScroll);
		$('.MsgBody').stop(true,true).animate({
			'top':windowScroll + 'px'
		},500);
	});
});