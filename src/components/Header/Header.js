import styles from './Header.module.scss';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Menu from '../Menu/Menu';

const Header = ({ className, isInverted, onClose, page }) => {
	const [isOpen, setIsOpen] = useState(false);
	const title = 'Crack in the Road';
	const description = 'New music and visual arts. Once was the future. Once.';

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}
		document.documentElement.classList.add('no-scroll');
		return () => document.documentElement.classList.remove('no-scroll');
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [page]);

	const toggleDarkMode = () => {
		document.body.classList.toggle('force-light')
	}

	return (
		<>
			<header className={`${className} ${styles.header} ${isInverted ? styles.invert : ''}`}>
				<Head>
					<meta charset="utf-8" />
					<title key="title">{title}</title>
					<meta key="description" name="description" content={description} />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta name="robots" content="index, follow" />
					<meta key="ogtype" property="og:type" content="website" />
					<meta key="ogtitle" name="og:title" property="og:title" content={title} />
					<meta key="ogdescription" name="og:description" property="og:description" content={description} />
					<meta key="ogsite_name" property="og:site_name" content={title} />
					<meta key="ogurl" property="og:url" content={`https://www.crackintheroad.com`} />
					<meta key="ogimage" property="og:image" content="/logo.jpg" />
					<meta key="ogimagetype" property="og:image:type" content="image/jpeg" />
					<meta key="ogimagewidth" property="og:image:width" content="1200" />
					<meta key="ogimageheight" property="og:image:height" content="630" />
					<meta key="ogimagealt" property="og:image:alt" content="Crack in the Road logo" />
					<meta key="twittercard" name="twitter:card" content="summary" />
					<meta key="twittertitle" name="twitter:title" content={title} />
					<meta key="twitterdescription" name="twitter:description" content={description} />
					<meta key="twittersite" name="twitter:site" content="@crackintheroad" />
					<link rel="icon" type="image/png" href="/logo.jpg" />
					<link rel="preload" href="/fonts/jost-500-medium-citr.woff2" as="font" type="font/woff2" crossorigin />
					<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon-48x48.png" />
					<link rel="manifest" href="/favicons/manifest.json" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="theme-color" content="#fff" />
					<meta name="application-name" content="Crack in the Road" />
					<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="167x167" href="/favicons/apple-touch-icon-167x167.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-title" content="Crack in the Road" />
					<link rel="icon" type="image/png" sizes="228x228" href="/favicons/coast-228x228.png" />
					<meta name="msapplication-TileColor" content="#fff" />
					<meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
					<meta name="msapplication-config" content="/favicons/browserconfig.xml" />
					<link rel="yandex-tableau-widget" href="/favicons/yandex-browser-manifest.json" />
				</Head>
				<Link as="/" href="/">
					<a>
						<h1 className={styles.title}>Crack in the Road</h1>
					</a>
				</Link>
				<span className={styles.darkmode} onClick={toggleDarkMode} />
				{isInverted ? (
					<button className={styles.button} onClick={onClose}>Close</button>
				) : (
						<button className={styles.button} onClick={() => setIsOpen(true)}>Explore</button>
					)}
			</header>
			{!isInverted && <Menu isOpen={isOpen} onClose={() => setIsOpen(false)} />}
		</>
	);
}

Header.defaultProps = {
	isInverted: false,
	onClose: null,
};

export default Header;