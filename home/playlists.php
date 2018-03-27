<?php
function buildHomeSpotify(){
    getPlaylists();
    echo '<span class="more">
                View all
          </span><span class="less">
                Close
          </span>';
}
function loadSpotify() {
	require(get_stylesheet_directory() . '/class/spotify/SpotifyWebAPI.php');
	require(get_stylesheet_directory() . '/class/spotify/Session.php');
	require(get_stylesheet_directory() . '/class/spotify/Request.php');
	require(get_stylesheet_directory() . '/class/spotify/SpotifyWebAPIException.php');
}

function getPlaylists() {
    $set = get_option('spotify_playlist', true);
    if(is_array($set)) {	
		foreach($set as $playlist) { 
			?>
				<article class="playlist block">
					<?php echo '<a href="'. $playlist->link .'" name="'. $playlist->name .'">'; ?>
		            <figure class="image">
		            	<?php echo '<img data-srcset="'. playlistSrcset($playlist) .'" alt="'. $playlist->name .'" title="'. $playlist->name .'" class="lazyload blur-up" />'; ?>
		            </figure>
					<div class="info">
						<h4><?php echo str_replace('Crack in the Road ','',$playlist->name); ?></h4>
						<p><?php echo explode('<a href=',$playlist->description)[0]; ?></p>
						<a href="<?php echo $playlist->link; ?>" alt="Subscribe to <?php echo $playlist->name; ?>" name="Subscribe to <?php echo $playlist->name; ?>" class="subscribe">
							Subscribe
						</a>
						<span class="more">Last updated: <?php echo playlistDate($playlist); ?></span>
						</span>
					</div>
				</article>
			</a>
		<?php
		}
    }
}
function playlistSrcset($playlist){
	return $playlist->image . '.jpg 300w, '. $playlist->image . '_150.jpg 150w';
}
function playlistDate($playlist){
	return date('l jS', strtotime($playlist->last_updated));
}
?>