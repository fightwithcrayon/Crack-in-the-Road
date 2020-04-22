import styles from './PostImage.module.scss';
import React from 'react';

const PostImage = ({ className, image, ratio, sizes, srcset }) => {
	const image_url = image ? `https://api.crackintheroad.com/uploads/${image.file}` : '';
	return (
		<div className={`${styles.image} ${className}`} style={{ paddingTop: `${ratio}%` }}>
			{
				image_url !== '' && (
					<img sizes={sizes} srcset={srcset.map(size =>
						image_url + `?nf_resize=smartcrop&w=${size}&h=${(size / 100) * ratio} ${size}px`
					).join(', ')} src={image_url} />
				)
			}
		</div>
	);
}

PostImage.defaultProps = {
	className: null,
	ratio: 66,
};

export default PostImage;