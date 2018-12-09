const Slack = require('slack-node');
const Request = require('request-promise-native');
const Cheerio = require('cheerio');
const apiToken = process.argv[2];

slack = new Slack(apiToken);

Request.get('https://apod.nasa.gov/apod/astropix.html')
.then((result) => {

    try {
        // result = JSON.parse(result);
        const $ = Cheerio.load(result);
        // console.log(result);

        const url = 'https://apod.nasa.gov/apod/' + $('img').eq(0).attr('src');
        console.log(url);
        const title = $('center > b').eq(0).text().trim();
        const explanation = $('p').eq(2).text().replace(/\r?\n|\r/g, ' ');
        console.log(explanation);
        slack.api('chat.postMessage', {
            text: '',
            attachments: JSON.stringify([
                {
                    "fallback": "Photo of the day",
                    "color": "#2eb886",
                    "author_name": "Oak & NASA",
                    "pretext": "Oak & Nasa Photo of the day",
                    "title": title,
                    "title_link": url,
                    "text": explanation,
                    "image_url": url,
                    "thumb_url": url,
                    "footer": "by Osiedlowa Agencja Kosmiczna",
                    "footer_icon": ":rocket:",
                    "ts": 123456789
                }
            ]),
            username: 'OAK & Nasa photo of the day',
            icon_emoji: ":rocket:",
            channel: '#t2'
        }, function (err, response) {
            console.log(response);
        });

    } catch(e) {
        console.error(e);
        process.exit(1);
    }

});