'use strict';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.loadMode = 1;
//Other stuff
$('.playlists > .more, .playlists > .less').on('click', function () {
	$('.playlists').toggleClass('open');
});

$('a[data-action="openMenu"], li.close').on('click', function (e) {
	$('body').toggleClass('menuopen');
	return false;
});

$(document).ready(function () {
	setupCover();
	if (document.querySelector(".infinitescroll .load-more")) {
		infinitescroll();
	}
});

function setupCover() {
	var pageDiv = document.getElementById("thepage");
	document.body.style.paddingBottom = pageDiv.clientHeight + "px";
	document.body.classList.toggle("cover-closed");
	var y = null;
	var runScroll = function runScroll() {
		document.body.classList.toggle("cover-closed", window.scrollY <= window.innerHeight);
	};
	window.addEventListener("scroll", runScroll, { passive: true });

	var runResize = function runResize() {
		if (y === null) {
			y = setTimeout(function () {
				var y = null;
				pageDiv = document.getElementById("thepage");
				document.body.style.paddingBottom = pageDiv.clientHeight + "px";
			}, 200);
		}
	};
	window.addEventListener("resize", runResize, { passive: true });
}

function scribbleTitle() {
	var ctx = document.getElementById("sitetitle").getContext("2d"),
	    dashLen = 50,
	    dashOffset = dashLen,
	    speed = 10,
	    txt = "CITR",
	    x = 30,
	    i = 0;

	ctx.font = "92px scriptorama-tradeshow-jf, sans-serif";
	ctx.lineWidth = 1;ctx.lineJoin = "round";ctx.globalAlpha = 1;
	ctx.strokeStyle = ctx.fillStyle = "white";

	(function loop() {
		ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
		dashOffset -= speed; // reduce dash length
		ctx.strokeText(txt[i], x, 90); // stroke letter

		if (dashOffset > 0) requestAnimationFrame(loop); // animate
		else {
				ctx.fillText(txt[i], x, 90); // fill final letter
				dashOffset = dashLen; // prep next char
				x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
				ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random()); // random y-delta
				ctx.rotate(Math.random() * 0.005); // random rotation
				if (i < txt.length) requestAnimationFrame(loop);
			}
	})();
}

function infinitescroll() {
	var infiniteScrollContainer = $('.infinitescroll');
	var button = $(infiniteScrollContainer).children('.load-more')[0];
	// Now the infinite scroll
	var page = 2;
	var loading = false;
	var scrollHandling = {
		allow: true,
		reallow: function reallow() {
			scrollHandling.allow = true;
		},
		delay: 400 //(milliseconds) adjust to the highest acceptable value
	};
	$(window).scroll(function () {
		if (loading === false && scrollHandling.allow) {
			scrollHandling.allow = false;
			setTimeout(scrollHandling.reallow, scrollHandling.delay);
			var offset = $(button).offset().top - $(window).scrollTop();
			if (1200 > offset && loading === false) {
				loading = true;
				$.getJSON('/wp-json/wp/v2/posts?page=' + page + '&' + button.dataset.query, function (data) {
					var postString = '';
					data.forEach(function (post, i) {
						postString += '<article class="archive block">\n\t\t\t\t\t\t\t\t<div class="image">\n\t\t\t\t\t\t\t\t\t<a href="' + post.link + '" name="' + post.title.rendered + '">\n\t\t\t\t\t\t\t\t\t\t<img data-srcset="' + post.featured_image_srcset + '" alt="' + post.title.rendered + '" title="' + post.title.rendered + '" class="lazyload blur-up" />\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="info">\n\t\t\t\t\t\t\t\t\t<a href="' + post.link + '" name="' + post.title.rendered + '" class="simple">\n\t\t\t\t\t\t\t\t\t\t' + post.custom_title + '\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t<p>' + post.custom_excerpt + '</p>\n\t\t\t\t\t\t\t\t\t<span class="more">\n\t\t\t\t\t\t\t\t\t\t<a href="' + post.link + '" name="' + post.title.rendered + '">Read more</a>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</article>';
					});
					infiniteScrollContainer.append(postString);
					page++;
					loading = false;
				});
			}
		}
	});
}

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