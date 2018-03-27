<?php
add_action( 'rest_api_init', function() {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
		header( 'Access-Control-Allow-Origin: *');
		header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
		header( 'Access-Control-Allow-Credentials: true' );
		return $value;
	});
}, 15 );
function rest_post_thumbnail() {
    register_rest_field( 
	    'post',
	    'featured_image_url',
	    array(
			'get_callback'    => 'rest_get_small_thumbnail_url',
			'update_callback' => null,
			'schema'          => null,
		)
	);
    register_rest_field( 
	    'post',
	    'featured_image_srcset',
	    array(
			'get_callback'    => 'rest_get_featured_image_srcset',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
function rest_post_custom_excerpt() {
    register_rest_field( 
	    'post',
	    'custom_excerpt',  //key-name in json response
	    array(
			'get_callback'    => 'customExcerpt',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
function rest_post_custom_title() {
    register_rest_field( 
	    'post',
	    'custom_title',  //key-name in json response
	    array(
			'get_callback'    => 'rest_get_custom_title',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'rest_post_thumbnail' );
add_action( 'rest_api_init', 'rest_post_custom_excerpt' );
add_action( 'rest_api_init', 'rest_post_custom_title' );

function prefix_register_example_routes() {
    register_rest_route( 'custom', '/home', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'rest_get_home',
    ) );
    register_rest_route( 'custom', '/stats', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'rest_get_popular_stats',
    ) );
    register_rest_route( 'custom', '/spotify', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'rest_get_spotify_playlists',
    ) );
    register_rest_route( 'custom', '/routes', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'rest_get_routes',
    ) );
}
 
add_action( 'rest_api_init', 'prefix_register_example_routes' );

function rest_get_popular_stats( $object) {
	$stats = get_option('popular_stats');
    return rest_ensure_response($response);
}
function rest_get_spotify_playlists( $object) {
    return rest_ensure_response(get_option('spotify_playlist'));
}
function rest_get_home ($object) {
    $posts = new WP_Query(array(
		'post_type' => 'post',
		'post_status' => 'publish',
		'posts_per_page' => '30'
	));
    $featured = new WP_Query(array(
		'post_type' => 'post',
		'post_status' => 'publish',
		'posts_per_page' => '3',
		'post__in'  => get_option( 'sticky_posts' )
	));
    return rest_ensure_response(array(
		'posts' => format_posts($posts->posts),
		'featured' => format_posts($posts->posts),
		'spotify' => get_option('spotify_playlist'),
		'stats' => get_option('popular_stats')
	));
}
function rest_get_routes ($object) {
    $posts = new WP_Query(array('post_type' => 'post', 'posts_per_page' => '100', 'post_status' => 'publish'));
    $permalinks = array();
    foreach($posts->posts as $post) {
    	$permalinks[] = get_permalink($post->ID);
    }
    return rest_ensure_response($permalinks);
}
function rest_get_featured_image_srcset( $object) {
    return wp_get_attachment_image_srcset( get_post_thumbnail_id( $object['id'] ), array(400,400));
}
function rest_get_custom_title( $object, $field_name, $request ) {
	$post = (object) ['post_title' => $object['title']['rendered']];
    return customTitle($post);
}
function rest_get_small_thumbnail_url($post){
    if(has_post_thumbnail($post['id'])){
        $imgArray = wp_get_attachment_image_src( get_post_thumbnail_id( $post['id'] ), array(50,50) );
        $imgURL = $imgArray[0];
        return $imgURL;
    } else {
        return '';
    }
}

function format_posts ($posts) {
	$targetset = [];
    foreach($posts as $post) {
    	$targetset[] = array(
    		'id' => $post->ID,
	    	'title' => $post->post_title,
	    	'custom_title' => customTitle($post),
	    	'custom_excerpt' => customExcerpt($post),
	    	'link' => get_permalink($post),
	    	'thumbnail_id' => get_post_thumbnail_id( $post->ID ),
	    	'featured_image_srcset' => set_url_scheme(wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), array(400,400))),
	    	'featured_image_url' => wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID), array(50,50))[0]
		);
	}
	return $targetset;
}