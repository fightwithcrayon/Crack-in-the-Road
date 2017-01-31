//Main
var ajaxurl = 'https://www.crackintheroad.com/wp-admin/admin-ajax.php';

//Everything to do with the cover
var pageDiv = document.getElementById("thepage");
var	y = null;
var	runScroll = function() { 
	document.body.classList.toggle("cover-closed", window.scrollY <= window.innerHeight); 
};
var	runResize = function() {
	if(y === null){
		y = setTimeout(function() {
			var y = null;
			pageDiv = document.getElementById("thepage");
			document.body.style.paddingBottom = pageDiv.clientHeight + "px";
		}, 200);
	}
};

function setupCover(){
    document.body.style.paddingBottom = pageDiv.clientHeight + "px";
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