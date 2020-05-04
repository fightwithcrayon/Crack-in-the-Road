import styles from './Details.module.scss';
import React from 'react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

const formatTitle = title => {
	const hyphenSplit = title.split(' – ');
	if (hyphenSplit.length === 2) {
		const [artist, track] = hyphenSplit;
		const cleanArtist = artist
			.replace(/^(New: )/i, '')
			.replace(/^(Single of the Week: )/i, '')
			.replace(/^(Review: )/i, '')
			.replace(/^(Stream: )/i, '')
			.replace(/^(Video: )/i, '')
			.replace(/^(News: )/i, '')
			.replace(/^(MPFree: )/i, '');
		return { artist: cleanArtist, track };
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
					<p>
						<Link as={`/author/${post.author.slug}`} href="/author/[slug]">
							<a >{post.author.name}</a>
						</Link>
					</p>
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