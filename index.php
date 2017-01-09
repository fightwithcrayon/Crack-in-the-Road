<?php get_header(); ?>
<section class="featured divider">
	<?php
	$output = buildHomeFeatured();
	echo $output[0];
	?>
</section>
<section class="playlists wide-content">
    <h3>Playlists</h3>
    <h4>Latest updates</h4>
	<?php
	 buildHomeSpotify();
	?>
</section>
<section class="newsletter divider">
	<?php
	$vh = 'calc((25vw - 60px) * 1.5)';
	//getNewsletter();
	?>
</section>
<section class="archives infinitescroll full-content">
    <h3>Latest stories</h3>
    <h4>Everything we've written about</h4>
	<?php
	$vw = 'calc(25vw - 60px)';
	if(have_posts()): while(have_posts()): the_post(); 
		buildHomeArchive($post);
	endwhile; endif;
	?><div class="load-more"></div>
</section>
<?php get_footer(); ?>