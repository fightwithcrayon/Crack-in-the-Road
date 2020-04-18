import styles from './Header.module.scss';
import React from 'react';
import Link from 'next/link';

const Header = () => {
	return (
		<header className={styles.header}>
			<Link as="/" href="/">
				<a>
					<h1 className={styles.title}>Crack in the Road</h1>
				</a>
			</Link>
		</header>
	);
}

export default Header;