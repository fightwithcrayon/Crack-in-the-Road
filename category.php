<?php 
$category = get_category( get_query_var( 'cat' ) );
get_header(); ?>
<section class="archives infinitescroll full-content">
    <h2><?php echo $category->name; ?></h2>
    <h3>Everything we've written about <?php echo $category->name; ?></h3>
	<?php
	if(have_posts()): while(have_posts()): the_post(); 
		buildHomeArchive($post);
	endwhile; endif;
	?>
	<div class="load-more" data-query="categories=<?php echo $category->term_id; ?>"></div>
</section>
<?php get_footer(); ?>