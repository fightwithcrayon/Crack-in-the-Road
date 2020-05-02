const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')
const sharp = require('sharp');

module.exports = app;

app.use(express.static('client'));

async function processImage(req, res) {
	const { year, month, file } = req.params;
	const { type, height, width } = req.query;
	const directory = year ? `${year}/${month}` : 'generated';
	const originalFile = path.join(__dirname, 'uploads', directory, file);
	if (!width) {
		res.sendFile(originalFile);
		return;
	}

	const { name, ext } = path.parse(file);
	const extension = type ? `.${type}` : ext;
	const size = width ? `_${width}` : '';
	const size2 = height ? `_${height}` : '';

	const targetFolder = path.join(__dirname, 'assets', directory);
	const editedFile = path.join(targetFolder, `${name}${size}${size2}${extension}`);

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

		if (width && height) {
			sharpImg.resize(parseInt(width), parseInt(height))
		} else if (width) {
			sharpImg.resize(parseInt(width))
		}

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
		res.set('Cache-control', 'public, max-age=31536000')
		res.sendFile(editedFile);
		return;
	} catch (error) {
		console.log('Error processing', originalFile, '-->', editedFile)
		console.log(error)
		res.sendFile(originalFile);
		return;
	}

};

app.get('/images/generated/:file', processImage);
app.get('/images/:year/:month/:file', processImage);

const port = process.env.PORT || 4040;
app.listen(port, () => console.log('Imge server listening on port', port))