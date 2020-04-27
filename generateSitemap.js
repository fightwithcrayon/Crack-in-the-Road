const sitemap = require('nextjs-sitemap-generator');

sitemap({
	baseUrl: 'https://www.crackintheroad.com',
	ignoreIndexFiles: true,
	pagesDirectory: 'out/',
	targetDirectory: 'out/',
});
