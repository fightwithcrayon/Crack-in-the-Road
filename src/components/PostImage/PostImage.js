import styles from './PostImage.module.scss';
import React, { useEffect, useRef, useState } from 'react';

const PostImage = ({ alt, className, image, isLazy, sizes, srcset }) => {
	const [isInViewport, setIsInViewport] = useState(false);
	const imageRef = useRef();
	const image_url = image ? `https://api.crackintheroad.com/images/${image}` : '';

	useEffect(() => {
		if ('loading' in new Image()) {
			setIsInViewport(true);
		}

		if (isInViewport) {
			return undefined;
		}

		const supportsObserver = ('IntersectionObserver' in window) ||
			('IntersectionObserverEntry' in window) ||
			('intersectionRatio' in window.IntersectionObserverEntry.prototype);

		let ref = imageRef.current;
		if (!supportsObserver) {
			return undefined;
		}

		const handleIntersect = ([entry, ...rest]) => {
			if (entry.isIntersecting) {
				setIsInViewport(true);
			}
		}
		const observer = new IntersectionObserver(handleIntersect);
		observer.observe(ref);
		return () => {
			observer.disconnect();
		}
	}, [image_url, isInViewport]);

	if (!image_url) {
		return null;
	}

	return (
		<div className={`${styles.image} ${isInViewport ? '' : styles.pending} ${className}`} ref={imageRef}>
			{isInViewport && (
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

			)}
		</div>
	);
}

PostImage.defaultProps = {
	className: '',
	isLazy: true,
	ratio: 66,
};

export default PostImage;