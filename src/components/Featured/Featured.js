import styles from './Featured.module.scss';
import React from 'react';
import Details from '../Details/Details';
import PostImage from '../PostImage/PostImage';

const Featured = ({ className, post, tag: Tag }) => {
	return (
		<Tag className={`${styles.featured} ${className}`}>
			<Details className={styles.details} hasAuthor heading="h2" post={post} />
			<PostImage className={styles.image} image={post.featured_image} ratio={75} />
		</Tag>
	);
}

Featured.defaultProps = {
	className: '',
	tag: 'article',
}

export default Featured;