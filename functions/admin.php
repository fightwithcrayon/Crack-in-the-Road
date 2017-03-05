<?php 

function tidy_post_boxes() {
	remove_meta_box( 'commentsdiv', 'post', 'normal' ); 
	remove_meta_box( 'postexcerpt', 'post', 'normal' ); 
	remove_meta_box( 'authordiv', 'post', 'normal' ); 
	remove_meta_box( 'trackbacksdiv', 'post', 'normal' ); 
	remove_meta_box( 'revisionsdiv', 'post', 'side' ); 
	remove_meta_box( 'commentstatusdiv', 'post', 'normal' ); 
	remove_meta_box( 'ha_artistdiv', 'post', 'side' ); 

	add_meta_box('ha_artistdiv', 'What artists does this story feature?', 'post_categories_meta_box', 'post', 'normal', 'high', array( 'taxonomy' => 'ha_artist' ) );

}
add_action( 'admin_menu', 'tidy_post_boxes' );


?>
