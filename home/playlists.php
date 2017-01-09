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
	require('wp-content/themes/clean/class/spotify/SpotifyWebAPI.php');
	require('wp-content/themes/clean/class/spotify/Session.php');
	require('wp-content/themes/clean/class/spotify/Request.php');
	require('wp-content/themes/clean/class/spotify/SpotifyWebAPIException.php');
}

function updateSpotify() {
	$ignore = array(
		'Release radar' => '37i9dQZEVXbs3J2wfh1mGg'
	);
	$set = get_option('spotify_playlist', true);
	if($set != null) {
		loadSpotify();
		$session = new SpotifyWebAPI\Session(
		    '4a98167631d64a4ca9e77f267cf3fb51',
		    'ac20fadd1b7e4574857fdefc52fa9aa3',
		    'http://citrdev:8888'
		);
		$api = new SpotifyWebAPI\SpotifyWebAPI();

		// Request a access token with optional scopes
		$scopes = array(
		    'playlist-read-private',
		    'user-read-private'
		);

		$session->requestCredentialsToken($scopes);
		$accessToken = $session->getAccessToken(); // We're good to go!

		// Set the code on the API wrapper
		$api->setAccessToken($accessToken);

		$set = array();
		$list = $api->getUserPlaylists('crackintheroad')->items;
		foreach($list as $entry) {
			if(!in_array($entry->id, $ignore)) {
				$set[] = $api->getUserPlaylist('crackintheroad', $entry->id);
			}
		}
		$set = json_encode($set);
		update_option('spotify_playlist', $set);
		return $set;
	} else {
		return $set;
	}
}

function getPlaylists() {
	$set = json_decode(updateSpotify());
	foreach($set as $playlist) { 
		?>
			<article class="playlist block">
				<?php echo '<a href="'. $playlist->external_urls->spotify .'" name="'. $playlist->name .'">'; ?>
	            <figure class="image">
	            	<?php echo '<img src="'. $playlist->images[0]->url .'" alt="'. $playlist->images[0]->name .'" />'; ?>
	            </figure>
				<div class="info">
					<h4><?php echo str_replace('Crack in the Road ','',$playlist->name); ?></h4>
					<p><?php echo explode('<a href=',$playlist->description)[0]; ?></p>
					<a href="<?php echo $playlist->external_urls->spotify; ?>" alt="Subscribe to <?php echo $playlist->name; ?>" name="Subscribe to <?php echo $playlist->name; ?>" class="subscribe">
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

function playlistDate($playlist){
	return date('l jS', strtotime($playlist->tracks->items[0]->added_at));
}
?>