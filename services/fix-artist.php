<?php
define( 'WP_USE_THEMES', false ); 
require( '../../../../wp-load.php' );
if (session_status() == PHP_SESSION_NONE) {
    session_start();
    $_SESSION['offset'] = 0;
} else {
	$offset = $_SESSION['offset'];
}
if($_POST['fix'] == true) {
	buildForm();
} else if($_POST['stage2'] == true) {
	processForm();
} else {
	firstStage();
}
function firstStage(){
	$quantity = 250;
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
	  'tax_query' => array(
	    array(
	      'taxonomy' => 'ha_artist',
	      'field' => 'id',
	      'terms' => $tags,
	      'operator' => 'NOT IN'
	    )
	  )
	);
	$untagged = new WP_Query( $args );
	$i = 0;
	foreach($untagged->posts as $post) {
		$title = splitTitle($post->post_title);
		if($title['artist'] != null && $title['artist'] != '') { 
			$existingterm = get_term_by('name', $title['artist'], 'ha_artist');
			if($existingterm != false) { 
				wp_set_object_terms( $post->ID, $existingterm->term_id, 'ha_artist', true );
				$output['success'][] = array(
					'artist' => $title['artist'],
					'id' => $post->ID,
					'added_existing_term' => $existingterm->term_id
				);
			} else {
				$verification = lastfmVerification($title['artist']);
				if($verification[0] == 'Valid') {
					$term = wp_insert_term( $title['artist'], 'ha_artist' );
					wp_set_object_terms( $post->ID, $term['term_id'], 'ha_artist', true );
					$output['success'][] = array(
						'artist' => $title['artist'],
						'title' => $post->post_title,
						'id' => $post->ID,
						'status' => $verification[0],
						'added_new_term' => $term['term_id']
					);
				} else if($verification[0] == 'Moved') {
					if (strcasecmp($verification['X-PJAX-URL'][0], $verification['X-PJAX-URL'][1]) == 0) {
						$term = wp_insert_term( $title['artist'], 'ha_artist' );
						wp_set_object_terms( $post->ID, $term['term_id'], 'ha_artist', true );
						$output['success'][] = array(
							'artist' => $title['artist'],
							'title' => $post->post_title,
							'id' => $post->ID,
							'status' => 'Valid, but ignored capitalisation'
						);
					} else {
						$output['attention'][] = array(
							'artist' => $title['artist'],
							'title' => $post->post_title,
							'id' => $post->ID,
							'status' => 'Moved, artist name different'
						);
					}
				} else {
					$output['failed'][] = array(
						'artist' => $title['artist'],
						'title' => $post->post_title,
						'id' => $post->ID,
						'status' => $verification[0]
					);
				}
			}
		}
		$i++;
	};
	if($i == $quantity) {
		$_SESSION['offset']++;
		header( "refresh:3" );
		echo '<h2>'. ($i * $_SESSION['offset']) .' posts of '. $untagged->post_count .' reviewed</h2>';
		var_dump($output);
	} else {
		session_destroy();
		echo '<h2>'. ($i * $_SESSION['offset']) .' posts of '. $untagged->post_count .' reviewed.</h2>
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

function lastfmVerification($artist){
	$url = 'https://www.last.fm/music/';
	$headers = get_headers($url . urlencode($artist), 1);
	if ($headers[0] == 'HTTP/1.1 200 OK' || $headers[0] == 'HTTP/1.0 200 OK' || $headers[0] == 'HTTP/2.0 200 OK') {
		return array('Valid', $headers);
	}
	else if ($headers[0] == 'HTTP/1.0 301 Moved Permanently') {
		return array('Moved', $headers);
	} else {
		return array('Error for "' . $url . urlencode($artist) . '". Returned ' . $headers[0], $headers);
	}
}

?>