<?php

add_filter('show_admin_bar', '__return_false');

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