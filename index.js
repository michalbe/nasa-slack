const Slack = require('slack-node');
const Request = require('request-promise-native');

const apiToken = process.argv[2];

slack = new Slack(apiToken);

Request.get('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo')
.then((result) => {
    try {
        result = JSON.parse(result);
        console.log(result);

        slack.api('chat.postMessage', {
            text: '',
            attachments: JSON.stringify([
                {
                    "fallback": "Photo of the day",
                    "color": "#2eb886",
                    "author_name": "Oak & NASA",
                    "pretext": "Oak & Nasa Photo of the day",
                    "title": result.title,
                    "title_link": result.hdurl,
                    "text": result.explanation,
                    "image_url": result.hdurl,
                    "thumb_url": result.url,
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