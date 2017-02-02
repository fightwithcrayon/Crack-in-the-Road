<?php
function dequeue_core_default() {
	if (!is_admin()) {
		wp_deregister_script('wp-embed');
		wp_deregister_script('jquery-migrate');  // Bonus: remove jquery too if it's not required
	}
}
add_action('init', 'dequeue_core_default');

function dequeue_core() {
    wp_deregister_style('dashicons');
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); 
	remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
}
add_action( 'wp_enqueue_scripts', 'dequeue_core' );

function font_setup(){
	$host = $_SERVER['HTTP_HOST']; 
	$output = '';
	if($host == "www.crackintheroad.com" || $host == "crackintheroad.com") { 
        $kitId = 'nrb2ssy';
    } else {
        $kitId = 'gtb5zrx';
        } ?>
    <script>
      (function(d) {
        var config = {
                  kitId: "<?php echo $kitId; ?>",
                  scriptTimeout: 3000,
                  async: true
            },h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);
            try{
                Typekit.load({
                  kitId: "<?php echo $kitId; ?>",
                  scriptTimeout: 3000,
                  async: true,
                  active: function() {
                    var timer = setInterval(function() {
                       if ($('html').hasClass('wf-scriptoramatradeshowjf-n4-active')) {
                        console.log('sorted');
                           scribbleTitle();
                           clearInterval(timer);
                       } else {
                        console.log('No luck');
                       }
                    }, 200);
                  },
                  inactive: console.log('Font loading failed')
                })
            }catch(e){

            }
        };s.parentNode.insertBefore(tk,s)
      })(document);
    </script>
<?php
}

function gt_exclude_sticky( $query ) {
    if ( $query->is_home() && $query->is_main_query() && !is_admin() ) {
        //show the sticky post in its chronological place
        $query->set( 'ignore_sticky_posts', 1 );
    }
}
add_action( 'pre_get_posts', 'gt_exclude_sticky' );


function artist_taxonomy() {
    // Add Artist taxonomy, make it hierarchical (like categories)
    $artisttax = array( 
        'name' => __( 'Artist', 'taxonomy general name' ),
        'singular_name' => __( 'Artist', 'taxonomy singular name' ),
        'search_items' =>  __( 'Search Artists' ),
        'popular_items' => __( 'Popular Artists' ),
        'all_items' => __( 'All Artists' ),
        'parent_item' => __( 'Parent Artist' ),
        'parent_item_colon' => __( 'Parent Artist:' ),
        'edit_item' => __( 'Edit Artist' ), 
        'update_item' => __( 'Update Artist' ),
        'add_new_item' => __( 'Add New Artist' ),
        'new_item_name' => __( 'New Artist' ),
    );  

    register_taxonomy('ha_artist', array('post'), array(
        'hierarchical' => true,
        'labels' => $artisttax,
        'show_ui' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'artist' ),
        'capabilities' =>  array(
            'edit_terms' => 'edit_posts',
            'assign_terms' => 'edit_posts'
            )
      ));
}
add_action('init', 'artist_taxonomy');

?>