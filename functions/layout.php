<?php
function get_cover_details(){
	$cover = array();
	if(is_home()) {
		$args = array(
			'posts_per_page' => 1,
			'post__in'  => get_option( 'sticky_posts' ),
			'ignore_sticky_posts' => 1
		);
		$query = new WP_Query( $args );
		while ( $query->have_posts() ) : $query->the_post();
			$attachment = get_post_thumbnail_id();
			$cover['featured_srcset'] = wp_get_attachment_image_srcset($attachment, array(1920,1024));
			$cover['title'] = get_the_title();
			$cover['thumb'] = wp_get_attachment_image_src($attachment, 'large', true);
			$customtitle = explode(': ',$cover['title']);
			$cover['caption'] = 'Cover story: ' . $customtitle[1];
			echo '<meta property="og:image" content="' . $$cover['thumb'][0] . '">';
			echo '<meta property="og:image:width" content="' . $cover['thumb'][1] .'">';
			echo '<meta property="og:image:height" content="' . $cover['thumb'][2] .'">';
		endwhile;
	} elseif(is_single()) {
		$attachment = get_post_thumbnail_id();
		$cover['featured_srcset'] = wp_get_attachment_image_srcset($attachment, array(1920,1080));
		$cover['title'] = get_the_title();
		$cover['caption'] = $cover['title'];
	} elseif(is_404()) {
		$cover['featured_srcset'] = wp_get_attachment_image_srcset('29704', array(1920,1080));
		$cover['title'] = 'Alexandra Bondi De Antoni, 2014';
		$cover['caption'] = '404: Page not found';
		echo '<meta property="og:image" content="' . $cover['thumb'][0] . '">';
		echo '<meta property="og:image:width" content="' . $cover['thumb'][1] .'">';
		echo '<meta property="og:image:height" content="' . $cover['thumb'][2] .'">';
	}
	return $cover;
}

function get_small_thumbnail_url($id){
    if(has_post_thumbnail($id)){
        $imgArray = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), array(50,50) );
        $imgURL = $imgArray[0];
        return $imgURL;
    } else {
        return false;
    }
}
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

function setup_lede_paragraph($content)
{
    return str_replace_first('.', '.</p><p>', $content);
}
add_filter('the_content', 'setup_lede_paragraph');
?>