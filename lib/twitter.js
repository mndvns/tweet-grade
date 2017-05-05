const env = require('dotenv').config().parsed;
const Twitter = require('twitter-node-client').Twitter;

exports.timeline = timeline;
function timeline(name, count, errorFn, successFn) {
  const conf = {
    screen_name: name,
    count: count.toString(),
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    contributor_details: false,
  };
  twitter.getUserTimeline(conf, errorFn, successFn);
}

const twitter = new Twitter({
  consumerKey: env.TWITTER_CONSUMER_KEY,
  consumerSecret: env.TWITTER_CONSUMER_SECRET,
  accessToken: env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: env.TWITTER_ACCESS_TOKEN_SECRET,
});
