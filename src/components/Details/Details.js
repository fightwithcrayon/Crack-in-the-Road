import styles from './Details.module.scss';
import React from 'react';
import { format, parseISO } from 'date-fns';

const formatTitle = title => {
	const hyphenSplit = title.split(' – ');
	if (hyphenSplit.length === 2) {
		const [artist, track] = hyphenSplit;
		return { artist, track };
	}
	return title;
};

const Details = ({ className, hasAuthor, heading, post }) => {
	const HTag = heading;
	const date = format(parseISO(post.date), 'do MMM yyy');
	const { artist, track, title } = formatTitle(post.title);
	return (
		<div className={`${styles.frame} ${className}`}>
			<HTag className={styles.title}>
				{!artist && !track && post.title}
				{artist && <span className={styles.artist}>{artist}</span>}
				{track && <span className={styles.track}>{track}</span>}
			</HTag>
			{hasAuthor && post.author && (
				<div className={styles.details}>
					<p>{date}</p>
					<p>{post.author.name}</p>
				</div>
			)}
		</div>
	);
}

Details.defaultProps = {
	className: null,
	hasAuthor: true,
	heading: 'h4',
};

export default Details;