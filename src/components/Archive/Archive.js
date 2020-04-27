import styles from './Archive.module.scss';
import React from 'react';
import Tile from '../Tile/Tile';

const Archive = ({ posts }) => (
	<main className={styles.page}>
		<div className={styles.posts}>
			{posts.map(post => <Tile key={post.id} post={post}></Tile>)}
		</div>
	</main>
);

export default Archive;