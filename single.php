<?php get_header();
while(have_posts()): the_post(); 
$copy = apply_filters('the_content', get_the_content());
$title = get_the_title();
?>
<div class="page-content">
	<div class="title">
		<h1><?php echo $title ?></h1>
	</div>
	<ul class="meta font_small">
		<li>By <?php echo get_the_author(); ?></li>
		<li><?php echo get_the_date('jS M Y'); ?></li>
		<?php
			if(is_array($artists)) {
				echo '<li>Who is ' . $artists[0]->name . '?</li>';
			}
		?>
	</ul>
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