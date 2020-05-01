import styles from './Header.module.scss';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Menu from '../Menu/Menu';

const Header = ({ className, isInverted, onClose }) => {
	const [isOpen, setIsOpen] = useState(false);
	const title = 'Crack in the Road';
	const description = 'Crack in the Road';

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}
		document.documentElement.classList.add('no-scroll');
		return () => document.documentElement.classList.remove('no-scroll');
	}, [isOpen]);

	return (
		<>
			<header className={`${className} ${styles.header} ${isInverted ? styles.invert : ''}`}>
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
					<link rel="preload" href="/fonts/jost-500-medium-webfont.woff2" as="font" />
					<link rel="preload" href="/fonts/jost-300-light-webfont.woff2" as="font" />
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
					<link rel="apple-touch-icon" sizes="1024x1024" href="/favicons/apple-touch-icon-1024x1024.png" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-title" content="Crack in the Road" />
					<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-640x1136.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-750x1334.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-828x1792.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-1125x2436.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-1242x2208.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-1242x2688.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-1536x2048.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-1668x2224.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-1668x2388.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-2048x2732.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/favicons/apple-touch-startup-image-1620x2160.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-1136x640.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-1334x750.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-1792x828.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2436x1125.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2208x1242.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2688x1242.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2048x1536.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2224x1668.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2388x1668.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2732x2048.png" />
					<link rel="apple-touch-startup-image" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href="/favicons/apple-touch-startup-image-2160x1620.png" />
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
				{isInverted ? (
					<button className={styles.button} onClick={onClose}>Close</button>
				) : (
						<button className={styles.button} onClick={() => setIsOpen(true)}>Explore</button>
					)}
			</header>
			{!isInverted && isOpen && <Menu onClose={() => setIsOpen(false)} />}
		</>
	);
}

Header.defaultProps = {
	isInverted: false,
	onClose: null,
};

export default Header;