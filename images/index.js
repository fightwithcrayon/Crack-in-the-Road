const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')
const sharp = require('sharp');

module.exports = app;

app.use(express.static('client'));

app.get('/images/:year/:month/:file', async (req, res) => {
	const { year, month, file } = req.params;
	const { type, width } = req.query;
	const originalFile = path.join(__dirname, 'uploads', year, month, file);

	if (!width) {
		res.sendFile(originalFile);
		return;
	}

	const { name, ext } = path.parse(file);
	const extension = type ? `.${type}` : ext;
	const size = width ? `_${width}` : '';

	const targetFolder = path.join(__dirname, 'assets', year, month);
	const editedFile = path.join(targetFolder, `${name}${size}${extension}`);

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

});

const port = process.env.PORT || 4040;
app.listen(port, () => console.log('Imge server listening on port', port))