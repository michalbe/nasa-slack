const Request = require('request-promise-native');
const Cheerio = require('cheerio');
const apiToken = process.argv[2];
const Mattermost = require('node-mattermost');

const mattermost = new Mattermost(
	`https://mattermost.jelocartel.com/hooks/${apiToken}`,
	{}
);

const date = new Date();
const year = (date.getYear() - 100).toString();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');

Request.get('https://apod.nasa.gov/apod/astropix.html').then((result) => {
	try {
		const $ = Cheerio.load(result);
		const url = 'https://apod.nasa.gov/apod/' + $('img').eq(0).attr('src');
		const title = $('center > b').eq(0).text().trim();
		const explanation = $('p')
			.eq(2)
			.text()
            .replace('Explanation: ', '').trim();
		mattermost
			.send({
				text: `[${title}](https://apod.nasa.gov/apod/ap${year + month + day}.html)
---
${explanation}

![${url}](${url})
`,
				channel: '#t2'
			})
			.then((e) => {
				console.log(e);
			})
			.catch((e) => {
				console.log(e);
			});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
});
