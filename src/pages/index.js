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
				<Featured className={styles.featured} hasAuthor={false} post={featured} />
			</a>
		</Link>
		<div className={styles.posts}>
			{posts.map(post => (
				<Link as={`/${post.category}/${post.slug}`} href="/[category]/[slug]" key={post.id}>
					<a>
						<article className={styles.post}>
							<PostImage
								alt={post.title}
								className={styles.image}
								image={post.featured_image}
								ratio={75}
								sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, (max-width: 1300px) 33vw, 400px"
								srcset={[320, 412, 824]}
							/>
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
	const { featured, latest, random } = await res.json();

	return {
		props: {
			featured: featured[0],
			posts: [...latest, ...random],
		},
	}
}

export default Index;