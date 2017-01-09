<?php

function loadAudioPlayer() {
   // wp_enqueue_script( 'soundmanager', get_stylesheet_directory_uri() . '/class/soundmanager/soundmanager2-jsmin.js', null, '2.97a', true);
    //wp_enqueue_script( 'waveform', get_stylesheet_directory_uri() . '/js/waveform.js', null, '1', true);
}
add_action( 'wp_enqueue_scripts', 'loadAudioPlayer' );


function captureSoundcloudObjects($content) {
	$soundcloudID = '543a39f54bd63a00779211590a0f96a8';

	preg_match_all('/<iframe.*url=.*api.soundcloud.com\/tracks\/([0-9]+).*\".*><\/iframe>/i', $content, $matches);

	$tracks = array();
	foreach($matches[1] as $ID) {
		$result = file_get_contents("http://api.soundcloud.com/tracks/" . $ID . "?client_id=" . $soundcloudID);
		$JSON = json_decode($result);
		$tracks[] = array(
			'id' => $JSON->id,
			'user' => $JSON->user,
			'title' => $JSON->title,
			'stream_url' => preg_replace("/^https:/i", "http:", $JSON->stream_url),
			'waveform_url' => $JSON->waveform_url,
			'download_url' => $JSON->download_url,
			'permalink_url' => $JSON->permalink_url,
			'artwork_url' => $JSON->artwork_url,
			);
	};
	return $tracks;
}

function captureAudioObjects($data , $postarr) {
	$tracks = array();

	$tracks['soundcloud'] = captureSoundcloudObjects($postarr['post_content']);
	// Need to add additional searches for Bandcamp etc here

	update_post_meta($postarr['ID'], 'audioObjects', $tracks);
	return $data;
}
add_filter( 'wp_insert_post_data', 'captureAudioObjects', '99', 2 );

function stripAudioObjects($content) {
	global $post;
	$tracks = get_post_meta($post->ID, 'audioObjects', true);
	if(isset($tracks['soundcloud'])) {
		$content = preg_replace('/<iframe.*url=.*api.soundcloud.com\/tracks\/([0-9]+).*\".*><\/iframe>/i', '', $content);
		return str_replace('<p></p>', '', $content);
	} else {
		return $content;
	}
}
//add_filter( 'the_content', 'stripAudioObjects' );

function insertPlayer($tracks) {
 	foreach($tracks['soundcloud'] as $track) { 
 		echo '<div class="audioobject block" type="' . $track['soundcloud'] .'" id="' . $track['id'] .'"><img class="artwork" src="' . $track['artwork_url'] .'" /><div class="info"><i class="play"></i><i class="add"></i><h4 class="artist">' . $track['user']->username .'</h4><h4 class="track">' . $track['title'] .'</h4></div></div>';
 	}
}
?>