import styles from './Index.module.scss';
import fetch from 'node-fetch'
import PostImage from '../components/PostImage/PostImage';
import React from 'react';
import Link from 'next/link';
import Details from '../components/Details/Details';
import Featured from '../components/Featured/Featured';

const Index = ({ featured, posts }) => (
	<main className={styles.page}>
		<Link as={`/${featured.category}/${featured.slug}`} href="/[category]/[slug]">
			<a className={styles.featuredLink}>
				<Featured className={styles.featured} post={featured} />
			</a>
		</Link>
		<div className={styles.posts}>
			{posts.map(post => (
				<Link as={`/${post.category}/${post.slug}`} href="/[category]/[slug]" key={post.id}>
					<a>
						<article className={styles.post}>
							<PostImage className={styles.image} image={post.featured_image} ratio={75} />
							<Details post={post} />
						</article>
					</a>
				</Link>
			))}
		</div>
	</main>
);

export async function getStaticProps() {
	const res = await fetch('https://api.crackintheroad.com/posts/index');
	const res2 = await fetch('https://api.crackintheroad.com/posts/timeline')
	const { featured, latest, random } = await res.json();
	const timeline = await res2.json();

	// By returning { props: posts }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			featured: featured[0],
			posts: [...latest, ...random],
			timeline
		},
	}
}

export default Index;