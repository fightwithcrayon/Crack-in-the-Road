<?php get_header();
while(have_posts()): the_post(); 
$copy = apply_filters('the_content', get_the_content());
$title = get_the_title();
?>
<div class="page-content">
	<h1><?php echo $title ?></h1>
	<div class="tag"><?php echo getTag($title) ?></div>
 	<div class="copy">
	 	<?php echo $copy;
	 	$tracks = get_post_meta(get_the_ID(), 'audioObjects', true);
	 	//insertPlayer($tracks);?>
	 </div>
</div>
 	<?php
 	endwhile; 
 ?>
<?php get_footer(); ?>