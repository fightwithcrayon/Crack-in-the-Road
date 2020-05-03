import styles from './PostImage.module.scss';
import { LazyImage } from "react-lazy-images";
import React, { useRef } from 'react';

const imageAsBase64 = url => {
	if (typeof window === 'undefined') {
		const fs = require('fs');
		try {
			const bitmap = fs.readFileSync(`public${url}`);
			return 'data:image/jpeg;base64, ' + bitmap.toString('base64');
		} catch (error) {
			return '';
		}
	} else {
		return url;
	}
};

const PostImage = ({ alt, className, image, isLazy, sizes, srcset }) => {
	const imageRef = useRef();
	const image_url = `https://api.crackintheroad.com/images/${image}`;
	const thumbnail_url = imageAsBase64(`/thumbnails/${image}`);
	const format = (typeof window === 'undefined' || window.isWebPSupported !== true) ? '' : 'type=webp'

	if (!image_url) {
		return null;
	}

	return (
		<div className={`${styles.image} ${className}`} ref={imageRef}>
			{
				<LazyImage
					alt={alt}
					experimentalDecode
					sizes={sizes}
					srcSet={srcset.map(size =>
						image_url + `?width=${size}${format} ${size}w`
					).join(', ')}
					src={image_url}
					placeholder={({ ref }) => (
						<img alt={alt} ref={ref} className={styles.placeholder} src={thumbnail_url} />
					)}
					actual={({ imageProps }) => (
						<img {...imageProps} />
					)}
				/>
			}
		</div>
	);
}

PostImage.defaultProps = {
	className: '',
	isLazy: true,
	ratio: 66,
};

export default PostImage;