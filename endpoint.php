<?php
error_reporting(-1);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
define( 'DOING_AJAX', true );
define( 'SHORTINIT', true );
$path = '.';
require_once "{$path}/wp-load.php";
require_once "{$path}/wp-includes/taxonomy.php";
require_once "{$path}/wp-includes/class-wp-meta-query.php";
require_once "{$path}/wp-includes/class-wp-tax-query.php";
require_once "{$path}/wp-includes/class-wp-meta-query.php";
require_once "{$path}/wp-includes/comment.php";
require_once "{$path}/wp-includes/cache.php";
require_once "{$path}/wp-includes/media.php";
require_once "{$path}/wp-includes/meta.php";
require_once "{$path}/wp-includes/post.php";
require_once "{$path}/wp-includes/user.php";
require_once "{$path}/wp-includes/formatting.php";
require_once "{$path}/wp-includes/class-wp-post.php";
require_once "{$path}/wp-includes/class-wp-query.php";

header( 'Access-Control-Allow-Origin: *');
header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
header( 'Access-Control-Allow-Credentials: true' );

$route = $_GET['api'];
if ($route === 'home') wp_send_json(home());
if ($route === 'post') wp_send_json(post());
if ($route === 'posts') wp_send_json(posts());

function home () {
	return array(
		'stats' => get_option('popular_stats'),
		'spotify' => get_option('spotify_playlist'),
		'posts' => posts(true),
		'featured' => featured(true)
	);
}
function featured ($short = true) {
    $posts = new WP_Query(
    	array(
    		'post_type' => 'post',
    		'post_status' => 'publish',
    		'posts_per_page' => 3,
    		'post__in' => get_option( 'sticky_posts' )
    	)
    );
    $posts = $posts->posts;
    format_posts($posts);
	return $posts;
}
function posts ($short = false) {
	$page = $_GET['page'] || 1;
    $posts = new WP_Query(
    	array(
    		'post_type' => 'post',
    		'post_status' => 'publish',
    		'paged' => $page,
    		'ignore_sticky_posts' => true
    	)
    );
    $posts = $posts->posts;
    format_posts($posts);
	return $posts;
}
function post () {
	$post = get_post($_GET['id']);
	return $post;
}



function format_posts (&$posts) {
    foreach($posts as &$post) {
    	$post = array(
    		'id' => $post->ID,
	    	'title' => $post->post_title,
	    	'custom_title' => customTitle($post->post_title),
	    	'custom_excerpt' => customExcerpt($post),
	    	'link' => get_permalink($post),
	    	'thumbnail_id' => get_post_thumbnail_id( $post->ID ),
	    	'featured_image_srcset' => set_url_scheme(wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), array(400,400))),
	    	'featured_image_url' => wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID), array(50,50))[0]
    	);
    }
}


function customExcerpt($post) {
	if($post->post_excerpt != null && $post->post_excerpt != '') {
		return $post->post_excerpt;
	} else {
		if(isset($post->post_content)) {
			$array = explode('. ',strip_tags($post->post_content));
		}
		if(strlen($array[0]) < 90) {
			return $array[0] . '.';
		}
		else {
			return substr($array[0], 0 , 90) . '...';
		}
	}
}



function customTitle($title, $customtag = null) {
	$structure = array();

	//Extract category tag
	$tag = explode(': ',$title);
	if(is_array($tag)) {
		$structure['tag'] = $tag[0];
		$remainingTitle = substr($title, (strlen($tag[0]) + 2));
	} else {
		// We didn't find a tag, just pass the full title to next section
		$remainingTitle = $title;
	}

	//Extract track/artist name
	$remainingTitle = str_replace('&#8211;', '-', $remainingTitle);

	$track = explode(' - ',$remainingTitle);

	if(is_array($track)) {
		$structure['artist'] = $track[0];
		$structure['track'] = $track[1];
	}

	// Now let's print
	$flags = array(
		'notag' => false,
		'fulltitle' => false
	);
	if($customtag != null) {
		$output .= '<div class="tag">'. $customtag. '</div>';
	} elseif (array_key_exists('tag', $structure) && $structure['tag'] != '') {
		$output .= '<div class="tag">'. $structure['tag']. '</div>';
	} else {
		$flags['notag'] = true;
	}
	if(array_key_exists('track', $structure) && $structure['track'] != '') {
		$output .= '<h4 class="artist">' . $structure['artist']. '</h4>';
		$output .= '<h4 class="track">' . $structure['track']. '</h4>';
	}
	elseif (array_key_exists('artist', $structure) && $structure['artist'] != '') {
		$output .= '<h4 class="full">' . $structure['artist']. '</h4>';
	} else {
		$flags['fulltitle'] = true;
	}
	if($flags['notag'] == true && $customtag != null) {
		$output .= '<h4 class="full">' . $title. '</h4>';
	}elseif($flags['fulltitle'] == true) {
		$output .= '<h4 class="full">' . $title. '</h4>';
	}
	return $output;
}

function getTag($title) {
	$tag = explode(': ',$title);
	if(is_array($tag)) {
		return $tag[0];
	} 
}
function get_post_thumbnail_id($id = null) {
    return get_post_meta( $id, '_thumbnail_id', true );
}
function add_shortcode($dummy, $dummytwo) {
	return true;
}
function set_url_scheme( $url, $scheme = null ) {
	return str_replace('WP_CONTENT_URL', 'https://www.crackintheroad.com/wp-content', $url);
}
function get_permalink( $post = 0, $leavename = false ) {
    $rewritecode = array(
        '%year%',
        '%monthnum%',
        '%day%',
        '%hour%',
        '%minute%',
        '%second%',
        $leavename? '' : '%postname%',
        '%post_id%',
        '%category%',
        '%author%',
        $leavename? '' : '%pagename%',
    );
 
    if ( is_object( $post ) && isset( $post->filter ) && 'sample' == $post->filter ) {
        $sample = true;
    } else {
        $post = get_post( $post );
        $sample = false;
    }
 
    if ( empty($post->ID) )
        return false;
 
    if ( $post->post_type == 'page' )
        return get_page_link($post, $leavename, $sample);
    elseif ( $post->post_type == 'attachment' )
        return get_attachment_link( $post, $leavename );
    elseif ( in_array($post->post_type, get_post_types( array('_builtin' => false) ) ) )
        return get_post_permalink($post, $leavename, $sample);
 
    $permalink = get_option('permalink_structure');
    /**
     * Filters the permalink structure for a post before token replacement occurs.
     *
     * Only applies to posts with post_type of 'post'.
     *
     * @since 3.0.0
     *
     * @param string  $permalink The site's permalink structure.
     * @param WP_Post $post      The post in question.
     * @param bool    $leavename Whether to keep the post name.
     */
    $permalink = apply_filters( 'pre_post_link', $permalink, $post, $leavename );
 
    if ( '' != $permalink && !in_array( $post->post_status, array( 'draft', 'pending', 'auto-draft', 'future' ) ) ) {
        $unixtime = strtotime($post->post_date);
 
        $category = '';
        if ( strpos($permalink, '%category%') !== false ) {
            $cats = get_the_category($post->ID);
            if ( $cats ) {
                $cats = wp_list_sort( $cats, array(
                    'term_id' => 'ASC',
                ) );
 
                /**
                 * Filters the category that gets used in the %category% permalink token.
                 *
                 * @since 3.5.0
                 *
                 * @param WP_Term  $cat  The category to use in the permalink.
                 * @param array    $cats Array of all categories (WP_Term objects) associated with the post.
                 * @param WP_Post  $post The post in question.
                 */
                $category_object = apply_filters( 'post_link_category', $cats[0], $cats, $post );
 
                $category_object = get_term( $category_object, 'category' );
                $category = $category_object->slug;
                if ( $parent = $category_object->parent )
                    $category = get_category_parents($parent, false, '/', true) . $category;
            }
            // show default category in permalinks, without
            // having to assign it explicitly
            if ( empty($category) ) {
                $default_category = get_term( get_option( 'default_category' ), 'category' );
                if ( $default_category && ! is_wp_error( $default_category ) ) {
                    $category = $default_category->slug;
                }
            }
        }
 
        $author = '';
        if ( strpos($permalink, '%author%') !== false ) {
            $authordata = get_userdata($post->post_author);
            $author = $authordata->user_nicename;
        }
 
        $date = explode(" ",date('Y m d H i s', $unixtime));
        $rewritereplace =
        array(
            $date[0],
            $date[1],
            $date[2],
            $date[3],
            $date[4],
            $date[5],
            $post->post_name,
            $post->ID,
            $category,
            $author,
            $post->post_name,
        );
        $permalink = home_url( str_replace($rewritecode, $rewritereplace, $permalink) );
        $permalink = user_trailingslashit($permalink, 'single');
    }
    return apply_filters( 'post_link', $permalink, $post, $leavename );
}
function get_the_category( $id = false ) {
    $categories = get_the_terms( $post, 'category' );
    if ( ! $categories || is_wp_error( $categories ) )
        $categories = array();
 
    $categories = array_values( $categories );
 
    foreach ( array_keys( $categories ) as $key ) {
        _make_cat_compat( $categories[$key] );
    }
    return $categories;
}
function get_the_terms( $post, $taxonomy ) {
    if ( ! $post = get_post( $post ) )
        return false;
 
    $terms = get_object_term_cache( $post->ID, $taxonomy );
    if ( false === $terms ) {
        $terms = wp_get_object_terms( $post->ID, $taxonomy );
        if ( ! is_wp_error( $terms ) ) {
            $term_ids = wp_list_pluck( $terms, 'term_id' );
            wp_cache_add( $post->ID, $term_ids, $taxonomy . '_relationships' );
        }
    }
 
    /**
     * Filters the list of terms attached to the given post.
     *
     * @since 3.1.0
     *
     * @param array|WP_Error $terms    List of attached terms, or WP_Error on failure.
     * @param int            $post_id  Post ID.
     * @param string         $taxonomy Name of the taxonomy.
     */
    $terms = apply_filters( 'get_the_terms', $terms, $post->ID, $taxonomy );
 
    if ( empty( $terms ) )
        return false;
 
    return $terms;
}
function  __( $text, $domain = false ) {
	return $text;
}
function home_url ($string) {
	return 'https://www.crackintheroad.com' . $string;
}
function user_trailingslashit( $string, $type_of_string ) {
	return $string;
}
?>