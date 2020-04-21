import styles from './Header.module.scss';
import Head from 'next/Head';
import React from 'react';
import Link from 'next/link';

const Header = () => {
	const title = 'Crack in the Road';
	const description = 'Crack in the Road';
	return (
		<header className={styles.header}>
			<Head>
				<meta charset="utf-8" />
				<title key="title">{title}</title>
				<meta key="description" name="description" content="Big last decade." />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta property="og:type" content="website" />
				<meta name="og:title" property="og:title" content={title} />
				<meta name="og:description" property="og:description" content={description} />
				<meta property="og:site_name" content={title} />
				<meta property="og:url" content={`https://www.crackintheroad.com`} />
				<meta property="og:image" content="/logo.jpg" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:site" content="@crackintheroad" />
				<meta name="twitter:image" content="/logo.jpg" />
				<link rel="icon" type="image/png" href="/logo.jpg" />
				<link rel="apple-touch-icon" href="/static/images/favicon.ico" />
			</Head>
			<Link as="/" href="/">
				<a>
					<h1 className={styles.title}>Crack in the Road</h1>
				</a>
			</Link>
		</header>
	);
}

export default Header;