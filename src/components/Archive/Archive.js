import styles from './Archive.module.scss';
import React from 'react';
import Tile from '../Tile/Tile';

const Archive = ({ children, posts }) => (
	<main className={styles.page}>
		{children}
		<div className={styles.posts}>
			{posts.map(post => <Tile key={post.id} post={post}></Tile>)}
		</div>
	</main>
);

export default Archive;