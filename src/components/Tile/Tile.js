import styles from './Tile.module.scss';
import PostImage from '../PostImage/PostImage';
import Details from '../Details/Details';
import Link from 'next/link';
import React from 'react';

const Tile = ({ post }) => (
	<Link as={`/${post.category}/${post.slug}`} href="/[category]/[slug]">
		<a>
			<article className={styles.tile}>
				<PostImage alt={post.title} className={styles.image} image={post.image || post.old_image} ratio={false} sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, (max-width: 1300px) 33vw, 400px" srcset={[320, 412, 824]} />
				<Details className={styles.details} post={post} />
			</article>
		</a>
	</Link>
);

export default Tile;