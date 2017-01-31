<?php
add_filter('show_admin_bar', '__return_false');

function dequeue_core_default() {
	if (!is_admin()) {
		wp_deregister_script('wp-embed');
		wp_deregister_script('jquery-migrate');  // Bonus: remove jquery too if it's not required
	}
}
add_action('init', 'dequeue_core_default');

function dequeue_core() {
    wp_deregister_style('dashicons');
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); 
	remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
}
add_action( 'wp_enqueue_scripts', 'dequeue_core' );

function font_setup(){
	 $host = $_SERVER['HTTP_HOST']; 
	 $output = '';
	 if($host == "www.crackintheroad.com" || $host == "crackintheroad.com") {
		$output .= '<script src="https://use.typekit.net/nrb2ssy.js"></script>';
		$output .= '<script>try{Typekit.load({ async: true });}catch(e){}</script>';
	 } else {
	 	$output .= '<!--Dev fonts -->';
		$output .= '<script src="https://use.typekit.net/gtb5zrx.js"></script>';
		$output .= '<script>try{Typekit.load({ async: true });}catch(e){}</script>';
	 }
	 echo $output;
}

?>