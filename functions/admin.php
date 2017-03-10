<?php 

function tidy_post_boxes() {
	remove_meta_box( 'commentsdiv', 'post', 'normal' ); 
	remove_meta_box( 'postexcerpt', 'post', 'normal' ); 
	remove_meta_box( 'authordiv', 'post', 'normal' ); 
	remove_meta_box( 'trackbacksdiv', 'post', 'normal' ); 
	remove_meta_box( 'revisionsdiv', 'post', 'side' ); 
	remove_meta_box( 'slugdiv', 'post', 'normal' ); 
	remove_meta_box( 'commentstatusdiv', 'post', 'normal' ); 
	remove_meta_box( 'ha_artistdiv', 'post', 'side' ); 

	add_meta_box('ha_artistdiv', 'What artists does this story feature?', 'post_categories_meta_box', 'post', 'side', 'high', array( 'taxonomy' => 'ha_artist' ) );

}
add_action( 'admin_menu', 'tidy_post_boxes' );

add_filter('manage_posts_columns', 'remove_default_post_columns',999);
function remove_default_post_columns($columns) {
    unset($columns['tags']);
    return $columns;
}
//Force the column on edit screen to be hidden
add_action( 'init', 'hide_seo_column' );
function hide_seo_column() {
	add_filter( 'the_seo_framework_show_seo_column', '__return_false' );
}

//Add custom post columns
add_filter( 'manage_posts_columns' , 'add_post_column' );
add_action( 'manage_posts_custom_column' , 'custom_post_columns', 10, 2 );
function add_post_column( $columns ) {
	unset($columns['author']);
	unset($columns['categories']);
	$columns = insertBeforeKey($columns, 'date', array('artist' => 'Artist'));
	$columns = insertBeforeKey($columns, 'date', array('track' => 'Track'));
	$columns = array_merge($columns, array('author' => 'Author'));
	$columns = array_merge($columns, array('categories' => 'Categories'));
	return $columns;
}
function custom_post_columns( $column, $post_id ) {
	switch ( $column ) {
		case 'artist':
			$terms = get_the_term_list( $post_id, 'ha_artist', '', ',');
			if ( is_string( $terms ) ) {
				echo $terms;
			}
			break;
		case 'track':
			echo get_post_meta($post_id, 'ha_track', true);
			break;
	}
}
function insertBeforeKey($array, $key, $data = null)
{
    if (($offset = array_search($key, array_keys($array))) === false) // if the key doesn't exist
    {
        $offset = 0; // should we prepend $array with $data?
        $offset = count($array); // or should we append $array with $data? lets pick this one...
    }
    return array_merge(array_slice($array, 0, $offset), (array) $data, array_slice($array, $offset));
}


?>
