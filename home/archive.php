<?php
function buildHomeArchive($post){ 	
	//When we call via WP_Query, post object is empty. Fake it here.
	if($post == null) {
		$post = new stdClass();
		$post->ID = get_the_ID();
		$post->post_title = get_the_title();
	}
	$image = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), array(400,400)); 
	?>
	<article class="archive block">
		<div class="image">
			<a href="<?php the_permalink(); ?>" name="<?php echo $post->post_title ?>">
				<img srcset="<?php echo $image; ?>" alt="<?php echo $post->post_title; ?>" title="<?php echo $post->post_title; ?>" />
			</a>
		</div>
		<div class="info">
			<a href="<?php the_permalink(); ?>" name="<?php echo $post->post_title ?>" class="simple"><?php echo customTitle($post); ?></a>
			<p><?php echo customExcerpt($post); ?></p>
			<span class="more">
				<a href="<?php the_permalink(); ?>" name="<?php echo $post->post_title ?>">Read more</a>
			</span>
		</div>
	</article>
<?php
}

?>