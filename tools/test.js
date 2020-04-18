const fs = require('fs');
const path = require('path');

const file = '2012/03/jai-paul-.jpg';
const [year, month, filenameWithExt] = file.split('/');
const filename = path.parse(filenameWithExt).name;
console.log(filename);
var files = fs
	.readdirSync(__dirname + `/../api/api/posts/controllers/output/wp-content/uploads/${year}/${month}`)
	.filter(fn => fn.startsWith(filename))
	.map(f => {
		const [width, height] = path.parse(f).name.replace(filename + '-', '').split('x');
		return {
			file: f,
			width: parseInt(width),
			height: parseInt(height)
		}
	})
	.sort((a, b) => b.width - a.width)
console.log(files);