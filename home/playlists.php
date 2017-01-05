<?php
function buildHomeSpotify(){
    echo '<h3 class="entry">New Spotify updates</h3>';
    getPlaylists();
}
function loadSpotify() {
	require('wp-content/themes/clean/class/spotify/SpotifyWebAPI.php');
	require('wp-content/themes/clean/class/spotify/Session.php');
	require('wp-content/themes/clean/class/spotify/Request.php');
	require('wp-content/themes/clean/class/spotify/SpotifyWebAPIException.php');
}
function dummySpotify() {
	$array = array();
	$array[] = file_get_contents('wp-content/themes/clean/home/spotify.json');
	$array[1] = $array[0];
	return $array;
}
function updateSpotify() {
	$set = get_option('spotify_playlist', true);
	if($set == null) {
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
		//On repeat playlist
		$set['onrepeat'] = $api->getUserPlaylist('crackintheroad', '1UB6gJIZpmiO0H2zmSbg02');
		// Songs of 2016 
		$set['2016'] = $api->getUserPlaylist('crackintheroad', '3t87SdSAITHk3Tgx0DcB4f');
		// All time 
		$set['alltime'] = $api->getUserPlaylist('crackintheroad', '2mmnk6wwEoBX5BOAu6UNfP');
		// 10 cuts 
		//$set['tencuts'] = $api->getUserPlaylist('holloway', '4PeaIVfy6tAVoAjb9SK2Ro');
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
			<a href="<?php $phplaylist->external_urls; ?>" name="<?php echo $playlist->name ?>">
				<img src="<?php echo $playlist->images[0]->url; ?>" alt="<?php echo $playlist->name; ?>" />
			</a>
			<div class="info">
				<h4><?php echo str_replace('Crack in the Road ','',$playlist->name); ?></h4>
				<p><?php echo explode('<a href=',$playlist->description)[0]; ?></p>
				<span class="more">
					<a href="<?php echo $playlist->external_urls->spotify; ?>" alt="Subscribe to <?php echo $playlist->name; ?>" name="Subscribe to <?php echo $playlist->name; ?>">Subscribe</a> – Last updated: <?php echo playlistDate($playlist); ?>
				</span>
			</div>
		</article>
	<?php
	}
}

function playlistDate($playlist){
	return date('l jS', strtotime($playlist->tracks->items[0]->added_at));
}
?>