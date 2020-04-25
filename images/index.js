const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')
const potrace = require('potrace');
const sharp = require('sharp');


module.exports = app;

app.use(express.static('client'));

app.get('/images/:year/:month/:file', async (req, res) => {
	const { year, month, file } = req.params;
	const { trace, type, width } = req.query;
	const originalFile = path.join(__dirname, 'uploads', year, month, file);

	if (Object.values(req.query).length === 0) {
		res.sendFile(originalFile);
		return;
	}

	const { name, ext } = path.parse(file);
	let decoratedName = name;

	if (width) {
		decoratedName += `_${width}`;
	}

	if (trace) {
		decoratedName += `_trace.svg`;
	}

	if (type) {
		decoratedName += `.${type}`
	} else if (!trace) {
		decoratedName += ext;
	}

	const targetFolder = path.join(__dirname, 'assets', year, month);
	const editedFile = path.join(targetFolder, decoratedName);

	if (fs.existsSync(editedFile)) {
		res.set('Cache-control', 'public, max-age=31536000')
		res.sendFile(editedFile);
		return;
	};

	if (!fs.existsSync(originalFile)) {
		res.send(404);
		return;
	};

	try {
		const sharpImg = sharp(originalFile)

		if (width) {
			sharpImg.resize(parseInt(width))
		}

		const { ext: extension } = path.parse(editedFile);

		if (extension === 'webp') {
			sharpImg.webp();
		}

		if (extension === 'png') {
			sharpImg.png({
				progressive: true,
				adaptiveFiltering: true,
			});
		}

		if (extension === 'jpg' || extension === 'jpeg') {
			sharpImg.jpg({
				progressive: true,
			});
		}

		fs.mkdirSync(targetFolder, { recursive: true });
		await sharpImg.toFile(editedFile);
		console.log('here');
		if (trace) {
			const params = {
				turdSize: 200,
				optTolerance: 0.8,
				color: '#f5f5f5',
				background: '#fff',
			}

			const traceFile = () => new Promise((resolve) => {
				potrace.trace(editedFile, params, function (err, svg) {
					if (err) throw err;
					fs.mkdirSync(targetFolder, { recursive: true });
					fs.writeFileSync(editedFile, svg);
					console.log('now resolve')
					console.log('everywhere')
					resolve(editedFile);
				});
			})
			await traceFile();
		}
		console.log('there')
		res.set('Cache-control', 'public, max-age=31536000')
		res.sendFile(editedFile);
		return;
	} catch (error) {
		console.log('Error processing', originalFile, '-->', editedFile)
		console.log(error)
		res.sendFile(originalFile);
		return;
	}

});

const port = process.env.PORT || 4040;
app.listen(port, () => console.log('Imge server listening on port', port))