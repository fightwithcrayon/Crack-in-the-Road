<?php get_header(); ?>
<section class="featured divider">
	<?php
	$output = buildHomeFeatured();
	echo $output[0];
	?>
</section>
<section class="playlists wide-content">
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
<section class="archive full-content">
	<?php
	$vw = 'calc(25vw - 60px)';
	if(have_posts()): while(have_posts()): the_post(); 
		buildHomeArchive($post);
	endwhile; endif;
	?>
</section>
<?php get_footer(); ?>