<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport"  content="width=device-width, initial-scale=1" />
	<title><?php wp_title( ' | ', true, 'right' ); ?></title>
	<?php wp_head(); ?>
	<link href="<?php echo get_stylesheet_directory_uri() ?>/stylesheets/style-min.css?v=1.1.3" media="screen, projection" rel="stylesheet" type="text/css" />
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#88b04b">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<meta name="theme-color" content="#88b04b">
	<?php get_cover_details(); ?>
	<script>
		window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
		ga('create', 'UA-17970339-3', 'auto');
		ga('send', 'pageview');
	</script>
	<script async src='https://www.google-analytics.com/analytics.js'></script>
	<?php font_setup(); ?>
</head>
<body <?php body_class(); ?>>
<section id="cover">
<canvas id="sitetitle"></canvas>
	<figure>
		<img alt="<?php echo $title; ?>" title="<?php echo $title; ?>" srcset="<?php echo $featured_srcset; ?>">
		<figcaption>	
		<?php
			if(is_home()) {
				echo '<h2>' . $caption . '</h2>';
			} else {
				echo '<h1>' . $caption . '</h1>';
			}
		?></figcaption>
	</figure>
</section>
<nav id="nav" <?php if(is_home()){ echo 'class="home"'; } ?> >
	<a href="<?php echo home_url(); ?>">Crack in the Road</a>
	<?php if(!is_home()){ ?><a href="<?php echo home_url(); ?>"><span class="font_small">Return home<i class="icon-th"></i></span></a><?php } ?>
	<a href="#" data-action="openMenu">
		<span class="font_small">Menu<i class="icon-menu"></i></span>
	</a>
</nav>
<ul id="menu">
	<li><a href="https://www.crackintheroad.com/">Home</a></li>
	<li>&nbsp;</li>
	<li>(More to come throughout January)</li>
	<li class="close"></li>
</ul>
<div id="thepage">