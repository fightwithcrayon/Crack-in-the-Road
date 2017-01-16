//Sources
/* Lazy Load XT 1.1.0 | MIT License */
!function(a,b,c,d){function e(a,b){return a[b]===d?t[b]:a[b]}function f(){var a=b.pageYOffset;return a===d?r.scrollTop:a}function g(a,b){var c=t["on"+a];c&&(w(c)?c.call(b[0]):(c.addClass&&b.addClass(c.addClass),c.removeClass&&b.removeClass(c.removeClass))),b.trigger("lazy"+a,[b]),k()}function h(b){g(b.type,a(this).off(p,h))}function i(c){if(z.length){c=c||t.forceLoad,A=1/0;var d,e,i=f(),j=b.innerHeight||r.clientHeight,k=b.innerWidth||r.clientWidth;for(d=0,e=z.length;e>d;d++){var l,m=z[d],q=m[0],s=m[n],u=!1,v=c||y(q,o)<0;if(a.contains(r,q)){if(c||!s.visibleOnly||q.offsetWidth||q.offsetHeight){if(!v){var x=q.getBoundingClientRect(),B=s.edgeX,C=s.edgeY;l=x.top+i-C-j,v=i>=l&&x.bottom>-C&&x.left<=k+B&&x.right>-B}if(v){m.on(p,h),g("show",m);var D=s.srcAttr,E=w(D)?D(m):q.getAttribute(D);E&&(q.src=E),u=!0}else A>l&&(A=l)}}else u=!0;u&&(y(q,o,0),z.splice(d--,1),e--)}e||g("complete",a(r))}}function j(){B>1?(B=1,i(),setTimeout(j,t.throttle)):B=0}function k(a){z.length&&(a&&"scroll"===a.type&&a.currentTarget===b&&A>=f()||(B||setTimeout(j,0),B=2))}function l(){v.lazyLoadXT()}function m(){i(!0)}var n="lazyLoadXT",o="lazied",p="load error",q="lazy-hidden",r=c.documentElement||c.body,s=b.onscroll===d||!!b.operamini||!r.getBoundingClientRect,t={autoInit:!0,selector:"img[data-src]",blankImage:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",throttle:99,forceLoad:s,loadEvent:"pageshow",updateEvent:"load orientationchange resize scroll touchmove focus",forceEvent:"lazyloadall",oninit:{removeClass:"lazy"},onshow:{addClass:q},onload:{removeClass:q,addClass:"lazy-loaded"},onerror:{removeClass:q},checkDuplicates:!0},u={srcAttr:"data-src",edgeX:0,edgeY:0,visibleOnly:!0},v=a(b),w=a.isFunction,x=a.extend,y=a.data||function(b,c){return a(b).data(c)},z=[],A=0,B=0;a[n]=x(t,u,a[n]),a.fn[n]=function(c){c=c||{};var d,f=e(c,"blankImage"),h=e(c,"checkDuplicates"),i=e(c,"scrollContainer"),j=e(c,"show"),l={};a(i).on("scroll",k);for(d in u)l[d]=e(c,d);return this.each(function(d,e){if(e===b)a(t.selector).lazyLoadXT(c);else{var i=h&&y(e,o),m=a(e).data(o,j?-1:1);if(i)return void k();f&&"IMG"===e.tagName&&!e.src&&(e.src=f),m[n]=x({},l),g("init",m),z.push(m),k()}})},a(c).ready(function(){g("start",v),v.on(t.updateEvent,k).on(t.forceEvent,m),a(c).on(t.updateEvent,k),t.autoInit&&(v.on(t.loadEvent,l),l())})}(window.jQuery||window.Zepto||window.$,window,document);

//Main

var ajaxurl = 'http://www.crackintheroad.com/wp-admin/admin-ajax.php';

//Everything to do with the cover
var pageDiv = document.getElementById("thepage"),
	runScroll = function() { document.body.classList.toggle("cover-closed", window.scrollY <= window.innerHeight) },
	y = null,
	runResize = function() {
   		y || (y = setTimeout(function() {
            y = null ,
            document.body.style.paddingBottom = (pageDiv.clientHeight + document.getElementById("cover").clientHeight) + "px"
        }, 200))};

function setupCover(){
    document.body.style.paddingBottom = (pageDiv.clientHeight + document.getElementById("cover").clientHeight) + "px"
	document.body.classList.toggle("cover-closed");
    window.addEventListener("scroll", runScroll, { passive: true });
    window.addEventListener("resize", runResize, { passive: true });
}

//Other stuff
$('.playlists > .more, .playlists > .less').click(function(){
	$('.playlists').toggleClass('open');
});

$('a[data-action="openMenu"], li.close').click(function(e){
	$('body').toggleClass('menuopen');
	return false;
});

//That's all set up, on to the kick off
$(document).ready(function(){ 
	setupCover();
	setTimeout(scribbleTitle, 1000);
	if(document.querySelector(".infinitescroll .load-more")){
		infinitescroll();
	}

});

function scribbleTitle(){
	var ctx = document.getElementById("sitetitle").getContext("2d"),
    dashLen = 50, dashOffset = dashLen, speed = 10,
    txt = "CITR", x = 30, i = 0;

	ctx.font = "92px scriptorama-tradeshow-jf, sans-serif"; 
	ctx.lineWidth = 1; ctx.lineJoin = "round"; ctx.globalAlpha = 1;
	ctx.strokeStyle = ctx.fillStyle = "white";

	(function loop() {
	  ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
	  dashOffset -= speed;                                         // reduce dash length
	  ctx.strokeText(txt[i], x, 90);                               // stroke letter

	  if (dashOffset > 0) requestAnimationFrame(loop);             // animate
	  else {
	    ctx.fillText(txt[i], x, 90);                               // fill final letter
	    dashOffset = dashLen;                                      // prep next char
	    x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
	    ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
	    ctx.rotate(Math.random() * 0.005);                         // random rotation
	    if (i < txt.length) requestAnimationFrame(loop);
	  }
	})();
}

function infinitescroll(){
	var button = $('.infinitescroll .load-more');
	// Now the infinite scroll
	var page = 2;
	var loading = false;
	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: 400 //(milliseconds) adjust to the highest acceptable value
	};

	$(window).scroll(function(){
		if( ! loading && scrollHandling.allow ) {
			scrollHandling.allow = false;
			setTimeout(scrollHandling.reallow, scrollHandling.delay);
			var offset = $(button).offset().top - $(window).scrollTop();
			if( 1200 > offset ) {
				loading = true;
				var data = {
					action: 'be_ajax_load_more',
					page: page
				};
				$.post(ajaxurl, data, function(res) {
					if( res.success) {
						console.log(res);
						$('.infinitescroll').append( res.data );
						$('.infinitescroll').append( button );
						page = page + 1;
						loading = false;
					} else {
						console.log(res);
					}
				}).fail(function(xhr, textStatus, e) {
					console.log(xhr.responseText);
				});

			} else {
				//console.log('Weak offset');
			}
		}
	});
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-17970339-3', 'auto');
ga('send', 'pageview');

/*
soundManager.defaultOptions = {
	stream: true,

}

$('.audioobject').click(function(e){
	// stream track id 293
	var soundObj = {
		id : $(this).attr('id'),
		waveform_url : $(this).attr('waveform')
	}
	soundManager.createSound({
	  id: soundObj.id,
	  url: 'https://api.soundcloud.com/tracks/' + soundObj.id +'/stream?client_id=543a39f54bd63a00779211590a0f96a8',
	  autoLoad: true,
	  autoPlay: false,
	  onload: function() {
	    console.log('The soundcloud track '+this.id+' was loaded!');
	    console.log(soundObj);
		/'* var waveform = new Waveform({
		    container: document.getElementById('waveform'),
		    innerColor: "#333"
		  });
	     waveform.dataFromSoundCloudTrack(soundObj);
		 var streamOptions = waveform.optionsForSyncedStream(); *'/
	  },
	  volume: 50
	});
})

*/