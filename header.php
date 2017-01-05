<head>  
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="/wp-content/themes/clean/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
	<link href="/wp-content/themes/clean/stylesheets/font.css" media="all" rel="stylesheet" type="text/css" />
	<link href="/wp-content/themes/clean/stylesheets/print.css" media="print" rel="stylesheet" type="text/css" />
	<!--[if IE]>
		<link href="/wp-content/themes/clean/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
	<![endif]-->
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<section id="cover">
<?php
if(is_home()) {
	$args = array(
		'posts_per_page' => 1,
		'post__in'  => get_option( 'sticky_posts' ),
		'ignore_sticky_posts' => 1
	);
	$query = new WP_Query( $args );
	while ( $query->have_posts() ) : $query->the_post();
		$attachment = get_post_thumbnail_id();
		$featured_srcset = wp_get_attachment_image_srcset($attachment, array(1920,1024));
		$title = get_the_title();
	endwhile;
} else {
	$attachment = get_post_thumbnail_id();
	$featured_srcset = wp_get_attachment_image_srcset($attachment, array(1920,1080));
}
?>
	<figure>
			<img alt="<?php echo $title; ?>" title="<?php echo $title; ?>" srcset="<?php echo $featured_srcset; ?>">
	</figure>
</section>
<nav id="nav" <?php if(is_home()){ echo 'class="home"'; } ?> >
	<a href="<?php echo home_url(); ?>">Crack in the Road</a>
	<?php if(!is_home()){ ?><a href="<?php echo home_url(); ?>"><span class="font_small">Return home<i class="icon-th"></i></span></a><?php } ?>
	<a href=""><span class="font_small">Menu<i class="icon-menu"></i></span></a>
</nav>
<div id="thepage">