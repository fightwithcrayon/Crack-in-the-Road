// Archive file created via Wayback Machine CDX server API
// Thanks guys!
const fetch = require('node-fetch');
const archive = require('./citr-archive-2.json');
const fs = require('fs');
const https = require('https');
const path = require('path');

const action = async () => {
	const total = archive.length;
	let progress = 0;
	console.log('Beginning process', Date.now());
	const process = async (urlkey, timestamp) => {
		return new Promise((resolve, reject) => {
			const [domain, ...rest] = urlkey.split(')');
			const filePath = rest.join('');
			const url = `https://web.archive.org/web/${timestamp}if_/crackintheroad.com${filePath}`;
			const outputDir = __dirname + '/output' + path.dirname(filePath);
			const outputFile = __dirname + '/output' + filePath
			if (fs.existsSync(outputFile)) {
				console.log(outputFile, 'already exists')
				progress += 1;
				console.log(`${progress} / ${total}`)
				resolve();
				return;
			}
			try {
				fs.mkdir(outputDir, { recursive: true }, () => {
					var req = https.get(url, function (response) {
						var file = fs.createWriteStream(outputFile);
						response.pipe(file);
						progress += 1;
						console.log(`${progress} / ${total}`)
						resolve();
					});
					req.on('error', function (e) {
						process(urlkey, timestamp).then(result => resolve(result))
					});
				})
			} catch (error) {
				console.log('Failure:', url);
				return;
			}
		})
	}
	for await (snapshot of archive) {
		// Don't process headers
		const [urlkey, timestamp, ...rest] = snapshot;
		await process(urlkey, timestamp);
	}
	console.log('Finished process', Date.now());
}

action();