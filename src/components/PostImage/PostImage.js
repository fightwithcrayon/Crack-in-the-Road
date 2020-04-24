import styles from './PostImage.module.scss';
import React from 'react';

const PostImage = ({ className, image, ratio, sizes, srcset }) => {
	const image_url = image ? `https://api.crackintheroad.com/images/${image.file}` : '';

	if (!image_url) {
		return null;
	}

	return (
		<div className={`${styles.image} ${className}`} style={{ paddingTop: `${ratio}%` }}>
			<picture>
				<source
					sizes={sizes}
					srcset={srcset.map(size =>
						image_url + `?width=${size} ${size}px`
					).join(', ')}
					type="image/webp"
				/>
				<img
					loading="lazy"
					sizes={sizes}
					srcset={srcset.map(size =>
						image_url + `?width=${size} ${size}px`
					).join(', ')}
					src={image_url}
				/>
			</picture>
		</div>
	);
}

PostImage.defaultProps = {
	className: null,
	ratio: 66,
};

export default PostImage;