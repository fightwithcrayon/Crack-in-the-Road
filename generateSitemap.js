const { create } = require('xmlbuilder2');
const fs = require('fs');
const globby = require('globby');
const { format } = require('date-fns');
const baseUrl = 'https://www.crackintheroad.com';
const targetDirectory = process.cwd() + '/out/';
const date = Date.now();

const today = format(date, 'yyyy-MM-dd')

const getFilePaths = async () => {
	const listAllFilesAndDirs = (cwd) => globby('.', {
		cwd,
		expandDirectories: {
			extensions: ['html']
		},
		onlyFiles: false,
		ignore: ['_next']
	});
	return await listAllFilesAndDirs(targetDirectory);
}

const produceXML = async () => {
	const paths = await getFilePaths()
	const urls = paths.map((path) => {
		const cruft = path.endsWith('index.html') ? -10 : -5;
		return {
			loc: baseUrl + '/' + path.slice(0, cruft),
			lastmod: today,
		};
	});

	const obj = {
		root: {
			version: '1.0', encoding: 'UTF-8',
			urlset: {
				'xsi:schemaLocation': "http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
				'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
				'xmlns': "http://www.sitemaps.org/schemas/sitemap/0.9",
				'xmlns:xhtml': "http://www.w3.org/1999/xhtml",
				url: urls,
			},
		}
	};

	const doc = create(obj);
	const xml = doc.end({ prettyPrint: true });
	fs.writeFileSync(targetDirectory + '/sitemap.xml', xml);
}

produceXML();