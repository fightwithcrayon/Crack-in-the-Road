import '../global.scss';
import styles from './App.module.scss';
import React, { useEffect, useState } from "react";
import Header from '../components/Header/Header';

const App = ({ Component, pageProps }) => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<Component {...pageProps} />
		</div>
	)
};

export default App;
