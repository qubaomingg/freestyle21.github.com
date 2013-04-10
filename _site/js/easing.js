

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(A,B,C,D,E){return jQuery.easing[jQuery.easing.def](A,B,C,D,E)},easeInQuad:function(A,B,C,D,E){return D*(B/=E)*B+C},easeOutQuad:function(A,B,C,D,E){return -D*(B/=E)*(B-2)+C},easeInOutQuad:function(A,B,C,D,E){if((B/=E/2)<1){return D/2*B*B+C}return -D/2*((--B)*(B-2)-1)+C},easeInCubic:function(A,B,C,D,E){return D*(B/=E)*B*B+C},easeOutCubic:function(A,B,C,D,E){return D*((B=B/E-1)*B*B+1)+C},easeInOutCubic:function(A,B,C,D,E){if((B/=E/2)<1){return D/2*B*B*B+C}return D/2*((B-=2)*B*B+2)+C},easeInQuart:function(A,B,C,D,E){return D*(B/=E)*B*B*B+C},easeOutQuart:function(A,B,C,D,E){return -D*((B=B/E-1)*B*B*B-1)+C},easeInOutQuart:function(A,B,C,D,E){if((B/=E/2)<1){return D/2*B*B*B*B+C}return -D/2*((B-=2)*B*B*B-2)+C},easeInQuint:function(A,B,C,D,E){return D*(B/=E)*B*B*B*B+C},easeOutQuint:function(A,B,C,D,E){return D*((B=B/E-1)*B*B*B*B+1)+C},easeInOutQuint:function(A,B,C,D,E){if((B/=E/2)<1){return D/2*B*B*B*B*B+C}return D/2*((B-=2)*B*B*B*B+2)+C},easeInSine:function(A,B,C,D,E){return -D*Math.cos(B/E*(Math.PI/2))+D+C},easeOutSine:function(A,B,C,D,E){return D*Math.sin(B/E*(Math.PI/2))+C},easeInOutSine:function(A,B,C,D,E){return -D/2*(Math.cos(Math.PI*B/E)-1)+C},easeInExpo:function(A,B,C,D,E){return(B==0)?C:D*Math.pow(2,10*(B/E-1))+C},easeOutExpo:function(A,B,C,D,E){return(B==E)?C+D:D*(-Math.pow(2,-10*B/E)+1)+C},easeInOutExpo:function(A,B,C,D,E){if(B==0){return C}if(B==E){return C+D}if((B/=E/2)<1){return D/2*Math.pow(2,10*(B-1))+C}return D/2*(-Math.pow(2,-10*--B)+2)+C},easeInCirc:function(A,B,C,D,E){return -D*(Math.sqrt(1-(B/=E)*B)-1)+C},easeOutCirc:function(A,B,C,D,E){return D*Math.sqrt(1-(B=B/E-1)*B)+C},easeInOutCirc:function(A,B,C,D,E){if((B/=E/2)<1){return -D/2*(Math.sqrt(1-B*B)-1)+C}return D/2*(Math.sqrt(1-(B-=2)*B)+1)+C},easeInElastic:function(A,H,C,D,E){var G=1.70158;var F=0;var B=D;if(H==0){return C}if((H/=E)==1){return C+D}if(!F){F=E*0.3}if(B<Math.abs(D)){B=D;var G=F/4}else{var G=F/(2*Math.PI)*Math.asin(D/B)}return -(B*Math.pow(2,10*(H-=1))*Math.sin((H*E-G)*(2*Math.PI)/F))+C},easeOutElastic:function(A,H,C,D,E){var G=1.70158;var F=0;var B=D;if(H==0){return C}if((H/=E)==1){return C+D}if(!F){F=E*0.3}if(B<Math.abs(D)){B=D;var G=F/4}else{var G=F/(2*Math.PI)*Math.asin(D/B)}return B*Math.pow(2,-10*H)*Math.sin((H*E-G)*(2*Math.PI)/F)+D+C},easeInOutElastic:function(A,H,C,D,E){var G=1.70158;var F=0;var B=D;if(H==0){return C}if((H/=E/2)==2){return C+D}if(!F){F=E*(0.3*1.5)}if(B<Math.abs(D)){B=D;var G=F/4}else{var G=F/(2*Math.PI)*Math.asin(D/B)}if(H<1){return -0.5*(B*Math.pow(2,10*(H-=1))*Math.sin((H*E-G)*(2*Math.PI)/F))+C}return B*Math.pow(2,-10*(H-=1))*Math.sin((H*E-G)*(2*Math.PI)/F)*0.5+D+C},easeInBack:function(A,B,C,D,E,F){if(F==undefined){F=1.70158}return D*(B/=E)*B*((F+1)*B-F)+C},easeOutBack:function(A,B,C,D,E,F){if(F==undefined){F=1.70158}return D*((B=B/E-1)*B*((F+1)*B+F)+1)+C},easeInOutBack:function(A,B,C,D,E,F){if(F==undefined){F=1.70158}if((B/=E/2)<1){return D/2*(B*B*(((F*=(1.525))+1)*B-F))+C}return D/2*((B-=2)*B*(((F*=(1.525))+1)*B+F)+2)+C},easeInBounce:function(A,B,C,D,E){return D-jQuery.easing.easeOutBounce(A,E-B,0,D,E)+C},easeOutBounce:function(A,B,C,D,E){if((B/=E)<(1/2.75)){return D*(7.5625*B*B)+C}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+C}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+C}else{return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+C}}}},easeInOutBounce:function(A,B,C,D,E){if(B<E/2){return jQuery.easing.easeInBounce(A,B*2,0,D,E)*0.5+C}return jQuery.easing.easeOutBounce(A,B*2-E,0,D,E)*0.5+D*0.5+C}});
