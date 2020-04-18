import styles from './PostImage.module.scss';
import React from 'react';

const PostImage = ({ className, image, ratio }) => {
	const image_url = image ? `http://localhost:1337/uploads/${image.file}` : '';
	return (
		<div className={`${styles.image} ${className}`} style={{ paddingTop: `${ratio}%` }}>
			<img src={image_url} />
		</div>
	);
}

PostImage.defaultProps = {
	className: null,
	ratio: 66,
};

export default PostImage;