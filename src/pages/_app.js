import '../global.scss';
import styles from './App.module.scss';
import React, { useEffect } from "react";
import Header from '../components/Header/Header';

const App = ({ Component, pageProps }) => {
	useEffect(() => {
		const testWebP = async () => {
			const test = () => new Promise(res => {
				const webP = new Image();
				webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
				webP.onload = webP.onerror = () => {
					res(webP.height === 2);
				};
			});
			const isSupported = await test();
			console.log(isSupported)
			window.isWebPSupported = isSupported;
		};
		testWebP()
	}, []);
	useEffect(() => {
		const { href, pathname } = window.location;
		fetch(`${process.env.API_URL}/posts/note?href=${href}&path=${pathname}&title=${document.title}`);
	}, [pageProps]);

	return (
		<div className={styles.wrapper}>
			<Header />
			<Component {...pageProps} />
		</div>
	)
};

export default App;
