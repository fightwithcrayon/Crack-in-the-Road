<?php 
get_header(); ?>
<section class="archives full-content">
    <h2>404</h2>
    <h3>Page not found</h3>
    <h3>But here's what's popular elsewhere on the site right now.</h3>
	<?php
    $top_posts = get_option('popular_stats', false);
    $post_ids = '';
    foreach($top_posts as $post) {
    	$post_ids .= $post[0] . ',';
    }
    $args = array(
    	'post__in' => rtrim($post_ids, ","),
	);
	$posts = new WP_Query( $args );
    foreach($posts->posts as $post) {
		buildHomeArchive($post);
	}
	?>
</section>
<?php get_footer(); ?>