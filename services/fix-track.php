<?php
define( 'WP_USE_THEMES', false ); 
require( '../../../../wp-load.php' );
if (session_status() == PHP_SESSION_NONE) {
    session_start();
    $_SESSION['offset'] = 0;
} else {
	$offset = $_SESSION['offset'];
}
firstStage();
function firstStage(){
	$quantity = 50;
	$output = array(
		'success' => array(),
		'failed' => array()
	);
	$tags = get_terms('ha_artist', array('fields'=>'ids') );
	$args = array(
	  'post_type' => 'post',
	  'posts_per_page' => $quantity,
	  'cat' => 301,
	  'offset' => ($quantity * $_SESSION['offset']),
	  'meta_query' => array(
		    array(
		     'key' => 'ha_track',
		     'compare' => 'EXISTS'
		    ),
		),
	  'tax_query' => array(
	    array(
	      'taxonomy' => 'ha_artist',
	      'field' => 'id',
	      'terms' => $tags,
	      'operator' => 'IN'
	    )
	  )
	);
	$untagged = new WP_Query( $args );
	$i = 0;
	foreach($untagged->posts as $post) { 
		$title = splitTitle($post->post_title);
		if($title['track'] != null && $title['track'] != '') { 
		//	update_post_meta($post->ID, 'ha_track', $title['track']);
			$output['success'][] = array(
					'artist' => $title['artist'],
					'track' => $title['track'],
					'id' => $post->ID
				);
			$verification = lastfmVerification($title['artist'], $title['track']);
			if($verification[0] == 'Valid') {
			//	$term = wp_insert_term( $title['artist'], 'ha_artist' );
			//	wp_set_object_terms( $post->ID, $term['term_id'], 'ha_artist', true );
				$output['success'][] = array(
					'artist' => $title['artist'],
					'track' => $title['track'],
					'id' => $post->ID,
					'status' => $verification[0],
					'added_new_term' => $term['term_id']
				);
			} else if($verification[0] == 'Moved') {
				if (strcasecmp($verification['X-PJAX-URL'][0], $verification['X-PJAX-URL'][1]) == 0) {
				//	$term = wp_insert_term( $title['artist'], 'ha_artist' );
				//	wp_set_object_terms( $post->ID, $term['term_id'], 'ha_artist', true );
					$output['success'][] = array(
						'artist' => $title['artist'],
						'track' => $title['track'],
						'id' => $post->ID,
						'status' => 'Valid, but ignored capitalisation'
					);
				} else {
					$output['attention'][] = array(
						'artist' => $title['artist'],
						'track' => $title['track'],
						'id' => $post->ID,
						'status' => 'Moved, artist name different'
					);
				}
			} else {
				$output['failed'][] = array(
					'artist' => $title['artist'],
					'track' => $title['track'],
					'id' => $post->ID,
					'status' => $verification[0]
				);
			}
		}
		$i++;
	};
	if($i == $quantity) {
		$_SESSION['offset']++;
		header( "refresh:3" );
		echo '<h2>'. ($i * $_SESSION['offset']) .' posts reviewed</h2>';
		var_dump($output);
	} else {
		session_destroy();
		echo '<h2>'. ($i * $_SESSION['offset']) .' posts reviewed.</h2>
				<p>We\'re finished for now, but '. (count($output['failed']) + count($output['attention'])) .'posts need further attention.</p>';
		var_dump($output);
	}
}

function buildForm(){
	$data = $_POST['data'];
	echo '<form>';
	foreach($data as $post) {
		echo $post->id . ' – ' . $post->title . ' ';
	}
	echo '</form>';
}

function splitTitle($post_title){ 
	$tag = explode(': ',$post_title);
	if(is_array($tag)) {
		$structure['tag'] = $tag[0];
		$remainingTitle = substr($post_title, (strlen($tag[0]) + 2));
	} else {
		// We didn't find a tag, just pass the full title to next section
		$remainingTitle = $post_title;
	}

	//Extract track/artist name
	$remainingTitle = str_replace('&#8211;', '-', $remainingTitle);

	$track = explode(' - ',$remainingTitle);

	if(is_array($track)) {
		$structure['artist'] = $track[0];
		$structure['track'] = $track[1];
	}
	return($structure);
}

function lastfmVerification($artist, $track){
	$url = 'https://www.last.fm/music/' . $artist . '/_/';
	$headers = get_headers($url . urlencode($track), 1);
	if ($headers[0] == 'HTTP/1.1 200 OK' || $headers[0] == 'HTTP/1.0 200 OK' || $headers[0] == 'HTTP/2.0 200 OK') {
		return array('Valid', $headers);
	}
	else if ($headers[0] == 'HTTP/1.0 301 Moved Permanently') {
		return array('Moved', $headers);
	} else {
		return array('Error for "' . $url . urlencode($track) . '". Returned ' . $headers[0], $headers);
	}
}

?>