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
			<div className={styles.details}>
				<p>{date}</p>
				<span className={styles.line} />
				<p>{hasAuthor ? post.author.name : post.category}</p>
			</div>
			<HTag className={styles.title}>
				{!artist && !track && post.title}
				{artist && <span className={styles.artist}>{artist}</span>}
				{track && <span className={styles.track}>{track}</span>}
			</HTag>
		</div>
	);
}

Details.defaultProps = {
	className: null,
	hasAuthor: true,
	heading: 'h4',
};

export default Details;