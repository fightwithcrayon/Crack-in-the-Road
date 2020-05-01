import styles from './Index.module.scss';
import fetch from 'node-fetch'
import React from 'react';
import Archive from '../components/Archive/Archive';

const Index = ({ posts }) => (
	<Archive posts={posts} />
);

export async function getStaticProps() {
	const res = await fetch(`${process.env.API_URL}/posts/index`);
	const posts = await res.json();

	return {
		props: {
			posts,
		},
	}
}

export default Index;