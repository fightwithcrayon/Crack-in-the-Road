import PostImage from '../PostImage/PostImage';
import Details from '../Details/Details';
import Link from 'next/link';
import React from 'react';

const Tile = (props) => (
	<Link as={`/${props.post.category}/${props.post.slug}`} href="/[category]/[slug]">
		<a>
			<article>
				<PostImage alt={props.post.title} image={props.post.featured_image} ratio={75} sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, (max-width: 1300px) 33vw, 400px" srcset={[320, 412, 824]} />
				<Details post={props.post} />
			</article>
		</a>
	</Link>
);

export default Tile;