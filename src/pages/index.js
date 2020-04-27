import styles from './Index.module.scss';
import fetch from 'node-fetch'
import React from 'react';
import Link from 'next/link';
import Featured from '../components/Featured/Featured';
import Tile from '../components/Tile/Tile';

const Index = ({ featured, posts }) => (
	<main className={styles.page}>
		<Link as={`/${featured.category}/${featured.slug}`} href="/[category]/[slug]">
			<a className={styles.featuredLink}>
				<Featured className={styles.featured} hasAuthor={false} post={featured} />
			</a>
		</Link>
		<div className={styles.posts}>
			{posts.map(post => <Tile key={post.id} post={post}></Tile>)}
		</div>
	</main>
);

export async function getStaticProps() {
	const res = await fetch(`${process.env.API_URL}/posts/index`);
	const { featured, latest, random } = await res.json();

	return {
		props: {
			featured: featured[0],
			posts: [...latest, ...random],
		},
	}
}

export default Index;