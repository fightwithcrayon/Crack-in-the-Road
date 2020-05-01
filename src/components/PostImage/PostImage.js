import styles from './PostImage.module.scss';
import React from 'react';

const PostImage = ({ alt, className, image, isLazy, sizes, srcset }) => {
	const image_url = image ? `https://api.crackintheroad.com/images/${image}` : '';

	if (!image_url) {
		return null;
	}

	return (
		<div className={`${styles.image} ${className}`}>
			<picture>
				<source
					sizes={sizes}
					srcSet={srcset.map(size =>
						image_url + `?width=${size}&type=webp ${size}w`
					).join(', ')}
					type="image/webp"
				/>
				<img
					alt={alt}
					loading={isLazy ? 'lazy' : ''}
					sizes={sizes}
					srcSet={srcset.map(size =>
						image_url + `?width=${size} ${size}w`
					).join(', ')}
					src={image_url}
				/>
			</picture>
		</div>
	);
}

PostImage.defaultProps = {
	className: null,
	isLazy: true,
	ratio: 66,
};

export default PostImage;