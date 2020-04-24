import styles from './Featured.module.scss';
import React from 'react';
import Details from '../Details/Details';
import PostImage from '../PostImage/PostImage';

const Featured = ({ className, hasAuthor, post, tag: Tag }) => {
	return (
		<Tag className={`${styles.featured} ${className}`}>
			<Details className={styles.details} hasAuthor={hasAuthor} heading="h2" post={post} />
			<PostImage
				alt={post.title}
				className={styles.image}
				image={post.featured_image}
				ratio={75}
				sizes="(max-width: 768px) 100vw, (max-width: 1388px) 60vw, 870px"
				srcset={[400, 800, 1600]}
			/>
		</Tag>
	);
}

Featured.defaultProps = {
	className: '',
	hasAuthor: true,
	tag: 'article',
}

export default Featured;