<?php

add_theme_support( 'post-thumbnails' ); 


function dummyBox($width, $height, $text, $style = '', $custom = null) {
	if($custom == null) {
		echo '<div class="prototype" style="width:'. $width .'; height:'. $height .'; '. $style .'">' . $text .'</div>';
	} else {
		echo '<'. $custom .' class="prototype" style="width:'. $width .'; height:'. $height .'; '. $style .'">' . $text .'</'. $custom .'>';
	}
}

//Custom endpoints
function get_sticky_posts() {
    $posts = get_posts(
        array(
            'post__in' => get_option('sticky_posts')
        )
    );

    if (empty($posts)) {
        return null;
    }

    return $posts;
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'clean/v2', '/sticky', array(
        'methods' => 'GET',
        'callback' => 'get_sticky_posts',
    ));
});

function gt_exclude_sticky( $query ) {
    if ( $query->is_home() && $query->is_main_query() && !is_admin() ) {
        //show the sticky post in its chronological place
        $query->set( 'ignore_sticky_posts', 1 );
    }
}
add_action( 'pre_get_posts', 'gt_exclude_sticky' );


function artist_taxonomy() {
    // Add Artist taxonomy, make it hierarchical (like categories)
    $artisttax = array( 
        'name' => __( 'Artist', 'taxonomy general name' ),
        'singular_name' => __( 'Artist', 'taxonomy singular name' ),
        'search_items' =>  __( 'Search Artists' ),
        'popular_items' => __( 'Popular Artists' ),
        'all_items' => __( 'All Artists' ),
        'parent_item' => __( 'Parent Artist' ),
        'parent_item_colon' => __( 'Parent Artist:' ),
        'edit_item' => __( 'Edit Artist' ), 
        'update_item' => __( 'Update Artist' ),
        'add_new_item' => __( 'Add New Artist' ),
        'new_item_name' => __( 'New Artist' ),
    );  

    register_taxonomy('ha_artist', array('post'), array(
        'hierarchical' => true,
        'labels' => $artisttax,
        'show_ui' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'artist' ),
        'capabilities' =>  array(
            'edit_terms' => 'edit_posts',
            'assign_terms' => 'edit_posts'
            )
      ));
}
add_action('init', 'artist_taxonomy');

require('functions/init.php');
require('functions/services.php');
require('functions/audio.php');
require('functions/layout.php');
require('functions/intelligence.php');

require('home/featured.php');
require('home/archive.php');
require('home/playlists.php');
require('home/inline.php');

?>