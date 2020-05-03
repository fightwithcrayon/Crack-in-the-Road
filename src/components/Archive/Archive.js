import styles from './Archive.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import Tile from '../Tile/Tile';

const Archive = ({ children, pageUrl, posts }) => {
	const [completed, setCompleted] = useState(false);
	const [page, setPage] = useState(1);
	const isLoading = useRef(false);
	const [visiblePosts, setVisiblePosts] = useState(posts);
	const pageRef = useRef();

	useEffect(() => {
		if (!pageUrl || completed) {
			return undefined;
		}
		let ref = pageRef.current;

		const supportsObserver = ('IntersectionObserver' in window) ||
			('IntersectionObserverEntry' in window) ||
			('intersectionRatio' in window.IntersectionObserverEntry.prototype);

		if (!supportsObserver) {
			return undefined;
		}

		const handleIntersect = async ([entry]) => {
			if (entry.isIntersecting && !isLoading.current) {
				isLoading.current = true;
				const nextPage = page + 1;
				const res = await fetch(`${pageUrl}?page=${nextPage}`);
				const posts = await res.json();
				if (posts[0] && !visiblePosts.some(p => p.id === posts[0].id)) {
					setVisiblePosts([...visiblePosts, ...posts]);
					setPage(nextPage)
				} else {
					setCompleted(true);
				}
				isLoading.current = false;
			}
		}
		const observer = new IntersectionObserver(handleIntersect, {
			rootMargin: '50%',
		});
		observer.observe(ref);
		return () => {
			observer.disconnect();
		}
	}, [completed, page, visiblePosts]);

	return (
		<main className={styles.page}>
			{children}
			<div className={styles.posts}>
				{visiblePosts.map(post => <Tile key={post.id} post={post}></Tile>)}
				{!completed && pageUrl && <button className={styles.next} ref={pageRef}>Previous</button>}
			</div>
		</main>
	);
};

export default Archive;