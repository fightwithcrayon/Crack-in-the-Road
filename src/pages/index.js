import styles from './Index.module.scss';
import fetch from 'node-fetch'
import React from 'react';
import Archive from '../components/Archive/Archive';

const Index = ({ categories, featured, posts, years }) => (
	<Archive posts={posts}>
		Top
	</Archive>
);

export async function getStaticProps() {
	const res = await fetch(`${process.env.API_URL}/posts/index`);
	const { featured, latest, random } = await res.json();

	const res2 = await fetch(`${process.env.API_URL}/posts/timeline`)
	const dates = await res2.json();

	const years = Object.keys(dates.reduce((all, current) => ({
		...all,
		[current._id.year]: null,
	}), {}));

	return {
		props: {
			featured: featured[0],
			posts: [...latest, ...random],
			years,
		},
	}
}

export default Index;