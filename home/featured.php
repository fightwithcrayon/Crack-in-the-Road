<?php
function buildHomeFeatured() {
    $highlights = buildHomeFeaturedHighlights();
    $string .= $highlights[0];
    return array($string, $popular[1]);
}

function buildHomeFeaturedHighlights() {
	$displayedIds = array();
	$i = 0;
	$args = array( 
		'post__in' => get_option('sticky_posts'),
        'posts_per_page' => 3
		);
    $sticky = get_posts( $args ); 
    foreach($sticky as $post) {
    	$displayedIds[] = $post->ID;
        $image = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), array(900,900)); 
        $tracks = get_post_meta($post->ID, 'audioObjects', true);
        $string .= '<article class="featured block">
            <figure class="image">
                <img srcset="'. $image .'" alt="'. $post->post_title .'" />
                <figcaption>
                    <a href="#" name="'. $post->post_title .'" data-tracks=""></a>
                    <a href="'. get_the_permalink($post->ID) .'" name="'. $post->post_title .'" data-tracks></a>
                </figcaption>
            </figure>
            <div class="info">
                <a href="'. get_the_permalink($post->ID) .'" name="'. $post->post_title .'" class="simple">'. customTitle($post, 'Featured') .'</a>
                <p>'. customExcerpt($post) .'</p>
                <span class="more">
                    <a href="'. get_the_permalink($post->ID) .'" name="'. $post->post_title .'">Read more</a>
                </span> 
            </div>
        </article>';
    	$i++;
    	if($i == 6) {    
            $popular = buildHomeFeaturedPopular($highlights[1]);
            $string .= $popular[0];
    	}
    };
    wp_reset_postdata();
    $output = array($string, $displayedIds);
    return $output;
}

function buildHomeFeaturedPopular($displayedIds) {
    $displayedIds = $output[1];
    $i = 0;
    $top_posts = stats_get_csv('postviews', 'days=1&limit=10'); 
    $string .= '<aside class="featured_popular"><h3 class="entry">Popular today</h3>';
    foreach($top_posts as $popular) {
        if($i > 4) { break; }
        if($popular['post_title'] != 'Home page' && $popular['post_title'] != 'Front Page' && $popular['post_id'] != 8901) { 
            $displayedIds[] = $popular['post_id'];
            $title = get_the_title($popular['post_id']);
            $string .= '<article class="entry">
                                <a href="' . get_the_permalink($popular['post_id']) . '" name="' . $title . '" class="simple">
                                    '. $title .'
                                </a>
                        </article>';
        $i++;
        };
    }
    $string .= '</aside>';
    $output = array($string, $displayedIds);
    return $output;
}

?>