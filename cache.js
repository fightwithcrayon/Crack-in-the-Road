/* code from ./install-from-cache-example.js */
const path = require('path')
const cacheMeOutside = require('cache-me-outside')

/* cache destination folder */
let cacheFolder = path.join('/opt/build/cache', 'next')

/* Array of folders to cache */
const contentsToCache = [
	{
		contents: path.join(__dirname, '.next/cache'),
		handleCacheUpdate: 'npm install',
		shouldCacheUpdate: async (cacheManifest, utils) => {
			return true;
		},
	},
]

cacheMeOutside(cacheFolder, contentsToCache).then((cacheInfo) => {
	console.log('Success! You are ready to rock')
	cacheInfo.forEach((info) => {
		console.log(info.cacheDir)
	})
})