<?php
function rest_post_thumbnail() {
    register_rest_field( 
	    'post',
	    'featured_image_url',  //key-name in json response
	    array(
			'get_callback'    => 'get_thumbnail_url',
			'update_callback' => null,
			'schema'          => null,
		)
	);
    register_rest_field( 
	    'post',
	    'featured_image_srcset',  //key-name in json response
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

function rest_get_featured_image_srcset( $object) {
    return wp_get_attachment_image_srcset( get_post_thumbnail_id( $object['id'] ), array(400,400));
}
function rest_get_custom_title( $object, $field_name, $request ) {
	$post = (object) ['post_title' => $object['title']['rendered']];
    return customTitle($post);
}
