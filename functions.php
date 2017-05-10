<?php

add_filter('show_admin_bar', '__return_false');
add_theme_support( 'post-thumbnails' );
define('WP_HTTP_BLOCK_EXTERNAL', false);
add_filter( 'auto_update_plugin', '__return_false' );
add_filter( 'auto_update_theme', '__return_false' );

require('functions/init.php');
require('functions/audio.php');
require('functions/admin.php');
require('functions/layout.php');
require('functions/intelligence.php');

require('home/featured.php');
require('home/archive.php');
require('home/playlists.php');
require('home/inline.php');

function str_replace_first($from, $to, $subject) {
    $from = '/'.preg_quote($from, '/').'/';
    return preg_replace($from, $to, $subject, 1);
}

?>
