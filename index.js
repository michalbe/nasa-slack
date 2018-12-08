const Slack = require('slack-node');
const apiToken = process.argv[2];

slack = new Slack(apiToken);

slack.api("users.list", function (err, response) {
    console.log(response);
});

slack.api('chat.postMessage', {
    text: 'test',
    username: 'OAK & Nasa photo of the day',
    icon_emoji: ":rocket:",
    channel: '#t2'
}, function (err, response) {
    console.log(response);
});