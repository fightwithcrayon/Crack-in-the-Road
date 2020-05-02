const success = require('./success-copy.json');
const fetch = require('node-fetch');
const fs = require('fs');
const https = require('https');
const path = require('path');
const glob = require("glob")

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const process = async () => {
	const final = [];
	for await (post of success) {
		if (post.file[0] === null) {
			continue;
		}
		if (typeof post.file === 'string' || post.file[0][0] !== 'h') {
			final.push(post);
			continue;
		}

		const { ext, name } = path.parse(post.file[0]);
		const filename = name + (ext || '.jpg')
		if (fs.existsSync('./generated/' + filename)) {
			final.push({
				...post,
				file: 'generated/' + filename,
			});
			continue;
		}
		var file = fs.createWriteStream('./generated/' + filename);
		console.log(filename);
		https.get(post.file[0], function (response) {
			response.pipe(file);
		});
		final.push({
			...post,
			file: 'generated/' + filename,
		});
		await sleep(500);
	}
	fs.writeFileSync('./final.json', JSON.stringify(final))
};

process();