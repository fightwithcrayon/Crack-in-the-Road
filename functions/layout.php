<?php
function customExcerpt($post) {
	if($post->post_excerpt != null && $post->post_excerpt != '') {
		return $post->post_excerpt;
	} else {
		if(isset($post->post_content)) {
			$array = explode('. ',strip_tags($post->post_content));
		} else {
			$array = explode('. ',strip_tags(get_the_content()));
		}
		if(strlen($array[0]) < 90) {
			return $array[0] . '.';
		}
		else {
			return substr($array[0], 0 , 90) . '...';
		}
	}
}

function customTitle($post, $customtag = null) {
	$structure = array();

	//Extract category tag
	$tag = explode(': ',$post->post_title);
	if(is_array($tag)) {
		$structure['tag'] = $tag[0];
		$remainingTitle = substr($post->post_title, (strlen($tag[0]) + 2));
	} else {
		// We didn't find a tag, just pass the full title to next section
		$remainingTitle = $post->post_title;
	}

	//Extract track/artist name
	$remainingTitle = str_replace('&#8211;', '-', $remainingTitle);

	$track = explode(' - ',$remainingTitle);

	if(is_array($track)) {
		$structure['artist'] = $track[0];
		$structure['track'] = $track[1];
	}

	// Now let's print
	$flags = array(
		'notag' => false,
		'fulltitle' => false
	);
	if($customtag != null) {
		$output .= '<div class="tag">'. $customtag. '</div>';
	} elseif (array_key_exists('tag', $structure) && $structure['tag'] != '') {
		$output .= '<div class="tag">'. $structure['tag']. '</div>';
	} else {
		$flags['notag'] = true;
	}
	if(array_key_exists('track', $structure) && $structure['track'] != '') {
		$output .= '<h4 class="artist">' . $structure['artist']. '</h4>';
		$output .= '<h4 class="track">' . $structure['track']. '</h4>';
	}
	elseif (array_key_exists('artist', $structure) && $structure['artist'] != '') {
		$output .= '<h4 class="full">' . $structure['artist']. '</h4>';
	} else {
		$flags['fulltitle'] = true;
	}
	if($flags['notag'] == true && $customtag != null) {
		$output .= '<h4 class="full">' . $post->post_title. '</h4>';
	}elseif($flags['fulltitle'] == true) {
		$output .= '<h4 class="full">' . $post->post_title. '</h4>';
	}
	return $output;
}

function getTag($title) {
	$tag = explode(': ',$title);
	if(is_array($tag)) {
		return $tag[0];
	} 
}

function filter_ptags_on_images($content)
{
    return preg_replace('/<p>(\s*)(<img .* \/>)(\s*)<\/p>/iU', '\2', $content);
}
add_filter('the_content', 'filter_ptags_on_images');
?>