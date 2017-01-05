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
}

enquire.register("(max-width: 767px)", function() {
    window.removeEventListener("scroll", runScroll, { passive: true });
    window.removeEventListener("resize", runResize, { passive: true });
}).register("(min-width: 768px)", function() {
    window.addEventListener("scroll", runScroll, { passive: true });
    window.addEventListener("resize", runResize, { passive: true });
});

//That's all set up, on to the kick off
$(document).ready(function(){ 
	enquire.register("(min-width: 768px)", function() {
		setupCover();
	});
});


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