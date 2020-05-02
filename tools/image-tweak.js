const archive = require('./roundtwo.json');
const roundone = require('./success.json');
const fetch = require('node-fetch');
const fs = require('fs');
const https = require('https');
const path = require('path');
const glob = require("glob")

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const process = async () => {
	let total = 0;
	const success = roundone;
	const failure = [];
	for await (post of archive) {
		const { artist, featured_image_meta, wpid } = post;
		if (fs.existsSync(`./output/wp-content/uploads/${post.featured_image_meta.file.toLowerCase()}`)) {
			success.push({
				wpid,
				file: post.featured_image_meta.file.toLowerCase()
			})
			continue;
		}
		const [year, month, filenameWithExt] = post.featured_image_meta.file.split('/');

		const { ext, name } = path.parse(filenameWithExt.toLowerCase());
		const files = glob.sync(`./output/wp-content/uploads/${year}/${month}/${name}*${ext}`);
		if (files.length > 0) {
			success.push({
				wpid,
				file: files
			})
			continue;
		}
		if (artist) {
			await sleep(1000);
			const query = encodeURI(artist.replace(/-/g, ' '));

			const d = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`, {
				headers: {
					Authorization: 'Bearer BQCqnsjGJQJIOaVRrDrlCqOs_9WGqYS2yYiZxmLINlGow3kinNRXe5Qalu-yrOHz-cRUHTHWO5MebrFexj0'
				}
			})
			const search = await d.json();
			if (search.artists && search.artists.items && search.artists.items[0]) {
				const { href } = search.artists.items[0];
				const a = await fetch(href, {
					headers: {
						Authorization: 'Bearer BQCqnsjGJQJIOaVRrDrlCqOs_9WGqYS2yYiZxmLINlGow3kinNRXe5Qalu-yrOHz-cRUHTHWO5MebrFexj0'
					}
				})
				const spArtist = await a.json();
				if (spArtist && spArtist.images && spArtist.images[0]) {
					success.push({
						wpid,
						file: spArtist.images.map(img => img.url),
					})
					console.log('Spotify for ', artist)
					continue;
				}
			}

			let json;
			const lookup = await fetch(`https://musicbrainz.org/ws/2/artist?query=name:${query}&limit=1&fmt=json`);
			json = await lookup.json();
			if (json.error) {
				console.log('Rate limiting', artist);
				await sleep(3000);
				const lookupTwo = await fetch(`https://musicbrainz.org/ws/2/artist?query=name:${query}&limit=1&fmt=json`);
				json = await lookupTwo.json();
			}
			if (json.artists && json.artists[0] && json.artists[0].id) {
				const fanart = await fetch(`https://webservice.fanart.tv/v3/music/${json.artists[0].id}&?api_key=06f56465de874e4c75a2e9f0cc284fa3&format=json`);
				let response = null;
				try {
					response = await fanart.json();
				} catch (error) {
					console.log(error);
				}
				if (response && response.name) {
					const { artistbackground, artistthumb, albums, musiclogo } = response;
					let images = artistbackground || artistthumb || albums || musiclogo || null;
					if (images) {
						const file = images.length ? images : Object.keys(images)
						success.push({
							wpid,
							file: file.map(img => {
								if (img.url) {
									return img.url
								}
								if (img.albumcover) {
									return img.albumcover[0].url
								}
							}),
						})
						console.log('Fanart for ', artist)
						continue;
					}

				}
			}
		}
		console.log('Failed for', artist)
		failure.push(post)
	}
	fs.writeFileSync('./success.json', JSON.stringify(success))
	fs.writeFileSync('./failure.json', JSON.stringify(failure))
	console.log(archive.length, failure.length, 'failed. ', success.length, 'success.')
};

process();